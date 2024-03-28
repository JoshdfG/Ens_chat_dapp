// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../contracts/Chat.sol";
import "../contracts/ENS.sol";

contract ENSContractTest is Test {
    ENSContract public ensContract;
    ChatDApp public chatDApp;

    function setUp() public {
        ensContract = new ENSContract();
        chatDApp = new ChatDApp(address(ensContract));
    }

    function testRegister() public {
        string memory name = "Josh";
        string memory image = "https://jpeg.com/alice.png";
        ensContract.register(name, image);
        assertEq(ensContract.getName(address(this)), name);
        assertEq(ensContract.getImage(address(this)), image);
    }

    function testGetName() public {
        string memory name = "Bob";
        string memory image = "https://example.com/bob.png";
        ensContract.register(name, image);
        assertEq(ensContract.getName(address(this)), name);
    }

    function testGetImage() public {
        string memory name = "Charlie";
        string memory image = "https://example.com/charlie.png";
        ensContract.register(name, image);
        assertEq(ensContract.getImage(address(this)), image);
    }

    ///CHAT
    function testSendMessage() public {
        ensContract.register("Alice", "https://example.com/alice.png");
        ensContract.register("Bob", "https://example.com/bob.png");

        chatDApp.sendMessage(address(ensContract), "Hello, Bob!");

        (address sender, address receiver, string memory content, ) = chatDApp
            .getMessage(address(this), address(ensContract), 0);
        assertEq(sender, address(this));
        assertEq(receiver, address(ensContract));
        assertEq(content, "Hello, Bob!");
    }

    function testGetMessagesCount() public {
        ensContract.register("Alice", "https://example.com/alice.png");
        ensContract.register("Bob", "https://example.com/bob.png");

        chatDApp.sendMessage(address(ensContract), "Hello, Bob!");
        chatDApp.sendMessage(address(ensContract), "How are you?");

        uint256 count = chatDApp.getMessagesCount(
            address(this),
            address(ensContract)
        );
        assertEq(count, 2);
    }
}
