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

  async summonV1(daoData, account, dispatch) {
    console.log('summoning', daoData, account);

    dispatch({ type: 'setStatus', payload: 'summoning' });

    try {
      const cacheMoloch = {
        summonerAddress: account,
        name: daoData.name.trim(),
        minimumTribute: daoData.minimumTribute,
        description: daoData.description,
      };
      const cacheId = await post('moloch/orphan', cacheMoloch);
      this.setLocal({
        name: cacheMoloch.name,
        summonerAddress: cacheMoloch.summonerAddress,
        cacheId,
      });
      return await this.v1FactoryContract.methods
        .newDao(
          daoData.approvedToken,
          daoData.periodDuration,
          daoData.votingPeriod,
          daoData.gracePeriod,
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
          (error, transactionHash) => {
            console.log('first call back after .send', error, transactionHash);

            this.summonTx = transactionHash;
            dispatch({ type: 'setSummonTx', payload: transactionHash });
          },
        )
        .on('error', err => {
          console.log(err);

          if (err && err.code === 4001) {
            remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
              dispatch({
                type: 'setError',
                payload: 'Looks like you rejected the transaction.',
              });

              this.setLocal({
                error: 'rejected tx.',
                tx: this.summonTx,
              });
            });
            if (
              err.message.indexOf(
                'Error: Transaction was not mined within 50 blocks',
              ) > -1
            ) {
              dispatch({
                type: 'setError',
                payload: `transaction is taking a long time. tx hash: ${this.summonTx}`,
              });
              this.setLocal({
                error: `long tx`,
                tx: this.summonTx,
              });
            }
          }
        })
        .on('transactionHash', transactionHash => {
          console.log(transactionHash);

          this.summonTx = transactionHash;
          dispatch({ type: 'setSummonTx', payload: transactionHash });
          this.setLocal({
            tx: this.summonTx,
          });
        })
        .on('receipt', receipt => {
          console.log(receipt.events.Register);

          const contractAddress = receipt.events.Register.returnValues.moloch;
          const newMoloch = {
            summonerAddress: account,
            contractAddress: contractAddress,
            name: daoData.name.trim(),
            minimumTribute: daoData.minimumTribute,
            description: daoData.description,
          };

          this.setLocal({
            tx: this.summonTx,
            contract: contractAddress,
          });

          post('moloch', newMoloch)
            .then(() => {
              remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
                // move them on to register
                // props.history.push(
                //   `/building-dao/v1/${contractAddress.toLowerCase()}`,
                // );

                dispatch({
                  type: 'setComplete',
                  payload: { status: 'complete', contractAddress },
                });
              });
            })
            .catch(err => {
              console.log('moloch creation error', err);

              dispatch({ type: 'setError', payload: err });
              this.setLocal({
                tx: this.summonTx,
                error: 'cache error',
              });
            });
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(confirmationNumber, receipt);

          //why/when?
          // dispatch({ type: 'setStatus', payload: 'confirmed' });
        })
        .then(newContractInstance => {
          console.log(newContractInstance);

          this.setLocal({
            complete: true,
          });
        });
    } catch (err) {
      console.log('last catch error', err);

      // seems redundant to catch here with all the catch above?
      dispatch({ type: 'setError', payload: err });
    }
  }

  setLocal(newData) {
    let localMoloch = window.localStorage.getItem('pendingMoloch');
    if (localMoloch) {
      localMoloch = JSON.parse(localMoloch);
    }

    window.localStorage.setItem(
      'pendingMoloch',
      JSON.stringify({
        ...localMoloch,
        ...newData,
      }),
    );
  }
}
