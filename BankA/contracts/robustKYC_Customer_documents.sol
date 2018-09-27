pragma solidity ^0.4.0;

contract robustKYC_Customer_documents {
    
     enum field_status{U,V,R}
   
    struct Document{
        
       bytes32 first_half_document1;
       bytes32 second_half_document1;
       bytes32 first_half_document2;
       bytes32 second_half_document2;
       bytes32 first_half_document3;
       bytes32 second_half_document3;
       
       field_status document1_by_BankA_status;
       field_status document1_by_BankB_status;
       
       field_status document3_by_BankA_status;
       field_status document3_by_BankB_status;
       
       field_status document2_by_BankA_status;
       field_status document2_by_BankB_status;
  
    }
    
    mapping(uint => Document) public map;
    
    function addDetails(uint id, bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3) {
        
       map[id].first_half_document1=first_half_document1;
       map[id].second_half_document1=second_half_document1;
       map[id].first_half_document2=first_half_document2;
       map[id].second_half_document2=second_half_document2;
       map[id].first_half_document3=first_half_document3;
       map[id].second_half_document3=second_half_document3;
       
    }
    
    function updateDetails(uint id, bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3) {
        
         if(keccak256(map[id].first_half_document1)!=keccak256(first_half_document1)||(keccak256(map[id].second_half_document1)!=keccak256(second_half_document1)))
       {    
           map[id].first_half_document1=first_half_document1;
           map[id].second_half_document1=second_half_document1;
           map[id].document1_by_BankA_status=field_status.U;
           map[id].document1_by_BankB_status=field_status.U;
       }
       
       if(keccak256(map[id].first_half_document2)!=keccak256(first_half_document2)||(keccak256(map[id].second_half_document2)!=keccak256(second_half_document2)))
       {    
           map[id].first_half_document2=first_half_document2;
           map[id].second_half_document2=second_half_document2;
           map[id].document2_by_BankA_status=field_status.U;
           map[id].document2_by_BankB_status=field_status.U;
       }
       
       if(keccak256(map[id].first_half_document3)!=keccak256(first_half_document3)||(keccak256(map[id].second_half_document3)!=keccak256(second_half_document3)))
       {    
           map[id].first_half_document3=first_half_document3;
           map[id].second_half_document3=second_half_document3;
           map[id].document3_by_BankA_status=field_status.U;
           map[id].document3_by_BankB_status=field_status.U;
       }
       
    }
   
   function getDetails_by_id(uint256 id) constant returns(uint256 customer_id, bytes32 first_half_document1,bytes32 second_half_document1, bytes32 first_half_document2,bytes32 second_half_document2, bytes32 first_half_document3,bytes32 second_half_document3){
       
      
      return (id,(map[id].first_half_document1),map[id].second_half_document1,(map[id].first_half_document2),map[id].second_half_document2,(map[id].first_half_document3),map[id].second_half_document3);
       
   }
   
   function document1_verification_by_BankA(uint256 id,field_status document1){
      
       map[id].document1_by_BankA_status=document1;
       
   }
   
    function document2_verification_by_BankA(uint256 id,field_status document2){
      
       map[id].document2_by_BankA_status=document2;
       
   }
   
    function document3_verification_by_BankA(uint256 id,field_status document3){
      
       map[id].document3_by_BankA_status=document3;
       
   }
  
   
   function get_verification_details_by_BankA(uint256 id) constant returns(field_status document1,field_status document2,field_status document3){
        
         return (map[id].document1_by_BankA_status,map[id].document2_by_BankA_status,map[id].document3_by_BankA_status);
   }
   
   
   function document1_verification_by_BankB(uint256 id,field_status document1){
      
       map[id].document1_by_BankB_status=document1;
       
   }
   
    function document2_verification_by_BankB(uint256 id,field_status document2){
      
       map[id].document2_by_BankB_status=document2;
       
   }
   
    function document3_verification_by_BankB(uint256 id,field_status document3){
      
       map[id].document3_by_BankB_status=document3;
       
   }
   
    function get_verification_details_by_BankB(uint256 id) constant returns(field_status document1,field_status document2,field_status document3){
        
         return (map[id].document1_by_BankB_status,map[id].document2_by_BankB_status,map[id].document3_by_BankB_status);
   }
    
   
}