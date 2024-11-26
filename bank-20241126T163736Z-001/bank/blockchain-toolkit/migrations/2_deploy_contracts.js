const MyBanking = artifacts.require("MyBanking");

module.exports = function (deployer) {
    deployer.deploy(MyBanking);
};
