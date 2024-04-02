import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/provider";
import { getProposalsContract } from "../constants/contracts";

const useClaimReward = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id) => {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network !", { position: "top-right" });

      const readWriteProvider = getProvider(walletProvider);

      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      try {
        const claimTransaction = await contract.claimReward(id);

        console.log("transaction: ", claimTransaction);

        const receipt = await claimTransaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Claimed successfully !", {
            position: "top-right",
          });
        }

        toast.error("Claiming failed !", { position: "top-right" });
      } catch (error) {
        console.log(error);

        toast.error(error.reason, { position: "top-right" });
      }
    },
    [chainId, walletProvider]
  );
};

export default useClaimReward;
