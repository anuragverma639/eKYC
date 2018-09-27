pragma solidity ^0.4.11;

import "./robustKYC_Data_Storage.sol";
import "./robustKYC_New_field.sol";
import "./robustKYC_Customer_Image.sol";
import "./robustKYC_Contract_Addresses.sol";
import "./robustKYC_Customer_documents.sol";

contract robustKYC_Customer is robustKYC_Contract_Address {
    
    
   
   function add_Details(uint256 id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details,bytes32 blood_group, bytes32 first_half_image,bytes32 second_half_image) returns(bool res){
       
      data.addDetails(id,name,email,phone_no,address_details);
      data2.addDetails(id,blood_group);
      image_data.addDetails(id,first_half_image,second_half_image);
      return true;
   }
   
  function add_documents(uint id,bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3) returns(bool res){
      
      document_data.addDetails(id,first_half_document1,second_half_document1,first_half_document2,second_half_document2,first_half_document3,second_half_document3);
      return true;
  } 
   
   
  function update_Details(uint256 id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details, bytes32 blood_group, bytes32 first_half_image,bytes32 second_half_image) returns(bool res ){
      
       data.updateDetails(id,name,email,phone_no,address_details);
       data2.updateDetails(id,blood_group);
       image_data.updateDetails(id,first_half_image,second_half_image);
       return true;
   }
   
    function update_documents(uint id,bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3) returns(bool res){
      
      document_data.updateDetails(id,first_half_document1,second_half_document1,first_half_document2,second_half_document2,first_half_document3,second_half_document3);
      return true;
  } 
   
   
    function get_details_by_BankA(uint256 id) constant returns(robustKYC_Data_Storage.field_status name, robustKYC_Data_Storage.field_status email, robustKYC_Data_Storage.field_status phone_no, robustKYC_Data_Storage.field_status address_details){
       
        
        return data.get_verification_details_by_BankA(id);
        
    }
    
    function get_other_details_by_BankA(uint256 id ) constant returns(robustKYC_New_field.field_status blood_group){
        
        return data2.get_verification_details_by_BankA(id);
        
    }
    
    function get_image_details_by_BankA(uint256 id) constant returns(robustKYC_Customer_Image.field_status image){
       
        return image_data.get_verification_details_by_BankA(id);
    }
    
    
    function get_documents_details_by_BankA(uint256 id) constant returns(robustKYC_Customer_documents.field_status document1,robustKYC_Customer_documents.field_status document2,robustKYC_Customer_documents.field_status document3){
       
        return document_data.get_verification_details_by_BankA(id);
    }
   
    function get_details_by_BankB(uint256 id) constant returns(robustKYC_Data_Storage.field_status name, robustKYC_Data_Storage.field_status email, robustKYC_Data_Storage.field_status phone_no, robustKYC_Data_Storage.field_status address_details){
        
        return (data.get_verification_details_by_BankB(id));
        
    }
    
     function get_other_details_by_BankB(uint256 id ) constant returns(robustKYC_New_field.field_status blood_group){
        
        return data2.get_verification_details_by_BankB(id);
        
    }
    
     function get_image_details_by_BankB(uint256 id) constant returns(robustKYC_Customer_Image.field_status image){
       
        return image_data.get_verification_details_by_BankB(id);
    }
    
    
     function get_documents_details_by_BankB(uint256 id) constant returns(robustKYC_Customer_documents.field_status document1,robustKYC_Customer_documents.field_status document2,robustKYC_Customer_documents.field_status document3){
       
        return document_data.get_verification_details_by_BankB(id);
    }
    
    function getDetails(uint256 id) constant returns(uint256 customer_id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details){
    
     
     return data.getDetails_by_id(id);
     
   }
   
    function getOtherDetails(uint256 id) constant returns(uint256 customer_id, bytes32 blood_group){
    
     
     return data2.getDetails_by_id(id);
     
   }
   
   function getImage(uint256 id) constant returns(uint256 customer_id, bytes32 first_half_image,bytes32 second_half_image){
       return image_data.getDetails_by_id(id);
   }
   
   
   function getDocuments(uint id) constant returns(uint256 customer_id, bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3){
      
       return document_data.getDetails_by_id(id);
  
   }
   
  
    
    
}
