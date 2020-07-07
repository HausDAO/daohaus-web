import v1FactoryAbi from '../contracts/factory';
import v2FactoryAbi from '../contracts/factory';

import { post, remove, put } from './requests';

export default class SummonService {
  constructor(web3Service) {
    this.web3Service = web3Service;
    this.v1FactoryContract = this.web3Service.initContract(
      v1FactoryAbi,
      process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS,
    );
    this.v2FactoryContract = this.web3Service.initContract(
      v2FactoryAbi,
      process.env.REACT_APP_FACTORY_V2_CONTRACT_ADDRESS,
    );
    this.summonTx = null;
  }

  setTx(hash) {
    this.summonTx = hash;

    console.log('this.siummonTx', this.summonTx);
  }

  async summonV1(daoData, account) {
    console.log('summoning', daoData, account);

    try {
      const cacheMoloch = {
        summonerAddress: account,
        name: daoData.name.trim(),
        minimumTribute: daoData.minimumTribute,
        description: daoData.description,
      };
      // cache dao incase of web3 timeout timeout
      const cacheId = await post('moloch/orphan', cacheMoloch);

      return await this.v1factoryContract.methods
        .newDao(
          daoData.approvedToken,
          daoData.periodDuration,
          daoData.votingPeriodLength,
          daoData.gracePeriodLength,
          daoData.abortWindow,
          this.web3Service.web3.utils.toBN(daoData.proposalDeposit).toString(),
          daoData.dilutionBound,
          this.web3Service.web3.utils.toBN(daoData.processingReward).toString(),
          daoData.name.trim(),
        )
        .send(
          {
            from: account,
          },
          function(error, transactionHash) {
            console.log(error, transactionHash);

            this.summonTx = transactionHash;
          },
        )
        .on('error', function(err) {
          console.log(err);

          if (err && err.code === 4001) {
            //remove from cache
            remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
              console.log('dao rejected, remove cache');
              // setformError('Transaction Rejected by user.');
            });
            if (
              err.message.indexOf(
                'Error: Transaction was not mined within 50 blocks',
              ) > -1
            ) {
              // setformError(
              //   `rejected transaction is taking a long time. tx hash: ${txHash}`,
              // );
              return { error: err };
            }
          }
          console.log(err);
        })
        .on('transactionHash', function(transactionHash) {
          console.log(transactionHash);
          this.summonTx = transactionHash;
        })
        .on('receipt', function(receipt) {
          console.log(receipt.events.Register); // contains the new contract address
          const contractAddress = receipt.events.Register.returnValues.moloch;

          const newMoloch = {
            summonerAddress: account,
            contractAddress: contractAddress,
            name: daoData.name.trim(),
            minimumTribute: daoData.minimumTribute,
            description: daoData.description,
          };

          post('moloch', newMoloch)
            .then(newMolochRes => {
              //remove from cache and redirect
              remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
                // props.history.push(
                //   `/building-dao/v1/${contractAddress.toLowerCase()}`,
                // );
              });
            })
            .catch(err => {
              // setLoading(false);
              console.log('moloch creation error', err);
            });

          // resetForm();
          // setLoading(false);
          // setSubmitting(false);
        })
        .on('confirmation', function(confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .then(function(newContractInstance) {
          console.log(newContractInstance); // instance with the new contract address
        });
    } catch (err) {
      console.log(err);
      // alert(`Something went wrong. please try again`);
      // setformError(`Something went wrong. please try again`);

      // setLoading(false);
      // setSubmitting(false);
    }
  }
}
