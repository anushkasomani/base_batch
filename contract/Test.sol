// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test{
    address public immutable  owner;
    constructor(){
        owner = msg.sender;
    }

       function send(address payable _to, uint256 _amount) public payable returns (bool success){
          require(_amount <= msg.value,"Insufficient balance");
         if (_to == address(0)) revert();
           payable(owner).transfer(_amount);
        return true;
     }

}