import EC from "elliptic/lib/elliptic/ec/index.js";

const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const privateKey = key.getPrivate("hex");
const publicKey = key.getPublic("hex");

console.log(`\n Private Key: ${privateKey}`)
console.log(`\n Public Key: ${publicKey}`);




