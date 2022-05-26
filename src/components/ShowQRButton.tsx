import { IonButton, IonIcon, IonModal, IonSpinner } from "@ionic/react";
import { qrCode } from "ionicons/icons";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useConnectMutation } from "../store/api";

export default function ReceiveButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [connect] = useConnectMutation();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setIsConnecting(true);
    connect({ sessionId })
      .then(() => {
        console.log("connected");
        setIsConnected(true);
      })
      .catch(console.error)
      .finally(() => {
        setIsConnecting(false);
      });
  }, [connect, sessionId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

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
      <IonModal isOpen={isModalVisible}>
        <div className="flex flex-col content-center justify-evenly h-full p-10">
          <div className="mx-auto">
            <p className="mb-2 text-xs font-bold text-center text-gray-500 uppercase">
              Connecting to Phonon Network
            </p>
            <IonSpinner />
          </div>
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
    </>
  );
}
