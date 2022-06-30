import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import { useIsConnected } from "../hooks/useIsConnected";
import { useSession } from "../hooks/useSession";
import { usePairMutation, useSendPhononMutation } from "../store/api";
import { PhononDTO, SendPhononDTO } from "../types";
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
  const [cardId, setCardId] = useState("");
  const [sendPhonon, { isLoading }] = useSendPhononMutation();
  const [pair] = usePairMutation();
  const { chain } = useChainByCurrencyType(phonon.CurrencyType);
  const { isConnected } = useIsConnected();

  const onSubmit = async (payload: SendPhononDTO) => {
    if (payload.length) {
      if (!isConnected) {
        throw new Error("Must be connected.");
      }
      await pair({ cardId, sessionId })
        .then(() => {
          return sendPhonon({ payload, sessionId })
            .then(hideModal)
            .catch(console.error);
        })
        .catch(console.error);
    }
  };

  const handleSubmit = () => {
    return onSubmit([phonon]);
  };

  const onChangeCardId = (value: string) => {
    setCardId(value);
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={hideModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Send {chain?.name} Phonon
        </p>
        <p className="text-l font-bold text-center text-gray-400 uppercase">
          {`${weiToEth(phonon.Denomination)} ${chain ? chain.ticker : "ERR"}`}
        </p>

        <form className="flex flex-col mt-10 gap-10" onSubmit={handleSubmit}>
          <input
            className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
            placeholder="Recipient Card ID"
            onChange={(event) => onChangeCardId(event.target.value)}
            value={cardId}
            disabled={isLoading}
          />
          <IonButton
            key="submit"
            size="large"
            type="submit"
            fill="solid"
            expand="full"
            color="primary"
            disabled={isLoading}
          >
            Send
          </IonButton>
          <IonButton
            size="large"
            expand="full"
            fill="clear"
            color="medium"
            onClick={hideModal}
          >
            CANCEL
          </IonButton>
        </form>
      </div>
    </IonModal>
  );
}
