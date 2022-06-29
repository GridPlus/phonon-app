import { IonButton, IonIcon } from "@ionic/react";
import { qrCode } from "ionicons/icons";
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import ReceivePhononModal from "./ReceivePhononModal";

export default function ReceivePhononButton() {
  const { showModal, hideModal, isModalVisible } = useModal();

  return (
    <>
      <IonButton
        fill="outline"
        color="secondary"
        onClick={showModal}
        className="shadow-lg shadow-teal-300/20"
      >
        <IonIcon slot="end" icon={qrCode} />
        Receive
      </IonButton>
      <ReceivePhononModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
