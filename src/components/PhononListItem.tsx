import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React from "react";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import "../index.css";
import { PhononDTO } from "../types";
import { abbreviateHash } from "../utils/addresses";
import { weiToEth } from "../utils/denomination";
import { isGreaterThan } from "../utils/math";
import ChainBadge from "./ChainBadge";
import RedeemPhononButton from "./RedeemPhononButton";
import SendPhononButton from "./SendPhononButton";

const PhononListItem: React.FC<{ phonon: PhononDTO }> = ({ phonon }) => {
  const { chain } = useChainByCurrencyType(phonon.CurrencyType);

  if (!chain) {
    throw new Error("Chain unavailable. Please reload.");
  }

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
        <ChainBadge chain={chain} />
      </IonLabel>
      <SendPhononButton phonon={phonon} />
      <RedeemPhononButton phonon={phonon} />
    </IonItem>
  );
};

export default PhononListItem;
