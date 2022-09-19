import Block from "./block.js";
import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js"
import EC from "elliptic/lib/elliptic/ec/index.js";
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "df29d594c97fc04cfaa882a5c8ba249aec0f2e7ec56d54594b3f8f612dd9c6dd"
);

const myWalletAddress = myKey.getPublic("hex");

let githuba = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10)
tx1.signTransaction(myKey);
githuba.addTransaction(tx1);

console.log('\n Starting the miner...')

githuba.minePendingTransactions(myWalletAddress);

console.log( `\n Balance of mining address is ${githuba.getBalanceOfAddress(myWalletAddress)}`)

