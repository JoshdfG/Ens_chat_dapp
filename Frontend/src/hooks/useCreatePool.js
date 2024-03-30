import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProposalsContract } from "../constants/contracts";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";

const useCreatePool = (rate) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", { position: "top-right" });

    const readWriteProvider = getProvider(walletProvider);

    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const formattedRate = Number(rate);

      //create pool
      const poolCreationTx = await contract.createPool(formattedRate);

      console.log("transaction: ", poolCreationTx);

      const receipt = await poolCreationTx.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Pool Creation successfully !", {
          position: "top-right",
        });
      }

      toast.error("Pool creation failed !", { position: "top-right" });
    } catch (error) {
      console.log(error);
      if (error)
        return toast.error("Pool creation failed !", { position: "top-right" });
    }
  }, [chainId, walletProvider, rate]);
};

export default useCreatePool;
