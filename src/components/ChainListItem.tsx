import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { CHAINS } from "../constants/chains";
import "../index.css";
import { ChainValue } from "../types";
import { weiToEth } from "../utils/denomination";

const ChainListItem: React.FC<ChainValue & { isLoading: boolean }> = ({
  chainId,
  value,
  isLoading,
}) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const chain = CHAINS[chainId];
  const label = weiToEth(value?.toString() ?? "0");

  return (
    <IonItem routerLink={`/${sessionId}/${chainId}/`}>
      <IonAvatar slot="start">
        <FontAwesomeIcon
          icon={chain.icon}
          size="2x"
          className={chain.textColor}
        />
      </IonAvatar>
      <IonLabel>
        <IonText color="light">
          <h1 className="text-xl">
            {isLoading ? <IonSpinner /> : label} {chain.ticker}
          </h1>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

export default ChainListItem;
