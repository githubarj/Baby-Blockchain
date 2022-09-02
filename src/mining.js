import Block from "./block.js";
import Blockchain from "./blockchain.js";

let githuba = new Blockchain();

console.log("Mining Block 1...")
githuba.addBlock(new Block(1, new Date().toString(), { amont: 4 }));

console.log("MIning Block 2...")
githuba.addBlock(new Block(2, new Date().toString(), { amont: 10 }));


