import { IonButton } from "@ionic/react";
import React from "react";
import useChain from "../hooks/useChain";

import ChainBadge from "./ChainBadge";

export const MetaMaskAuth = () => {
  const { authenticate, chain, currentAccount } = useChain();

  return (
    <>
      <ChainBadge chain={chain ? chain : undefined} />
      {currentAccount ? (
        <IonButton
          fill="outline"
          color="secondary"
          slot="end"
          // TODO: logout on click
        >
          {currentAccount.slice(0, 8)} &#8230;
        </IonButton>
      ) : (
        <IonButton
          fill="outline"
          color="primary"
          slot="end"
          onClick={authenticate}
        >
          Connect Wallet
        </IonButton>
      )}
    </>
  );
};
