import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getChatContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetMessage = () => {
  // const navigate = useNavigate();
  const [message] = useState(null);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider, address } = useWeb3ModalProvider();

  useEffect(() => {
    (async () => {
      try {
        if (!isSupportedChain(chainId))
          return toast.error("Wrong network!", { position: "top-right" });

        const provider = getProvider(walletProvider);

        const signer = await provider.getSigner();
        const contract = getChatContract(signer);
        const result = await contract.getMessage("Zarah", "Josh");
        console.log(result);
        console.log(result, "here");
      } catch (error) {
        console.error("Error getting user's message:", error);
        return null;
      }
    })();
  }, [address, chainId, walletProvider]);
  return message;
};

export default useGetMessage;
