// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ENSContract {
    mapping(address => string) userNames;
    mapping(address => string) userImages;

    event UserNameUpdated(address indexed user, string name);
    event UserImageUpdated(address indexed user, string image);

    function register(string memory _name, string memory _image) public {
        userNames[msg.sender] = _name;
        userImages[msg.sender] = _image;
        emit UserNameUpdated(msg.sender, _name);
        emit UserImageUpdated(msg.sender, _image);
    }

    function getName(address _user) public view returns (string memory) {
        return userNames[_user];
    }

    function getImage(address _user) public view returns (string memory) {
        return userImages[_user];
    }
}
