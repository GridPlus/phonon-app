import { IonButton, IonIcon } from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import React from "react";
import { useIsConnected } from "../hooks/useIsConnected";
import { useModal } from "../hooks/useModal";
import { PhononDTO } from "../types";
import SendPhononModal from "./SendPhononModal";

export default function SendPhononButton({ phonon }: { phonon: PhononDTO }) {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isConnected } = useIsConnected();

  return (
    <>
      <IonButton
        fill="outline"
        color={"primary"}
        onClick={showModal}
        slot="end"
        disabled={!isConnected}
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
      <SendPhononModal {...{ isModalVisible, hideModal, phonon }} />
    </>
  );
}
