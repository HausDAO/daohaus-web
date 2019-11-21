export default class Web3Service {
  constructor(web3) {
    console.log('init web3');
    this.web3 = web3;
    // this.web3.currentProvider.setMaxListeners(300); kills mobile
  }

  initContract(abi, address) {
    let contract = new this.web3.eth.Contract(abi, address);
    return contract;
  }

  getKeyStore(privateKey, password) {
    return this.web3.eth.accounts.encrypt(privateKey, password);
  }

  async latestBlock() {
    return await this.web3.eth.getBlock('latest');
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

  toUtf8(hexString) {
    return this.web3.utils.hexToUtf8(hexString);
  }

  toNumber(num) {
    return num.toNumber();
  }

  getTransaction(hash) {
    return this.web3.eth.getTransaction(hash);
  }

  getBalance(addr) {
    return this.web3.eth.getBalance(addr);
  }

  getTime(block) {
    return this.web3.eth.getBlock(block).timestamp;
  }
}
