// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ENS.sol";

contract ChatDApp {
    ENSContract ensContract;

    struct Message {
        string senderName;
        string receiverName;
        string content;
        uint256 timestamp;
    }

    mapping(string => mapping(string => Message[])) public chats;

    event MessageSent(
        string indexed senderName,
        string indexed receiverName,
        string content,
        uint256 timestamp
    );

    constructor(address _ensContractAddress) {
        ensContract = ENSContract(_ensContractAddress);
    }

    function sendMessage(
        string memory _receiverName,
        string memory _content
    ) public {
        require(bytes(_content).length > 0, "Message content cannot be empty");
        string memory senderName = ensContract.getName(msg.sender);
        require(
            bytes(senderName).length > 0,
            "Sender must have a registered name"
        );
        require(
            bytes(_receiverName).length > 0,
            "Receiver name cannot be empty"
        );

        address receiverAddress = ensContract.getAddress(_receiverName);
        require(
            receiverAddress != address(0),
            "Receiver must have a registered name"
        );

        Message memory message = Message(
            senderName,
            _receiverName,
            _content,
            block.timestamp
        );
        chats[senderName][_receiverName].push(message);
        emit MessageSent(senderName, _receiverName, _content, block.timestamp);
    }

    function getMessage(
        string memory _senderName,
        string memory _receiverName
    ) public view returns (Message[] memory) {
        Message[] memory message = chats[_senderName][_receiverName];
        return message;
    }

    function getMessagesCount(
        string memory _senderName,
        string memory _receiverName
    ) public view returns (uint256) {
        return chats[_senderName][_receiverName].length;
    }
}
