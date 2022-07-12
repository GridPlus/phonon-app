import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { addSharp, lockClosedOutline } from "ionicons/icons";
import React from "react";
import useChain from "../hooks/useChain";
import { useModal } from "../hooks/useModal";
import CreatePhononModal from "./CreatePhononModal";

export default function CreatePhononButton() {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isAuthenticated } = useChain();
  const [present] = useIonToast();

  return (
    <>
      <IonButton
        fill="outline"
        color="primary"
        slot="end"
        onClick={() => {
          if (!isAuthenticated) {
            return present({
              header: "Error",
              message: "Must be authenticated with MetaMask to create Phonons",
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
        }}
      >
        <IonIcon slot="end" icon={addSharp} />
        Create
      </IonButton>
      <CreatePhononModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
