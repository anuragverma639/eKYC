pragma solidity ^0.4.11;

contract robustKYC_New_field{
    
     enum field_status{U,V,R}
   
    
    struct other_details{
        
        bytes32 blood_group;
        field_status blood_group_by_BankA_status;
        field_status blood_group_by_BankB_status;
       
    }
    
    mapping(uint => other_details) map;
    
    function addDetails(uint256 id, bytes32 blood_group){
       map[id].blood_group=blood_group;
       map[id].blood_group_by_BankA_status=field_status.U;
       map[id].blood_group_by_BankB_status=field_status.U;
      
   }
   
  function updateDetails(uint256 id, bytes32 blood_group){
       if(keccak256(map[id].blood_group)!=keccak256(blood_group))
       {
       map[id].blood_group=blood_group;
       map[id].blood_group_by_BankA_status=field_status.U;
       map[id].blood_group_by_BankB_status=field_status.U;
       }
       
     
   }
   
   
   function getDetails_by_id(uint256 id) constant returns(uint256 customer_id, bytes32 blood_group){
       
      
      return (id,(map[id].blood_group));
       
   }
   
   function blood_group_verification_by_BankA(uint256 id,field_status blood_group){
       map[id].blood_group_by_BankA_status=blood_group;
       
   }
  
   
   function get_verification_details_by_BankA(uint256 id) constant returns(field_status blood_group){
        
         return (map[id].blood_group_by_BankA_status);
   }
   
   
   function blood_group_verification_by_BankB(uint256 id,field_status blood_group){
     
      map[id].blood_group_by_BankB_status=blood_group;
       
   }
   
   function get_verification_details_by_BankB(uint256 id) constant returns(field_status blood_group){
        
         return (map[id].blood_group_by_BankB_status);
   }
   
    
    
    
}
