import { useEffect, useState } from "react";
import { getProposalsContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/provider";
import { ethers } from "ethers";
import stakingAbi from "../constants/stakingAbi.json";
import multicallAbi from "../constants/multicall2.json";

const useGetPools = () => {
  const [data, setData] = useState([]);
  const [numOfPool, setNumOfPool] = useState(0);

  const contract = getProposalsContract(readOnlyProvider);

  useEffect(() => {
    (async () => {
      contract
        .id()
        .then((res) => setNumOfPool(Number(res)))
        .catch((err) => console.log(err));

      const poolIDs = [...Array.from({ length: numOfPool })].map(
        (_, index) => index
      );

      //   console.log(poolIDs);

      const itf = new ethers.Interface(stakingAbi);
      const calls = poolIDs.map((x) => ({
        target: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS,
        callData: itf.encodeFunctionData("getPoolByID", [x]),
      }));

      //multicall
      const multicall = new ethers.Contract(
        import.meta.env.VITE_MULTICALL_CONTRACT_ADDRESS,
        multicallAbi,
        readOnlyProvider
      );

      // eslint-disable-next-line no-unused-vars
      const [_, result] = await multicall.aggregate.staticCall(calls);

      const decodedResponses = result.map((x) =>
        itf.decodeFunctionResult("getPoolByID", x)
      );

      //   console.log(decodedResponses);

      const formattedData = decodedResponses.map((response, i) => {
        const formattedObject = {};
        const values = Object.values(response[0]);
        formattedObject.index = i;
        formattedObject.totalStakers = values[0];
        formattedObject.totalStaked = values[1];
        formattedObject.rewardReserve = values[2];
        formattedObject.rewardRate = values[3];
        return formattedObject;
      });

      //   console.log(formattedData);

      setData([...formattedData]);
    })();
  }, [contract, numOfPool]);

  return data;
};

export default useGetPools;
