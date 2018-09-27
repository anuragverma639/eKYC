pragma solidity ^0.4.0;

contract robustKYC_Customer_Image {
    
     enum field_status{U,V,R}
   
    struct image{
        
       bytes32 first_half_image;
       bytes32 second_half_image;
       
       field_status image_by_BankA_status;
       field_status image_by_BankB_status;
  
    }
    
    mapping(uint => image) public map;
    
    function addDetails(uint id, bytes32 first_half_image,bytes32 second_half_image) {
        
       map[id].first_half_image=first_half_image;
       map[id].second_half_image=second_half_image;
       
    }
    
    function updateDetails(uint256 id, bytes32 first_half_image,bytes32 second_half_image){
       if(keccak256(map[id].first_half_image)!=keccak256(first_half_image))
       {
       map[id].first_half_image=first_half_image;
       map[id].second_half_image=second_half_image;
       map[id].image_by_BankA_status=field_status.U;
       map[id].image_by_BankB_status=field_status.U;
       }
       
     
   }
   
   function getDetails_by_id(uint256 id) constant returns(uint256 customer_id, bytes32 first_half_image,bytes32 second_half_image){
       
      
      return (id,(map[id].first_half_image),map[id].second_half_image);
       
   }
   
   function image_verification_by_BankA(uint256 id,field_status image){
       map[id].image_by_BankA_status=image;
       
   }
  
   
   function get_verification_details_by_BankA(uint256 id) constant returns(field_status image){
        
         return (map[id].image_by_BankA_status);
   }
   
   
   function image_verification_by_BankB(uint256 id,field_status image){
     
      map[id].image_by_BankB_status=image;
       
   }
   
   function get_verification_details_by_BankB(uint256 id) constant returns(field_status image){
        
         return (map[id].image_by_BankB_status);
   }
    
   
}