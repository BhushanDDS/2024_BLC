//Merkle Tree

var merkle = require("merkle")

// Sample data
var str = 'Fred, Bret, Bill, Bob, Alice, Trent';

// Split the string into an array of strings
var arr = str.split(',');

// Create a new merkle tree
console.log("Input \t \t ",arr);

var tree = merkle('sha1').sync(arr);

console.log("Merkle Root \t \t ",tree.root());
console.log("Tree Depth \t \t ",tree.depth());
console.log("Tree Levels \t \t ",tree.levels());
console.log("Tree Nodes \t \t ",tree.nodes());

var i;
for(i =0; i< tree.levels();i++)
{
    console.log("Level "+i+": \t\t", tree.level(i));
}