//Part 4 full implementation
//javascript program to create the blockchain with genesis block
//adding the block into blockchain and validate the blockchain for any alteration
// install crypto-js
//proof of work
//multiple transaction in block and giving reward to minner who sucessfully solve the puzzle
//signing and verifing the transactions

const {Blockchain, Transaction} = require('./Blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256')

const myKey = ec.keyFromPrivate('62a8423e598a3894ffa33e21f3c4c662645f2b2e4726f04313d67eb873745f37');
//wault address 
const myWaultAddress = myKey.getPublic('hex');

const myKey1 = ec.keyFromPrivate('e0ede27a5594c8afdffc6993435031b73549a1c6117b940e4d2c9b2d04a498ec');
//wault address 
const myWaultAddress1 = myKey1.getPublic('hex');
let Coin = new Blockchain();

//create transaction
const tx1 = new Transaction(myWaultAddress,myWaultAddress1,70);
//authenticate transaction
tx1.signTransaction(myKey);
//minePendingTransaction
Coin.addTransaction(tx1);


console.log("Start Minning...............");

Coin.minePendingTransaction(myWaultAddress);
console.log("Balance of Tata-Address: " + Coin.getBalanceOfAddress(myWaultAddress));
Coin.minePendingTransaction(myWaultAddress);
console.log("Balance of Tata-Address: " + Coin.getBalanceOfAddress(myWaultAddress));
// Coin.minePendingTransaction(myWaultAddress);
// console.log('Again Check = the balance of Tata-Address');
// console.log("Balance of Tata-Address: " + Coin.getBalanceOfAddress('Tata-Address'));

console.log(JSON.stringify(Coin, null, 4));

// console.log('IS chain valid: ' + Coin.isChainValid());
// Coin.chain[2].data = { amount: 2000 };
// console.log('IS chain valid: ' + Coin.isChainValid());