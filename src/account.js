import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js";
import EC from "elliptic/lib/elliptic/ec/index.js";
const ec = new EC("secp256k1");
import { privateKey, publicKey } from "./keygenerator.js";

const myKey = ec.keyFromPrivate(
  "df29d594c97fc04cfaa882a5c8ba249aec0f2e7ec56d54594b3f8f612dd9c6dd"
);


export default class Account {
  contructor() {
    this.accountId =  myKey.getPublic("hex");;
    this.wallet = [privateKey, publicKey];
    this.balance = getBalanceOfAddress(this.accountId);
  }
}
