import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getEnsContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";

const useRegister = () => {
  const navigate = useNavigate();
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const registerENs = async (name, image) => {
    // Check if the current network is supported
    if (!isSupportedChain(chainId)) {
      return toast.error("Wrong network!", { position: "top-right" });
    }

    // Get the provider and signer
    const register = getProvider(walletProvider);
    const signer = await register.getSigner();

    // Initialize the contract with the signer
    const contract = getEnsContract(signer);

    try {
      // Call the register function on the contract
      const tx = await contract.register(name, image);
      console.log("registration: ", tx);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("receipt: ", receipt);

      // Check if the transaction was successful
      if (receipt.status) {
        navigate("/chat"); // Navigate to the chat page
        return toast.success("Registration successful!", {
          position: "top-right",
        });
      }

      // Handle registration failure
      toast.error("Registration failed!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!", { position: "top-right" });
    }
  };

  return { registerENs };
};

export default useRegister;
