import DaoAbi from '../contracts/moloch';

export default class MolochService {
  contractAddr;
  web3Service;
  contract;
  daoAbi;
  contract;

  constructor(contractAddr, web3Service) {
    this.contractAddr = contractAddr;
    this.web3Service = web3Service;
    this.daoAbi = DaoAbi;
  }

  async initContract() {
    console.log('this.web3Service', 'this.web3Service', this.web3Service);
    
    this.contract = await this.web3Service.initContract(
      this.daoAbi,
      this.contractAddr,
    );
    return this.contract;
  }

  async getAllEvents() {
    if (!this.contract) {
      await this.initContract();
    }
    let events = await this.contract.getPastEvents('allEvents', {
      fromBlock: 0,
      toBlock: 'latest',
    });
    return events;
  }

  async getCurrentPeriod() {
    if (!this.contract) {
      await this.initContract();
    }
    let currentPeriod = await this.contract.methods.getCurrentPeriod().call();
    return currentPeriod;
  }

  async getTotalShares(atBlock = 'latest') {
    if (!this.contract) {
      await this.initContract();
    }
    let totalShares = await this.contract.methods
      .totalShares()
      .call({}, atBlock);
    return totalShares;
  }

  async getGracePeriodLength() {
    if (!this.contract) {
      await this.initContract();
    }
    let gracePeriod = await this.contract.methods.gracePeriodLength().call();
    return gracePeriod;
  }

  async getVotingPeriodLength() {
    if (!this.contract) {
      await this.initContract();
    }
    let votingPeriod = await this.contract.methods.votingPeriodLength().call();
    return votingPeriod;
  }

  async getPeriodDuration() {
    if (!this.contract) {
      await this.initContract();
    }
    let periodDuration = await this.contract.methods.periodDuration().call();
    return periodDuration;
  }

  async getProcessingReward() {
    if (!this.contract) {
      await this.initContract();
    }
    let processingReward = await this.contract.methods
      .processingReward()
      .call();
    return processingReward;
  }

  async getProposalDeposit() {
    if (!this.contract) {
      await this.initContract();
    }
    let proposalDeposit = await this.contract.methods.proposalDeposit().call();
    return proposalDeposit;
  }

  async getGuildBankAddr() {
    if (!this.contract) {
      await this.initContract();
    }
    let guildBank = await this.contract.methods.guildBank().call();

    return guildBank;
  }

  async members(account) {
    if (!this.contract) {
      await this.initContract();
    }
    let members = await this.contract.methods.members(account).call();
    return members;
  }

  async memberAddressByDelegateKey(account) {
    if (!this.contract) {
      await this.initContract();
    }
    let addressByDelegateKey = await this.contract.methods
      .memberAddressByDelegateKey(account)
      .call();
    return addressByDelegateKey;
  }

  async submitVote(from, proposalIndex, uintVote, encodedPayload) {
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods
        .submitVote(proposalIndex, uintVote)
        .encodeABI();
      return data;
    }

    let vote = this.contract.methods
      .submitVote(proposalIndex, uintVote)
      .send({ from })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });
    return vote;
  }

  async rageQuit(from, amount, encodedPayload) {
    if (!this.contract) {
      await this.initContract();
    }
    if (encodedPayload) {
      const data = this.contract.methods.ragequit(amount).encodeABI();
      return data;
    }

    let rage = this.contract.methods
      .ragequit(amount)
      .send({ from })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });
    return rage;
  }

  async canRagequit() {
    if (!this.contract) {
      await this.initContract();
    }
    let canRage = await this.contract.methods.canRagequit().call();
    return canRage;
  }

  async guildBank() {
    if (!this.contract) {
      await this.initContract();
    }
    let guildBank = await this.contract.methods.guildBank().call();
    return guildBank;
  }

  async proposalQueue(id) {
    if (!this.contract) {
      await this.initContract();
    }
    let info = await this.contract.methods.proposalQueue(id).call();
    return info;
  }

  async approvedToken() {
    if (!this.contract) {
      await this.initContract();
    }

    let info = await this.contract.methods.approvedToken().call();

    return info;
  }

  async processProposal(from, id, encodedPayload) {
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods.processProposal(id).encodeABI();
      return data;
    }
  }

  async submitProposal(
    from,
    applicant,
    tokenTribute,
    sharesRequested,
    details,
    encodedPayload = false,
  ) {
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods
        .submitProposal(applicant, tokenTribute, sharesRequested, details)
        .encodeABI();
      return data;
    }

    let proposal = this.contract.methods
      .submitProposal(applicant, tokenTribute, sharesRequested, details)
      .send({ from })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });

    return proposal;
  }
}

