import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import useChain from "../hooks/useChain";
import { useSession } from "../hooks/useSession";
import { useSendPhononMutation, usePairMutation } from "../store/api";
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
  const { chain } = useChain();

  const onSubmit = async (payload: SendPhononDTO) => {
    if (payload.length) {
      // TODO: MAKE SURE IT'S CONNECTED
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
      <div className="flex flex-col content-center justify-start gap-2">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Send {chain.ticker}
        </p>
        <form
          className="flex flex-col content-center justify-start h-full gap-2 p-2"
          onSubmit={handleSubmit}
        >
          <input
            className="text-bold p-2 text-xl bg-zinc-800 shadow-inner w-auto"
            placeholder="Send Address"
            onChange={(event) => onChangeCardId(event.target.value)}
            value={cardId}
            disabled={isLoading}
          />
          {`${weiToEth(phonon.Denomination)} ${chain.ticker}`}
          <div className="pinned">
            <IonButton
              key="submit"
              size="large"
              type="submit"
              fill="solid"
              expand="full"
              color="primary"
              className="shadow-lg shadow-teal-300/40"
              disabled={isLoading}
            >
              Send
            </IonButton>
          </div>
        </form>
      </div>
    </IonModal>
  );
}
