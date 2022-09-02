import Block from "./block.js";
import Transaction from "./transaction.js";

export default class Blockchain {
  constructor() {
    //initialising our blockchain
    this.chain = [this.createGenesisBlock()]; //a blockchain will be an array of blocks
    this.difficulty = 2; //setting the number of 0s required
    this.pendingTransactions = [];
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

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions); // in reality miners choose the transaction they want to include
    block.mineBlock(this.difficulty);


    console.log("Block successfully mined!");
    this.chain.push(block);

    //reset the pending ttransactions array
    this.pendingTransactions = [
      // we create a new transaction that contains the mining rewards and address of the miner of the previous block
      // this will send to the miner when the next block is mined
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  //receiving a transaction and adding it to the pending transactions
  addTransaction(transaction) {

    //first we do a couple of checks

    //checking if to and from addresses are present
    if(!transaction.fromAddress || !transaction.toAddress){
      throw new Error('Transaction must include a to and from Address')
    }

    //checking if the transaction being added is valid
    if (!transaction.isValid()){
      throw new Error('Cannot add invalid transaction to chain')
    }
      // when both tests pass we can now push to pening transactions array
      this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      //looping over the blocks in the chain
      for (const trans of block.transactions) {
        //looping over the transactions in the chain
        if (trans.fromAddress === address) {
          //checking if it is the sender or the receiver
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          //checking if it is the sender or the receiver
          balance += trans.amount;
        }
      }
    }

    return balance;
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

      //checking if all the blocks have all valid transactions in them
      if(!currentBlock.hasValidTransactions()){
        return "Invalid, some blocks have invalid tx"
      }
    }

    return "Valid Blockchain";
  }
}
