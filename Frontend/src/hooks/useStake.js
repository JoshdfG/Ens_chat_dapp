import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/provider";
import { getProposalsContract } from "../constants/contracts";
import { ethers } from "ethers";

const useStake = (amount) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id) => {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network !", { position: "top-right" });

      const readWriteProvider = getProvider(walletProvider);

      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      const stakeAmount = ethers.parseUnits(amount, 18);

      try {
        const stakeTransaction = await contract.stake(id, stakeAmount);

        console.log("transaction: ", stakeTransaction);

        const receipt = await stakeTransaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Staked successfully !", {
            position: "top-right",
          });
        }

        toast.error("Staking failed !", { position: "top-right" });
      } catch (error) {
        console.log(error);

        toast.error(error.reason, { position: "top-right" });
      }
    },
    [chainId, walletProvider, amount]
  );
};

export default useStake;
