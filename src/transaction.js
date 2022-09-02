import SHA256 from "crypto-js/sha256.js";
import EC from "elliptic/lib/elliptic/ec/index.js";
const ec = new EC("secp256k1");

export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  // we now calculate the hash of each transaction
  calculateHash() {
    return SHA256(this.amount + this.fromAddress + this.toAddress);
  }

  // Now we sign a transaction
  signTransaction(signingKey) {
    //we check if account matches by comparing public keys
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }

    // hash of out transaction
    const hashTx = this.calculateHash();
    //create  a signature by  signing the hash of our transaction
    const sig = signingKey.sign(hashTx, "base64");
    //store the signature into the transaction
    this.signature = sig.toDER("hex");
  }

  //Checking if our transaction has been correctly signed, true if correctly signed and false if not

  isValid() {
    //we first consider our mining reward transaction as it is a special transaction
    if (this.fromAddress === null) return true;

    //we then check if there is any signature at all
    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in the transaction");
    }

    // we then check if it has been signed by the right address by extracting it from the adress
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
