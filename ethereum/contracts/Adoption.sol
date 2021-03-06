pragma solidity ^0.5.0;

contract Adoption {
    address[16] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);
        require(adopters[petId] == 0x0000000000000000000000000000000000000000, "Already adopted");
        adopters[petId] = msg.sender;
        return petId;
    }    

    // Unadopting a pet
    function unadopt(uint petId) public{
        require(petId >= 0 && petId <= 15);
        require(msg.sender == adopters[petId], "You have not adopted this pet");
        adopters[petId] = 0x0000000000000000000000000000000000000000;
    } 

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}