// export class Web3McDaoServiceV2 extends Web3McDaoService {
//   bcProcessor;

//   // constructor(web3, daoAddress, accountAddr, bcProcessor) {
//   //   super(web3, daoAddress, accountAddr, bcProcessor);
//   //   this.bcProcessor = bcProcessor;
//   // }

//   async rageQuit(amountShares = 0, amountLoot = 0) {
//     const txReceipt = await this.daoContract.methods
//       .ragequit(amountShares, amountLoot)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Rage quit burn shares: ${amountShares} loot: ${amountLoot}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async cancelProposal(id) {
//     const txReceipt = await this.daoContract.methods
//       .cancelProposal(id)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Cancel proposal. id: ${id}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async processGuildKickProposal(id) {
//     const txReceipt = await this.daoContract.methods
//       .processGuildKickProposal(id)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Process Guild Kick Proposal. id: ${id}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async processWhitelistProposal(id) {
//     const txReceipt = await this.daoContract.methods
//       .processWhitelistProposal(id)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Process Whitelist Proposal. id: ${id}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async ragekick(address) {
//     const txReceipt = await this.daoContract.methods
//       .ragekick(address)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Rage Kick. address: ${address}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async sponsorProposal(id) {
//     const txReceipt = await this.daoContract.methods
//       .sponsorProposal(id)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Sponsor Proposal. id: ${id}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async submitProposal(
//     applicant,
//     sharesRequested,
//     lootRequested,
//     tributeOffered,
//     tributeToken,
//     paymentRequested,
//     PaymentToken,
//     details) {
//     const txReceipt = await this.daoContract.methods
//       .submitGuildKickProposal(
//         applicant,
//         sharesRequested,
//         lootRequested,
//         tributeOffered,
//         tributeToken,
//         paymentRequested,
//         PaymentToken,
//         details)
//       .send({ from: this.accountAddr });

//     // const queueLength = await this.daoContract.methods
//     //   .getProposalQueueLength()
//     //   .call();
//     const parseDetails = JSON.parse(details);

//     // TODO: we want to do anything different on this metadat?
//     // const proposalObj = {
//     //   proposalId: queueLength - 1 + '',
//     //   molochContractAddress: this.contractAddr,
//     //   title: parseDetails.title,
//     //   description: parseDetails.description,
//     //   link: parseDetails.link,
//     // };

//     // post('moloch/proposal', proposalObj);

//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Submit proposal (${parseDetails.title})`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async submitGuildKickProposal(memberToKick, details) {
//     const txReceipt = await this.daoContract.methods
//       .submitGuildKickProposal(memberToKick, details)
//       .send({ from: this.accountAddr });

//     // const queueLength = await this.daoContract.methods
//     //   .getProposalQueueLength()
//     //   .call();
//     const parseDetails = JSON.parse(details);

//     // TODO: we want to do anything different on this metadat?
//     // const proposalObj = {
//     //   proposalId: queueLength - 1 + '',
//     //   molochContractAddress: this.contractAddr,
//     //   title: parseDetails.title,
//     //   description: parseDetails.description,
//     //   link: parseDetails.link,
//     // };

//     // post('moloch/proposal', proposalObj);

//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Submit guild kick proposal (${parseDetails.title})`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async submitWhiteListProposal(address, details) {
//     const txReceipt = await this.daoContract.methods
//       .submitWhiteListProposal(address, details)
//       .send({ from: this.accountAddr });

//     // TODO: we want to do anything different on this metadata?
//     const parseDetails = JSON.parse(details);

//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Submit whitelist proposal (${parseDetails.title})`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async withdrawBalance(token, amount) {
//     const txReceipt = await this.daoContract.methods
//       .withdrawBalance(token, amount)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Withdraw Token. address: ${token}, amount ${amount}`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

//   async withdrawBalances(tokens, amounts, max) {
//     const txReceipt = await this.daoContract.methods
//       .withdrawBalances(tokens, amounts, max)
//       .send({ from: this.accountAddr });
//     this.bcProcessor.setTx(
//       txReceipt.transactionHash,
//       this.accountAddr,
//       `Withdraw Token. tokens..., amounts...`,
//       true,
//     );
//     return txReceipt.transactionHash;
//   }

// }
