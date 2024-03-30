// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ENSContract {
    mapping(address => string) public userNames;
    mapping(string => address) public nameToAddress;
    mapping(address => string) public userImages;

    event UserNameUpdated(address indexed user, string name);
    event UserImageUpdated(address indexed user, string image);

    function register(string memory _name, string memory _image) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            nameToAddress[_name] == address(0),
            "Name is already registered"
        );
        userNames[msg.sender] = _name;
        nameToAddress[_name] = msg.sender;
        userImages[msg.sender] = _image;
        emit UserNameUpdated(msg.sender, _name);
        emit UserImageUpdated(msg.sender, _image);
    }

    function getName(address _user) public view returns (string memory) {
        return userNames[_user];
    }

    function getAddress(string memory _name) public view returns (address) {
        return nameToAddress[_name];
    }

    function getImage(address _user) public view returns (string memory) {
        return userImages[_user];
    }
}
