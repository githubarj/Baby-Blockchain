# Baby Blockchain : A blockchain network in JavaScript
## Overview and purpose of the system / product
This is a blockchain that illustrates the basic principles of the functioning of blockchain technology. 
It is an implementation of my own minimal version of the blockchain (without decentralization and consensus, only basic mechanics).
## System Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've installed it right if you can run:
    - `git --version`
- [Metamask](https://metamask.io/)
  - This is a browser extension that lets you interact with the blockchain.
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` And get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` And get an output like: `x.x.x`
    - You might need to install it with npm

## Features
 - Blocks
 - A blockchain 
 - Hashing
 - Transactions and transaction creation
 - Sign transactions
 - Simple proof-of-work algorithm
 - Verify blockchain (to prevent tampering)
 - Generate wallet (private/public key)


 ## Interaction
## 🏁 Getting Started <a name = "getting_started"></a>

### Install dependencies
```
yarn
```
Replace what is in main.js with the following...

### Generate a keypair
To make transactions on this blockchain you need a keypair. The public key becomes your wallet address and the private key is used to sign transactions.

```js
import EC from "elliptic/lib/elliptic/ec/index.js";
const ec = new EC("secp256k1");

const myKey = ec.genKeyPair();
```

The `myKey` object now contains your public & private key:

```js
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```

### Create a blockchain instance
Now you can create a new instance of a Blockchain:

```js
import Blockchain from "./blockchain.js";
import Transaction from "./transaction.js"

const myChain = new Blockchain();
```

### Adding transactions
```js
// Transfer 100 coins from my wallet to "toAddress"
const tx = new Transaction(myKey.getPublic('hex'), 'toAddress', 100);
tx.signTransaction(myKey);

myChain.addTransaction(tx);
```

To finalize this transaction, we have to mine a new block. We give this method our wallet address because we will receive a mining reward:

```js
myChain.minePendingTransactions(myKey.getPublic('hex'));
```



