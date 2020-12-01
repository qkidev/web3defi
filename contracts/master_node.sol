// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.7.5;
contract master_node{
    
    mapping (address => uint) public  balanceOf;
    address[] public  master_nodes;
    
    address public owner;
    
    
    event  Withdrawal(address indexed src, uint wad);
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() payable external {
        deposit();
    }
    function deposit() public payable {
        for(uint i;i<master_nodes.length;i++)
        {
            balanceOf[master_nodes[i]] += msg.value/master_nodes.length;
        }
    }
    
    function add_master_node(address new_node) public {
        if(msg.sender != owner)revert();
        for(uint i;i<master_nodes.length;i++)
        {
            require(master_nodes[i] != new_node);
        }
        master_nodes.push(new_node);
    }
    
    function update_node(uint index,address new_node)public {
        if(msg.sender != owner)revert();
        master_nodes[index] = new_node;
    }
    
    function node_amount() public view returns (uint amount){
        return master_nodes.length;
    }

    
    function setOwner(address new_owner) public {
        if(msg.sender != owner)revert();
        owner = new_owner;
    }
    
    function withdraw() public {
        require(balanceOf[msg.sender] >  0);
        uint wad = balanceOf[msg.sender];
        balanceOf[msg.sender] = 0;
        msg.sender.transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }
}