import SHA256 from "crypto-js/sha256.js";
import Transaction from "./transaction";

export default class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  //SHA 256 hashing to create a hash
  calculateHash() {
    return SHA256(
      this.timestamp +
        JSON.stringify(this.transactions) +
        this.previousHash +
        this.nonce
    ).toString();
  }

  //checking if the first part of the hash is a certain set amount of 0s
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block Mined: ${this.hash}`);
  }

  // checking if all the transactions in each block are valid, false for not valid
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}
