import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import useChain from "../hooks/useChain";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import { useSession } from "../hooks/useSession";
import { useRedeemPhononMutation } from "../store/api";
import { PhononDTO, RedeemPhononDTO } from "../types";
import { weiToEth } from "../utils/denomination";

export default function SendPhononModal({
  isModalVisible,
  hideModal,
  phonon,
}: {
  isModalVisible: boolean;
  hideModal: () => void;
  phonon: PhononDTO;
}) {
  const { sessionId } = useSession();
  const { currentAccount, isAuthenticated } = useChain();
  const [redeemAddress, setRedeemAddress] = useState(currentAccount);
  const [redeemPhonon, { isLoading }] = useRedeemPhononMutation();
  const { chain } = useChainByCurrencyType(phonon.CurrencyType);

  const onSubmit = (payload: RedeemPhononDTO[]) => {
    if (!isAuthenticated) {
      throw new Error("Must be authenticated with MetaMask.");
    }
    if (payload.length) {
      if (payload.length) {
        redeemPhonon({ payload, sessionId }).catch(console.error);
      }
    }
  };

  const handleSubmit = () => {
    return onSubmit([{ P: phonon, RedeemAddress: redeemAddress }]);
  };

  const onChangeRedeemAddress = (value: string) => {
    setRedeemAddress(value);
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={hideModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Redeem {chain?.name} Phonon
        </p>
        <p className="text-l font-bold text-center text-gray-400 uppercase">
          {`${weiToEth(phonon.Denomination)} ${chain ? chain.ticker : "ERR"}`}
        </p>

        <form className="flex flex-col mt-10 gap-10" onSubmit={handleSubmit}>
          <input
            className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
            placeholder="Recipient Address"
            onChange={(event) => onChangeRedeemAddress(event.target.value)}
            value={redeemAddress}
            disabled={isLoading}
          />
          <IonButton
            key="submit"
            size="large"
            type="submit"
            fill="solid"
            expand="full"
            color="tertiary"
            disabled={isLoading}
          >
            REDEEM
          </IonButton>
          <IonButton
            size="large"
            expand="full"
            fill="clear"
            color="medium"
            onClick={hideModal}
            disabled={isLoading}
          >
            CANCEL
          </IonButton>
        </form>
      </div>
    </IonModal>
  );
}
