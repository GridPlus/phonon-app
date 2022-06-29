import { IonButton, IonModal } from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import QRCode from "qrcode.react";

export default function ReceivePhononModal({ isModalVisible, hideModal }: any) {
  const { sessionId } = useParams<{ sessionId: string }>();

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
      <div className="flex flex-col content-center justify-evenly h-full p-10">
        <div className="mx-auto">
          <p className="mb-2 text-xs font-bold text-center text-gray-500 uppercase">
            Share Code with Sender
          </p>
          <QRCode
            value={sessionId}
            size={200}
            level="H"
            className="mx-auto"
            includeMargin
          />
          <p className="mb-2 text-xs font-bold text-center text-gray-500 uppercase">
            {sessionId}
          </p>
        </div>
        <div className="flex flex-row justify-evenly">
          <IonButton
            key="submit"
            fill="solid"
            color="primary"
            onKeyDown={handleOnKeyDown}
            onClick={handleSubmit}
            className="shadow-lg shadow-teal-300/40"
          >
            CANCEL
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
}
