import { ethers } from "ethers";
import chatABI from "./chatApp.json";
import ENS_Abi from "./ensAbi.json";

export const getChatContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_CHAT_CONTRACT_ADDRESS,
    chatABI,
    providerOrSigner
  );
};

export const getEnsContract = (provider) =>
  new ethers.Contract(
    import.meta.env.VITE_ENS_CONTRACT_ADDRESS,
    ENS_Abi,
    provider
  );
