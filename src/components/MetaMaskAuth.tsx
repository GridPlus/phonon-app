import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import React, { useContext } from "react";

import { ChainContext } from "../store/ChainContext";

export const MetaMaskAuth = () => {
  const { connect, currentAccount, currentChain } = useContext(ChainContext);
  return (
    <>
      {currentChain?.name ? (
        <IonBadge color="primary" className="mr-2">
          {currentChain.name}
        </IonBadge>
      ) : (
        <IonBadge color="danger" className="mr-2">
          Unsupported Chain
        </IonBadge>
      )}
      {currentAccount ? (
        <IonButton
          fill="outline"
          color="secondary"
          slot="end"
          // TODO: logout? onClick={connect}
        >
          <IonIcon slot="end" icon={lockOpenOutline} />
          {currentAccount.slice(0, 6)}
        </IonButton>
      ) : (
        <IonButton fill="outline" color="primary" slot="end" onClick={connect}>
          <IonIcon slot="end" icon={lockClosedOutline} />
          Authenticate
        </IonButton>
      )}
    </>
  );
};
