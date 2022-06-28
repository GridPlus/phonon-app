import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React from "react";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import "../index.css";
import { PhononDTO } from "../types";
import { abbreviateHash } from "../utils/addresses";
import { weiToEth } from "../utils/denomination";
import { isGreaterThan } from "../utils/math";

const PhononListItem: React.FC<{ phonon: PhononDTO }> = ({ phonon }) => {
  const chain = useChainByCurrencyType(phonon.CurrencyType);

  return (
    <IonItem>
      <IonAvatar slot="start">
        <FontAwesomeIcon
          icon={chain.icon}
          size="2x"
          className={chain.textColor}
        />
      </IonAvatar>
      <IonLabel>
        <h2>
          {isGreaterThan(phonon.Denomination, 0) ? (
            weiToEth(phonon.Denomination)
          ) : (
            <IonSpinner />
          )}{" "}
          {chain.ticker}
        </h2>
        <p>{abbreviateHash(phonon.PubKey)}</p>
      </IonLabel>
    </IonItem>
  );
};

export default PhononListItem;
