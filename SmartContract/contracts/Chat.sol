// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ENS.sol";

contract ChatDApp {
    ENSContract ensContract;

    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(address => mapping(address => Message[])) public chats;

    event MessageSent(
        address indexed sender,
        address indexed receiver,
        string content,
        uint256 timestamp
    );

    constructor(address _ensContractAddress) {
        ensContract = ENSContract(_ensContractAddress);
    }

    function sendMessage(address _receiver, string memory _content) public {
        require(bytes(_content).length > 0, "Message content cannot be empty");
        string memory senderName = ensContract.getName(msg.sender);
        string memory receiverName = ensContract.getName(_receiver);
        require(
            bytes(senderName).length > 0 && bytes(receiverName).length > 0,
            "Sender and receiver must have registered names"
        );

        Message memory message = Message(
            msg.sender,
            _receiver,
            _content,
            block.timestamp
        );
        chats[msg.sender][_receiver].push(message);
        chats[_receiver][msg.sender].push(message);
        emit MessageSent(msg.sender, _receiver, _content, block.timestamp);
    }

    function getMessage(
        address _sender,
        address _receiver,
        uint256 _index
    )
        public
        view
        returns (
            address sender,
            address receiver,
            string memory content,
            uint256 timestamp
        )
    {
        require(
            _index < chats[_sender][_receiver].length,
            "Invalid message index"
        );
        Message memory message = chats[_sender][_receiver][_index];
        return (
            message.sender,
            message.receiver,
            message.content,
            message.timestamp
        );
    }

    function getMessagesCount(
        address _sender,
        address _receiver
    ) public view returns (uint256) {
        return chats[_sender][_receiver].length;
    }
}
