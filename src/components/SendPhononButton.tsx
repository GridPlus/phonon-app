import { IonButton, IonIcon } from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import { PhononDTO } from "../types";
import SendPhononModal from "./SendPhononModal";

export default function SendPhononButton({ phonon }: { phonon: PhononDTO }) {
  const { showModal, hideModal, isModalVisible } = useModal();

  const [color, setColor] = useState("medium");
  const DEFAULT_COLOR = "medium";
  const ACTIVE_COLOR = "primary";

  return (
    <>
      <IonButton
        fill="outline"
        onMouseEnter={() => setColor(ACTIVE_COLOR)}
        onMouseLeave={() => setColor(DEFAULT_COLOR)}
        color={color}
        onClick={showModal}
        slot="end"
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
      <SendPhononModal {...{ isModalVisible, hideModal, phonon }} />
    </>
  );
}
