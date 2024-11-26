//Part 3
//javascript program to create the blockchain with genesis block
//adding the block into blockchain and validate the blockchain for any alteration
// install crypto-js
//proof of work
//multiple transaction in block and giving reward to minner who sucessfully solve the puzzle


const SHA256 = require('crypto-js/sha256')


class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}
class Block {
    constructor(previousHash = '', timestamp, transactions) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }
    calculateHash() {
        //return sha256
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
    //proof of work
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
        console.log("Nonce: " + this.nonce);
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        //set difficulty
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }


    createGenesisBlock() {
        return new Block("0", "06/08/24", "Genesis Block");
    }
    //latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    //add mine pending transaction
    minePendingTransaction(miningRewardAddress) {
        let block = new Block(this.getLatestBlock().hash, Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        console.log("Block Mined Sucessfully!!");
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];

    }
    //create transactions
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    //get balance of address
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress == address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress == address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
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
Coin.createTransaction(new Transaction('address1', 'address2', 100));
Coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log("Start Minning...............");

Coin.minePendingTransaction('Tata-Address');
console.log("Balance of Tata-Address: " + Coin.getBalanceOfAddress('Tata-Address'));
Coin.minePendingTransaction('Tata-Address');
console.log('Again Check = the balance of Tata-Address');
console.log("Balance of Tata-Address: " + Coin.getBalanceOfAddress('Tata-Address'));


console.log(JSON.stringify(Coin, null, 4));

// console.log('IS chain valid: ' + Coin.isChainValid());

// Coin.chain[2].data = { amount: 2000 };
// console.log('IS chain valid: ' + Coin.isChainValid());





