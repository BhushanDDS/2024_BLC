
//Part 4 full implementation
//javascript program to create the blockchain with genesis block
//adding the block into blockchain and validate the blockchain for any alteration
// install crypto-js
//proof of work
//multiple transaction in block and giving reward to minner who sucessfully solve the puzzle
//signing and verifing the transactions

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256')


class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    //calculate hash
    calculateHash() {
        //return sha256
        return SHA256(this.fromAddress, this.toAddress, this.amount).toString();
    }

    //sign the transaction
    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("Invalid transaction sender");
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');

    }

    //block contains only valid transactions
    isValid() {
        //reward 
        if (!this.fromAddress) return true;
        //signature is empty
        if (!this.signature || this.signature.length == 0) {
            throw new Error("No Signature in this transaction");
        }
        //verify the tranasction
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);

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


    //valid
    hasValidTransactions() {
        for (let transaction of this.transactions) {
            if (!transaction.isValid()) {
                return false;
            }
        }
        return true;
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
    //add transactions
    addTransaction(transaction) {
        if (!transaction.isValid()) {
            throw new Error("transaction is invalid");
        }
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction should have from and to addresses");
        }
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
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;




