import { useContext } from "react";
import { CHAINS } from "../constants/chains";
import { ChainContext } from "../store/ChainContext";

const useChain = () => {
  const { chainId, currentAccount, authenticate } = useContext(ChainContext);
  const _chainId = parseInt(chainId);
  const isChainIdValid = CHAINS[_chainId] !== undefined;
  const isAuthenticated = !!currentAccount;
  const defaultExports = { authenticate, currentAccount, isAuthenticated };
  if (isChainIdValid) {
    const chain = CHAINS[_chainId];
    if (chain) return { chain, chainId, ...defaultExports };
  }
  return {
    chain: null,
    chainId: 0,
    ...defaultExports,
  };
};

export default useChain;
