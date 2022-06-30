import { IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React from "react";
import useChain from "../hooks/useChain";
import { useModal } from "../hooks/useModal";
import { PhononDTO } from "../types";
import RedeemPhononModal from "./RedeemPhononModal";

export default function RedeemPhononButton({ phonon }: { phonon: PhononDTO }) {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isAuthenticated } = useChain();

  return (
    <>
      <IonButton
        fill="outline"
        color={"tertiary"}
        onClick={showModal}
        slot="end"
        disabled={!isAuthenticated}
      >
        <IonIcon slot="end" icon={logOutOutline} />
        Redeem
      </IonButton>
      <RedeemPhononModal {...{ isModalVisible, hideModal, phonon }} />
    </>
  );
}
