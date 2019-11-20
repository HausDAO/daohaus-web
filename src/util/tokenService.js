import Erc20Bytes32Abi from '../contracts/erc20bytes32.json';
import Erc20Abi from '../contracts/erc20.json';

export default class TokenService {
  contractAddr;
  web3Service;
  contract;
  contract32;
  abi;

  constructor(daoToken, web3Service) {
    this.web3Service = web3Service;
    this.abi = Erc20Abi;
    this.contractAddr = daoToken;
  }

  async initContract(abi = this.abi) {
    this.contract = await this.web3Service.initContract(abi, this.contractAddr);
    return this.contract;
  }

  async getSymbol() {
    let symbol;

    try {
      if (!this.contract) {
        this.contract = await this.initContract(Erc20Abi);
        // console.log('this.contract', this.contract);
      }
      symbol = await this.contract.methods.symbol().call();
    } catch {
      if (!this.contract32) {
        this.contract32 = await this.initContract(Erc20Bytes32Abi);
        // console.log('this.contract32', this.contract32);
      }
      symbol = await this.contract32.methods.symbol().call();
    }

    if (symbol.indexOf('0x') > -1) {
      symbol = this.web3Service.toUtf8(symbol);
    }

    return symbol;
  }

  async totalSupply() {
    if (!this.contract) {
      await this.initContract();
    }
    const totalSupply = await this.contract.methods.totalSupply().call();
    return totalSupply;
  }

  async balanceOf(account, atBlock = 'latest') {
    // if (!this.contract) {
    //   await this.initContract();
    // }

    const balanceOf = await this.contract.methods
      .balanceOf(account)
      .call({}, atBlock);

    return balanceOf;
  }

  async allowance(accountAddr, contractAddr) {
    if (!this.contract) {
      await this.initContract();
    }
    const allowance = await this.contract.methods
      .allowance(accountAddr, contractAddr)
      .call();
    return allowance;
  }

  async approve(from, guy, wad, encodedPayload) {
    // guy should be moloch contract
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods.approve(guy, wad).encodeABI();
      return data;
    }

    const approve = await this.contract.methods
      .approve(guy, wad)
      .send({ from })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });

    return approve;
  }

  async deposit(from, amount, encodedPayload) {
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods.deposit().encodeABI();
      return data;
    }

    let deposit = this.contract.methods
      .deposit()
      .send({ from, value: amount })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });

    return deposit;
  }

  async transfer(from, dist, wad, encodedPayload) {
    if (!this.contract) {
      await this.initContract();
    }

    if (encodedPayload) {
      const data = this.contract.methods.transfer(dist, wad).encodeABI();
      return data;
    }

    const trans = await this.contract.methods
      .transfer(dist, wad)
      .send({ from })
      .once('transactionHash', txHash => {})
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
        return { error: 'rejected transaction' };
      });

    return trans;
  }
}
