pragma solidity ^0.4.11;
contract robustKYC_Data_Storage {
    
    enum field_status{U,V,R}
    
    event customer_details(uint256  id,bytes32  name, bytes32 email, uint phone_no, bytes32 address_details );
      
   
   struct customer{
       
       bytes32 name;
       bytes32 email;
       uint phone_no;
       bytes32 address_details;
       
       field_status name_by_BankA_status;
       field_status email_by_BankA_status;
       field_status phone_no_by_BankA_status;
       field_status address_details_by_BankA_status;
       field_status name_by_BankB_status;
       field_status email_by_BankB_status;
       field_status phone_no_by_BankB_status;
       field_status address_details_by_BankB_status;
   }
   
   
   mapping(uint256 => customer) public map;
   
   function addDetails(uint256 id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details){
       map[id].name=name;
       map[id].name_by_BankA_status=field_status.U;
       map[id].name_by_BankB_status=field_status.U;
       
       map[id].email=email;
       map[id].email_by_BankA_status=field_status.U;
       map[id].email_by_BankB_status=field_status.U;
       
       map[id].phone_no=phone_no;
       map[id].phone_no_by_BankA_status=field_status.U;
       map[id].phone_no_by_BankB_status=field_status.U;
       
       map[id].address_details=address_details;
       map[id].address_details_by_BankA_status=field_status.U;
       map[id].address_details_by_BankB_status=field_status.U;
       
       customer_details(id,name,email,phone_no,address_details);
   }
   
  function updateDetails(uint256 id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details){
       if(keccak256(map[id].name)!=keccak256(name))
       {
       map[id].name=name;
       map[id].name_by_BankA_status=field_status.U;
       map[id].name_by_BankB_status=field_status.U;
       }
       
      if(keccak256(map[id].email)!=keccak256(email))
      {
       map[id].email=email;
       map[id].email_by_BankA_status=field_status.U;
       map[id].email_by_BankB_status=field_status.U;
      }
       
        if(keccak256(map[id].phone_no)!=keccak256(phone_no))
      {
       map[id].phone_no=phone_no;
       map[id].phone_no_by_BankA_status=field_status.U;
       map[id].phone_no_by_BankB_status=field_status.U;
      }
      
       if(keccak256(map[id].address_details)!=keccak256(address_details))
      { 
       map[id].address_details=address_details;
       map[id].address_details_by_BankA_status=field_status.U;
       map[id].address_details_by_BankB_status=field_status.U;
      }
       
       customer_details(id,name,email,phone_no,address_details);
   }
   
   
   function getDetails_by_id(uint256 id) constant returns(uint256 customer_id, bytes32 name,bytes32 email,uint phone_no,bytes32 address_details){
       
      
      return (id,(map[id].name),(map[id].email),(map[id].phone_no),(map[id].address_details));
       
   }
   
   function name_verification_by_BankA(uint256 id,field_status name){
       map[id].name_by_BankA_status=name;
       
   }
   function email_verification_by_BankA(uint256 id,field_status email){
       map[id].email_by_BankA_status=email;
       
   }
   
   function phone_no_verification_by_BankA(uint256 id,field_status phone_no){
       map[id].phone_no_by_BankA_status=phone_no;
       
   }
   
   function address_details_verification_by_BankA(uint256 id,field_status address_details){
       
       map[id].address_details_by_BankA_status=address_details;
       
   }
   
   function get_verification_details_by_BankA(uint256 id) constant returns(field_status name, field_status email, field_status phone_no, field_status address_details){
        
         return (map[id].name_by_BankA_status,map[id].email_by_BankA_status,map[id].phone_no_by_BankA_status,map[id].address_details_by_BankA_status);
   }
   
   
   function name_verification_by_BankB(uint256 id,field_status name){
     
      map[id].name_by_BankB_status=name;
       
   }
   function email_verification_by_BankB(uint256 id,field_status email){
      
       map[id].email_by_BankB_status=email;
       
   }
   
   function phone_no_verification_by_BankB(uint256 id,field_status phone_no){
      
       map[id].phone_no_by_BankB_status=phone_no;
       
   }
   
   function address_details_verification_by_BankB(uint256 id,field_status address_details){
       
       map[id].address_details_by_BankB_status=address_details;
       
   }
  
   function get_verification_details_by_BankB(uint256 id) constant returns(field_status name, field_status email, field_status phone_no, field_status address_details){
        
         return (map[id].name_by_BankB_status,map[id].email_by_BankB_status,map[id].phone_no_by_BankB_status,map[id].address_details_by_BankB_status);
   }
   
   
}