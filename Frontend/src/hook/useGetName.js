import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getEnsContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
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
        // if (!address) {
        //   // console.log("hsre");
        //   return;
        // }
        if (!isSupportedChain(chainId))
          return toast.error("Wrong network!", { position: "top-right" });

        const provider = getProvider(walletProvider);

        const signer = await provider.getSigner();
        const contract = getEnsContract(signer);
        const result = await contract.getUser();
        // console.log(result, "Result");
        if (result.userAddress.toString() !== ethers.ZeroAddress.toString()) {
          setENS(result);
        }

        // const name = await contract.getName(_user);
      } catch (error) {
        console.error("Error getting user's name:", error);
        return null;
      }
    })();
  }, [address, chainId, walletProvider]);
  return ens;
  // return useCallback(
  //   async (name, image) => {
  //     if (!isSupportedChain(chainId))
  //       return toast.error("Wrong network!", { position: "top-right" });

  //     const register = getProvider(walletProvider);

  //     const signer = await register.getSigner();

  //     const contract = getEnsContract(signer);

  //     try {
  //       // Create pool
  //       const tx = await contract.register(name, image);

  //       console.log("registration: ", tx);

  //       const receipt = await tx.wait();

  //       console.log("receipt: ", receipt);

  //       if (receipt.status) {
  //         navigate("/chat");
  //         return toast.success("Registration successful!", {
  //           position: "top-right",
  //         });
  //       }

  //       toast.error("Registration failed!", { position: "top-right" });
  //     } catch (error) {
  //       console.log(error);
  //       if (error)
  //         return toast.error("Registration failed!", {
  //           position: "top-right",
  //         });
  //     }
  //   },
  //   [chainId, navigate, walletProvider]
  // );
};

export default useGetENS;
