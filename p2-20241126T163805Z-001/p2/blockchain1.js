
//Part 1
//javascript program to create the blockchain with genesis block
//adding the block into blockchain and validate the blockchain for any alteration
// install crypto-js

const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, previousHash = '', timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        //return sha256
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "0", "06/08/24", "Genesis Block");
    }
    //latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    //add block
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //validate blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }
        return true;
    }
}
let Coin = new Blockchain();
console.log(JSON.stringify(Coin, null, 4));

console.log("Adding Block ");
Coin.addBlock(new Block(1,"06/09/2024",{amount: 4000}));
Coin.addBlock(new Block(2,"07/09/2024",{amount: 1000}));

console.log(JSON.stringify(Coin, null, 4));
console.log('IS chain valid: '+ Coin.isChainValid());

Coin.chain[2].data = {amount:2000};
console.log('IS chain valid: '+ Coin.isChainValid());

//part 2


