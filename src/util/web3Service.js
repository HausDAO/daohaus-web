import Web3 from 'web3';

export default class Web3Service {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider);
    // this.web3.currentProvider.setMaxListeners(300); kills mobile
  }

  createContract(abi) {
    let contract = new this.web3.eth.Contract(abi);
    return contract;

  }

  getKeyStore(privateKey, password){
    return this.web3.eth.accounts.encrypt(privateKey, password);
  }

  async latestBlock(){
    return await this.web3.eth.getBlock("latest");
  }

  fromWei(amount) {
    if (!amount) {
      return 0;
    }

    return this.web3.utils.fromWei(amount.toString(), 'ether');
  }

  toWei(amount) {
    return this.web3.utils.toWei(amount.toString(), 'ether');
  }

  toNumber(num) {
    return num.toNumber();
  }

  getTransaction(hash) {
    return this.web3.eth.getTransaction(hash);
  }

  initContract(abi, addr) {
    return new this.web3.eth.Contract(abi, addr);
  }

  getBalance(addr) {
    return this.web3.eth.getBalance(addr);
  }

  getTime(block) {
    return this.web3.eth.getBlock(block).timestamp;
  }
}
