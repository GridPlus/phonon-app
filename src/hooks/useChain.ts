import { useContext } from "react";
import { CHAINS } from "../constants/chains";
import { ChainContext } from "../store/ChainContext";

const useChain = () => {
  const { chainId } = useContext(ChainContext);
  const _chainId = parseInt(chainId);
  const isChainIdValid = CHAINS[_chainId] !== undefined;
  if (isChainIdValid) {
    const chain = CHAINS[_chainId];
    if (chain) return { chain, chainId };
  }
  throw Error("No chain found");
};

export default useChain;
