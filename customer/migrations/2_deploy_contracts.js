var robustKYC_Customer= artifacts.require("./robustKYC_Customer.sol");

module.exports = function(deployer) {
 deployer.deploy(robustKYC_Customer);
};
