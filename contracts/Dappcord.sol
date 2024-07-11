// SPDX-License-Identifier
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721{
    address public owner;
    uint256 public totalChannels;
    uint256 public totalSupply;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor() ERC721("Token","Tk") {
        owner = msg.sender;
    }

    struct Channel{
        uint256 id;
        string name;
        uint256 cost;
    }
    mapping(uint256=>Channel) public channels;
    mapping(uint=> mapping(address=>bool)) public hasJoined;

    function createChannel(string memory _name, uint256 _cost)public onlyOwner{
        totalChannels++;
        channels[totalChannels]=Channel(totalChannels, _name, _cost);
    }
    function getChannel(uint256 _id)public view returns(Channel memory){
        return channels[_id];
    }
    function withdraw() public onlyOwner{
        (bool success,) = owner.call{value: address(this).balance}("");

    }
    function mint(uint256 _id) public payable{
        require(_id != 0);
        require(_id <=totalChannels);
        require(hasJoined[_id][msg.sender]=false);
        require(msg.value >= channels[_id].cost);

        hasJoined[_id][msg.sender]= false;
        totalSupply++;
        _safeMint(msg.sender, totalSupply);

    }
}
//0x5FbDB2315678afecb367f032d93F642f64180aa3