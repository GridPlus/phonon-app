import { IonButton, IonModal } from "@ionic/react";
import React from "react";
import QRCode from "qrcode.react";
import { useSession } from "../hooks/useSession";

export default function ReceivePhononModal({ isModalVisible, hideModal }: any) {
  const { sessionId } = useSession();

  const handleSubmit = () => {
    hideModal();
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={hideModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10 gap-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Share Code with Sender
        </p>
        <QRCode
          value={sessionId}
          size={200}
          level="H"
          className="mx-auto"
          includeMargin
        />
        <p className="text-l font-bold text-center text-gray-400 uppercase">
          {sessionId}
        </p>
        <IonButton
          key="submit"
          size="large"
          expand="full"
          color="dark"
          onKeyDown={handleOnKeyDown}
          onClick={handleSubmit}
        >
          OK
        </IonButton>
      </div>
    </IonModal>
  );
}
