import { useContext } from "react";
import { CHAINS, DEFAULT_CHAIN } from "../constants/chains";
import { ChainContext } from "../store/ChainContext";

const useChain = () => {
  const { chainId } = useContext(ChainContext);
  const _chainId = parseInt(chainId);
  const isChainIdValid = CHAINS[_chainId] !== undefined;
  if (isChainIdValid) {
    const chain = CHAINS[_chainId];
    if (chain) return { chain, chainId };
  }
  return { chain: DEFAULT_CHAIN, chainId: 0 };
};

export default useChain;
