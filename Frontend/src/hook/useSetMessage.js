import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getChatContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";

const useMessage = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const setUserMessage = async (userName, message) => {
    if (!isSupportedChain(chainId)) {
      return toast.error("Wrong network!", { position: "top-right" });
    }

    const register = getProvider(walletProvider);
    const signer = await register.getSigner();

    const contract = getChatContract(signer);

    try {
      // Call the sendMessage function on the contract with appropriate arguments
      const tx = await contract.sendMessage(userName, message);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("receipt: ", receipt);

      // Handle success
      toast.success("Message sent successfully!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Message sending failed!", { position: "top-right" });
    }
  };
  return { setUserMessage };
};

export default useMessage;
