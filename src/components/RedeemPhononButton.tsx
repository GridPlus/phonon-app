import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { lockClosedOutline, logOutOutline } from "ionicons/icons";
import React from "react";
import { useModal } from "../hooks/useModal";
import { PhononDTO } from "../types";
import RedeemPhononModal from "./RedeemPhononModal";

export default function RedeemPhononButton({ phonon }: { phonon?: PhononDTO }) {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [present] = useIonToast();

  const handleOnClick = () => {
    if (!phonon) {
      return present({
        header: "Error",
        message: "Must select a Phonon to redeem",
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
        color={"tertiary"}
        onClick={handleOnClick}
        slot="end"
      >
        <IonIcon slot="end" icon={logOutOutline} />
        Redeem
      </IonButton>
      {phonon ? (
        <RedeemPhononModal {...{ isModalVisible, hideModal, phonon }} />
      ) : null}
    </>
  );
}
