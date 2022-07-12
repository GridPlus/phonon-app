import { IonBadge } from "@ionic/react";
import React from "react";
import { Chain } from "../constants/chains";

export default function ChainBadge({ chain }: { chain?: Chain }) {
  return (
    <>
      {chain ? (
        <IonBadge className={"mr-2 " + `${chain.bgColor}`}>
          {chain.name}
        </IonBadge>
      ) : (
        <IonBadge color="danger" className="mr-2">
          Chain Unavailable
        </IonBadge>
      )}
    </>
  );
}
