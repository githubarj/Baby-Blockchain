import Block from "./block.js";
import Transaction from "./transaction.js";

export default class Blockchain {
  constructor() {
    //initialising our blockchain
    this.chain = [this.createGenesisBlock()]; //a blockchain will be an array of blocks
    this.difficulty = 2; //setting the number of 0s required
    this.pendingTransactions = []
    this.miningReward = 100; //reward for mining a block (amount to be received)
  }

  // creating the genesis block
  createGenesisBlock() {
    return new Block(new Date().toString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]; //return the last element of the array
  }

  /*
  initial addBlock method 
  addBlock(newBLock) {
    newBLock.previousHash = this.getLatestBlock().hash; //first we set the hash of the previous block

    // we also need to change the hash of our block by calculating it afresh
    //newBLock.hash = newBLock.calculateHash(); // we call the hashing function
    //we can now push the new block onto the chain

    // since we are now mining the above chnages to
    newBLock.mineBlock(this.difficulty);

    this.chain.push(newBLock);
  }
  */

  minePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(), this.pendingTransactions) // in reality miners choose the transaction they want to include 
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!")
    this.chain.push(block)

    //reset the pending ttransactions array
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]

  }

  //check for chain validity
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // first we check if the hash is correct
      if (currentBlock.hash != currentBlock.calculateHash()) {
        return "Invalid, Wrong Hash";
      }

      //we check if it points to a correct previous hash
      if (currentBlock.previousHash != previousBlock.hash) {
        return "Invalid, Points to a wrong previous block";
      }
    }

    return "Valid Blockchain";
  }
}
