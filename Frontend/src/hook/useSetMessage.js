import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getChatContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";

const useSetMessage = () => {
  const [chat, setChat] = useState("");
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider, address } = useWeb3ModalProvider();

  const sendMessage = async (receiverName, content) => {
    try {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network!", { position: "top-right" });

      const provider = getProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = getChatContract(signer);

      // Assuming sendMessage function is defined in the contract
      await contract.sendMessage(receiverName, content);

      // Perform any additional actions after sending the message if needed

      // Example: Update UI, show success message, etc.
      toast.success("Message sent successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message!", { position: "top-right" });
    }
  };

  useEffect(() => {
    // Fetch chat data or any initial setup if needed
    (async () => {
      try {
        if (!isSupportedChain(chainId))
          return toast.error("Wrong network!", { position: "top-right" });

        const provider = getProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = getChatContract(signer);
        const result = await contract.getUser();
        if (
          result.userAddress.toString() !==
          ethers.constants.AddressZero.toString()
        ) {
          setChat(result);
        }
      } catch (error) {
        console.error("Error getting user's name:", error);
        // Handle error if necessary
      }
    })();
  }, [address, chainId, walletProvider]);

  return { chat, sendMessage }; // Return chat data and sendMessage function
};

export default useSetMessage;
