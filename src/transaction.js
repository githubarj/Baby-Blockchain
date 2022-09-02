export default class Transaction {
  constructor(fromAddress, toAdress, amount) {
    this.fromAddress = fromAddress;
    this.toAdress = toAdress;
    this.amount = amount;
  }
}
