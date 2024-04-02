import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getEnsContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";

const useGetENS = () => {
  // const navigate = useNavigate();
  const [ens, setENS] = useState(null);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider, address } = useWeb3ModalProvider();

  useEffect(() => {
    (async () => {
      try {
        if (!isSupportedChain(chainId))
          return toast.error("Wrong network!", { position: "top-right" });

        const provider = getProvider(walletProvider);

        const signer = await provider.getSigner();
        const contract = getEnsContract(signer);
        const result = await contract.getUser();
        console.log(result, "here");
        if (result.userAddress.toString() !== ethers.ZeroAddress.toString()) {
          setENS(result);
        }
      } catch (error) {
        console.error("Error getting user's name:", error);
        return null;
      }
    })();
  }, [address, chainId, walletProvider]);
  return ens;
};

export default useGetENS;
