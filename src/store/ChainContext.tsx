import React, { createContext, ReactNode, useState } from "react";
import { CHAINS } from "../constants/chains";

/**
 * A React Hook that allows us to pass data down the component tree without having to pass
 * props.
 */
export const ChainContext = createContext<any>(undefined);

export const ChainContextProvider = ({
  children,
  overrides,
}: {
  children: ReactNode;
  overrides?: { [key: string]: any };
}) => {
  const [chainId, setChainId] = useState<number>();
  const [currentChain, setCurrentChain] = useState<
    { apiRoute: string; baseUrl: string; name: string } | undefined
  >();
  const [currentAccount, setCurrentAccount] = useState();

  //@ts-expect-error - todo: add ethereum module
  const ethProvider = window.ethereum as any;
  if (!ethProvider) {
    throw new Error("No Ethereum provider found.");
  }

  ethProvider.on("connect", handleChainsChanged);
  ethProvider.on("chainChanged", handleChainsChanged);
  ethProvider.on("accountsChanged", handleAccountsChanged);

  const getMetadataForChainId = (chainId) => {
    const chainIdAsString = parseInt(
      chainId,
      16
    ).toString() as keyof typeof CHAINS;
    try {
      return CHAINS[chainIdAsString];
    } catch (err) {
      console.error(err);
    }
  };

  const defaultContext = {
    currentAccount,
    chainId,
    currentChain,
    authenticate,
    getMetadataForChainId,
  };

  function handleChainsChanged(chainId) {
    if (!chainId) {
      // MetaMask is locked or the user has not connected any chainId
      console.log("Please connect to MetaMask.");
    } else if (chainId !== currentChain) {
      setChainId(parseInt(chainId, 16));
      setCurrentChain(getMetadataForChainId(chainId));
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      // Do any other work!
    }
  }

  function authenticate() {
    ethProvider
      .request({ method: "eth_chainId" })
      .then(handleChainsChanged)
      .catch(console.error);

    ethProvider
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  }

  return (
    <ChainContext.Provider value={{ ...defaultContext, ...overrides }}>
      {children}
    </ChainContext.Provider>
  );
};
