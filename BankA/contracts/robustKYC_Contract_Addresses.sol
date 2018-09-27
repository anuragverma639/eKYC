pragma solidity ^0.4.11;

import "./robustKYC_Data_Storage.sol";
import "./robustKYC_New_field.sol";
import "./robustKYC_Customer_Image.sol";
import "./robustKYC_Customer_documents.sol";

contract robustKYC_Contract_Address{
    
    
    address public robustKYC_Data_Storage_contract_Address=address(0x09ba55740c254c70186c0c8cdbec0751231f7ebe);
    
    address public robustKYC_New_field_contract_Address=address(0xb0ea4c8778f92d58d5d43923520fd60703a1be8f);
    
    address public robustKYC_Customer_Image_contract_Address=address(0x5954fa8a06344738da45e645fa27831e19f568bb);
    
    address public robustKYC_Customer_documents_contract_Address=address(0x236c9a07c8a774488d88e09b14f0dd986edc6524);
     
   
     robustKYC_Data_Storage public data=robustKYC_Data_Storage(robustKYC_Data_Storage_contract_Address);
        
     robustKYC_New_field public data2=robustKYC_New_field(robustKYC_New_field_contract_Address);
        
     robustKYC_Customer_Image public image_data=robustKYC_Customer_Image(robustKYC_Customer_Image_contract_Address);
     robustKYC_Customer_documents public document_data=robustKYC_Customer_documents(robustKYC_Customer_documents_contract_Address);

}
