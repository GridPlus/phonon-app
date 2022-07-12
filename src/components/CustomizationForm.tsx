import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel, IonText } from "@ionic/react";
import React from "react";
import { CHAINS } from "../constants/chains";
import { useSession } from "../hooks/useSession";
import "../index.css";
import { ChainValue } from "../types";

const CustomizationForm: React.FC<ChainValue> = ({ chainId, value }) => {
  const { sessionId } = useSession();
  const chain = CHAINS[chainId];

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
            {value} {chain.ticker}
          </h1>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

export default CustomizationForm;
