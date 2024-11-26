const MyVoting = artifacts.require("MyVoting");

module.exports = function (deployer) {
    deployer.deploy(MyVoting);
};
