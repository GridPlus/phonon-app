import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { lockClosedOutline, sendSharp } from "ionicons/icons";
import React from "react";
import { useIsConnected } from "../hooks/useIsConnected";
import { useModal } from "../hooks/useModal";
import { PhononDTO } from "../types";
import SendPhononModal from "./SendPhononModal";

export default function SendPhononButton({ phonon }: { phonon?: PhononDTO }) {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isConnected } = useIsConnected();
  const [present] = useIonToast();

  const handleOnClick = () => {
    if (!isConnected) {
      return present({
        header: "Error",
        message: "Must be connected to send",
        icon: lockClosedOutline,
        duration: 2000,
        color: "danger",
        cssClass: "text-md text-center font-black uppercase",
        translucent: true,
        position: "top",
      });
    }
    if (!phonon) {
      return present({
        header: "Error",
        message: "Must select a Phonon to send",
        icon: lockClosedOutline,
        duration: 2000,
        color: "danger",
        cssClass: "text-md text-center font-black uppercase",
        translucent: true,
        position: "top",
      });
    } else {
      showModal();
    }
  };
  return (
    <>
      <IonButton
        fill="outline"
        color={"primary"}
        onClick={handleOnClick}
        slot="end"
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
      {phonon ? (
        <SendPhononModal {...{ isModalVisible, hideModal, phonon }} />
      ) : null}
    </>
  );
}
