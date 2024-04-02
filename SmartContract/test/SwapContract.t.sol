// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import "../src/Chat.sol";
import "../src/ENS.sol";

contract ENSContractTest is Test {
    ENSContract public ensContract;
    ChatDApp public chatDApp;

    function setUp() public {
        ensContract = new ENSContract();
        chatDApp = new ChatDApp(address(ensContract));
    }

    function testRegister() public {
        string memory name = "Alice";
        string memory image = "https://example.com/alice.png";
        ensContract.register(name, image);

        // Assert that the user's name and image were set correctly
        assertEq(ensContract.getName(address(this)), name);
        assertEq(ensContract.getImage(address(this)), image);
    }

    function testRegisterFailsWithEmptyName() public {
        string memory name = "";
        string memory image = "https://example.com/alice.png";
        // This should fail because the name is empty
        try ensContract.register(name, image) {
            fail();
        } catch Error(string memory reason) {
            // Correctly catching the error and using the reason variable directly.
            assertEq(reason, "Name cannot be empty");
        }
    }

    function testRegisterFailsWithDuplicateName() public {
        string memory name = "Josh";
        string memory image = "https://example.com/alice.png";
        ensContract.register(name, image);

        // This should fail because the name is already registered
        try ensContract.register(name, image) {
            fail();
        } catch Error(string memory reason) {
            assertEq(reason, "Name is already registered");
        }
    }

    function testGetAddress() public {
        string memory name = "Josh";
        string memory image = "https://example.com/Josh.png";
        ensContract.register(name, image);

        // Assert that the address associated with the name is correct
        assertEq(ensContract.getAddress(name), address(this));
    }

    ///CHAT

    //     function testSendMessage() public {
    //         ensContract.register("Josh", "https://example.com/Josh.png");
    //         ensContract.register("Bobby", "https://example.com/Bobby.png");

    //         // Alice sends a message to Bob
    //         chatDApp.sendMessage("Bobby", "Hello, Bobby!");

    // message = chatDApp.getMessage("Josh", "Bobby", 0);
    //         assertEq(senderName, "Josh");
    //         assertEq(receiverName, "Bobby");
    //         assertEq(content, "Hello, Bobby!");
    //     }

    function testGetMessagesCount() public {
        // Register names for the sender and receiver
        ensContract.register("Josh", "https://example.com/Josh.png");
        ensContract.register("Bobby", "https://example.com/Bobby.png");

        // Josh sends a message to Bobby
        chatDApp.sendMessage("Bobby", "Hello, Bobby!");

        // Assert that the messages count is as expected
        uint256 count = chatDApp.getMessagesCount("Josh", "Bobby");
        assertEq(count, 0);
    }
}
