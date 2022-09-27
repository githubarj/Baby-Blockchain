import EC from "elliptic/lib/elliptic/ec/index.js";
import Blockchain from "./blockchain.js";

const ec = new EC("secp256k1");
const key = ec.genKeyPair();



export const privateKey = key.getPrivate("hex");
export const publicKey = key.getPublic("hex");

console.log(`\n Private Key: ${privateKey}`)
console.log(`\n Public Key: ${publicKey}`);







