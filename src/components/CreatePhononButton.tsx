import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { addSharp } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";
import { useModal } from "../hooks/useModal";
import CreatePhononModal from "./CreatePhononModal";

export default function CreatePhononButton() {
  const { showModal, hideModal, isModalVisible } = useModal();

  return (
    <>
      <IonButton
        fill="outline"
        color="primary"
        slot="end"
        onClick={showModal}
        className="shadow-lg shadow-blue-300/20"
      >
        <IonIcon slot="end" icon={addSharp} />
        Create
      </IonButton>
      <CreatePhononModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
