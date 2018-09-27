var robustKYC_Data_Storage = artifacts.require("./robustKYC_Data_Storage.sol");
var robustKYC_New_field =artifacts.require("./robustKYC_New_field.sol");
var robustKYC_Customer_Image=artifacts.require("./robustKYC_Customer_Image.sol");
module.exports = function(deployer) {
  deployer.deploy(robustKYC_Data_Storage);
  deployer.deploy(robustKYC_New_field);
  deployer.deploy(robustKYC_Customer_Image);
  
};
