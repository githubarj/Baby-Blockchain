import Block from "./block.js";
import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js"

let githuba = new Blockchain();

githuba.createTransaction(new Transaction('address1', 'address2', 100))
githuba.createTransaction(new Transaction("address2", "address1", 50));

console.log('\n Starting the miner...')

githuba.minePendingTransactions('myAddress');

console.log( `\n Balance of mining address is ${githuba.getBalanceOfAddress('myAddress')}`)

console.log(githuba.pendingTransactions[0])


console.log("\n Starting the miner again...");

githuba.minePendingTransactions("myAddress");



console.log(
  `\n Balance of mining address is ${githuba.getBalanceOfAddress("myAddress")}`
);