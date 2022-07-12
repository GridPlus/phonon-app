import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React from "react";
import { CHAINS } from "../constants/chains";
import "../index.css";
import { PhononDTO } from "../types";
import { abbreviateHash } from "../utils/addresses";
import { weiToEth } from "../utils/denomination";
import { isGreaterThan } from "../utils/math";
import ChainBadge from "./ChainBadge";

const PhononListItem: React.FC<{
  phonon: PhononDTO;
  selectedPhonon: PhononDTO | undefined;
  setSelectedPhonon: React.Dispatch<
    React.SetStateAction<PhononDTO | undefined>
  >;
}> = ({ phonon, selectedPhonon, setSelectedPhonon }) => {
  const chain = CHAINS[phonon.ChainID] ?? null;
  const isSelected = selectedPhonon === phonon;

  const isChainValid = !!chain;

  return (
    <IonItem
      button
      detail={false}
      onClick={() => {
        if (selectedPhonon === phonon) {
          setSelectedPhonon(undefined);
        } else {
          setSelectedPhonon(phonon);
        }
      }}
      color={isSelected ? "dark" : ""}
      fill={isSelected ? "outline" : undefined}
    >
      <IonLabel>
        <div className="flex items-center">
          <div>{isChainValid ? <ChainBadge chain={chain} /> : null}</div>
          <div>
            <h2 className="text-md uppercase font-black">
              {isGreaterThan(phonon.Denomination, 0) ? (
                weiToEth(phonon.Denomination)
              ) : (
                <IonSpinner />
              )}{" "}
              {chain?.ticker}
            </h2>
            <p className="text-slate-400">{abbreviateHash(phonon.PubKey)}</p>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default PhononListItem;
