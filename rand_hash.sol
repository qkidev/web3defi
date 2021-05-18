// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.7.5;

contract rand{
    uint256 randNonce = 0;
    
    address public owner;

    address public previousAddress;
    
    bytes32 salt = "random";
    
    constructor() payable
    {
        owner = msg.sender;
    }
    
    //一个随机数，每次调用后，下次结果都不一样，用户越多，随机性越大
    //返回bytes32后，调用程序自己进行处理
    function random() public returns (bytes32) {
        
        previousAddress = msg.sender;
        randNonce++;
        bytes32 random_hash = keccak256(abi.encodePacked(salt,msg.sig , msg.sender, randNonce, blockhash(block.number -1),previousAddress));
        return random_hash;
    }
    
    
    function setSalt(string memory newSalt) public{
        if(msg.sender != owner) 
		    revert();
		salt = keccak256(abi.encodePacked(newSalt)) ;
    }

    // transfer balance to owner
	function withdraw(uint256 amount) public {
		if(msg.sender != owner) 
		revert();
		msg.sender.transfer(amount);
	}
	
	//转移所有者 
	function setOwner(address newOwner) public{
	    if(msg.sender != owner) 
		    revert();
		owner = newOwner;
	}
}