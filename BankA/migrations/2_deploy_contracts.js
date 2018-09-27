var RobustKYC_BankA = artifacts.require("./RobustKYC_BankA.sol");

module.exports = function(deployer) {
 deployer.deploy(RobustKYC_BankA);
};
