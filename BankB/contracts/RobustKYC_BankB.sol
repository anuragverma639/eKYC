pragma solidity ^0.4.11;

import "./robustKYC_Data_Storage.sol";
import "./robustKYC_New_field.sol";
import "./robustKYC_Contract_Addresses.sol";
import "./robustKYC_Customer_Image.sol";

import "./robustKYC_Customer_documents.sol";

contract RobustKYC_BankB is robustKYC_Contract_Address {
   
   
   function name_by_BankB(uint256 id,robustKYC_Data_Storage.field_status name){
      
       data.name_verification_by_BankB(id,name);
       
   }
   
   function email_by_BankB(uint256 id,robustKYC_Data_Storage.field_status email){
      data.email_verification_by_BankB(id,email);
       
       
   }
   
   function phone_no_by_BankB(uint256 id,robustKYC_Data_Storage.field_status phone_no){
      data.phone_no_verification_by_BankB(id,phone_no);
       
   }
   
   function address_details_by_BankB(uint256 id,robustKYC_Data_Storage.field_status address_details){
       
       data.address_details_verification_by_BankB(id,address_details);
       
   }
   
   function blood_group_by_BankB(uint256 id, robustKYC_New_field.field_status blood_group){
       
        data2.blood_group_verification_by_BankB(id,blood_group);
   }
   
   function image_by_BankB(uint256 id, robustKYC_Customer_Image.field_status image){
      
         image_data.image_verification_by_BankB(id,image);
   }
   
   function document1_by_BankB(uint id , robustKYC_Customer_documents.field_status document1){
       
       document_data.document1_verification_by_BankB(id , document1);
   }
   
    function document2_by_BankB(uint id , robustKYC_Customer_documents.field_status document2){
       document_data.document2_verification_by_BankB(id , document2);
   }
   
    function document3_by_BankB(uint id , robustKYC_Customer_documents.field_status document3){
       document_data.document3_verification_by_BankB(id , document3);
   }
    
    
    function get_details_by_BankB(uint256 id) constant returns(robustKYC_Data_Storage.field_status name, robustKYC_Data_Storage.field_status email, robustKYC_Data_Storage.field_status phone_no, robustKYC_Data_Storage.field_status address_details){
        
        return data.get_verification_details_by_BankB(id);
        
     }
     
      
    function get_other_details_by_BankB(uint256 id ) constant returns(robustKYC_New_field.field_status blood_group){
        
        return data2.get_verification_details_by_BankB(id);
        
    }
    
     function get_image_details_by_BankA(uint id)constant returns(robustKYC_Customer_Image.field_status image){
       
        return image_data.get_verification_details_by_BankA(id);
    }
     
     function get_image_details_by_BankB(uint id)constant returns(robustKYC_Customer_Image.field_status image){
      
        return image_data.get_verification_details_by_BankB(id);
    } 
     
    function get_other_details_by_BankA(uint256 id ) constant returns(robustKYC_New_field.field_status blood_group){
        
        return data2.get_verification_details_by_BankA(id);
        
    }
    
    function get_details_by_BankA(uint256 id) constant returns(robustKYC_Data_Storage.field_status name, robustKYC_Data_Storage.field_status email, robustKYC_Data_Storage.field_status phone_no, robustKYC_Data_Storage.field_status address_details){
        
        return data.get_verification_details_by_BankA(id);
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
   
    function get_documents_details_by_BankA(uint256 id) constant returns(robustKYC_Customer_documents.field_status document1,robustKYC_Customer_documents.field_status document2,robustKYC_Customer_documents.field_status document3){
       
        return document_data.get_verification_details_by_BankA(id);
    }
    
    
      function get_documents_details_by_BankB(uint256 id) constant returns(robustKYC_Customer_documents.field_status document1,robustKYC_Customer_documents.field_status document2,robustKYC_Customer_documents.field_status document3){
       
        return document_data.get_verification_details_by_BankB(id);
    }
    
    
     function getDocuments(uint id) constant returns(uint256 customer_id, bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3){
      
       return document_data.getDetails_by_id(id);
  
   }
    
    
 
    
}