import Block from "./block.js";
import Blockchain from "./blockchain.js";

let githuba = new Blockchain();
githuba.addBlock(new Block(1, new Date().toString(), { amont: 4 }));
githuba.addBlock(new Block(2, new Date().toString(), { amont: 10 }));

// console.log(JSON.stringify(githuba, null, 4))

console.log(`Is this chain valid? ${githuba.isChainValid()}`);

githuba.chain[1].data = { amont: 100 }; //tampering with data

githuba.chain[1].hash =  githuba.chain[1].calculateHash() // try to trick by recalculating hash

console.log(`Is this chain valid? ${githuba.isChainValid()}`);

