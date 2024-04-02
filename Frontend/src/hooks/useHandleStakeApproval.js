import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import erc20Abi from "../constants/erc20Abi.json";
import { getProvider } from "../constants/provider";

const useHandleStakeApproval = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", { position: "top-right" });

    const readWriteProvider = getProvider(walletProvider);

    const signer = await readWriteProvider.getSigner();

    const amount = ethers.parseUnits("100", 18);

    try {
      //approve
      const stake = new ethers.Contract(
        import.meta.env.VITE_STAKETOKEN_CONTRACT_ADDRESS,
        erc20Abi,
        signer
      );

      const approveTx = await stake.approve(
        import.meta.env.VITE_STAKING_CONTRACT_ADDRESS,
        amount
      );

      const approveReceipt = await approveTx.wait();

      if (approveReceipt.status) {
        return toast.success("Approval successfully !", {
          position: "top-right",
        });
      }

      toast.error("Approval failed !", { position: "top-right" });
    } catch (error) {
      console.log(error);

      toast.error(error.reason, { position: "top-right" });
    }
  }, [chainId, walletProvider]);
};

export default useHandleStakeApproval;
