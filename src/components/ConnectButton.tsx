import { IonButton, IonIcon } from "@ionic/react";
import { ellipse } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useSession } from "../hooks/useSession";
import { useConnectMutation } from "../store/api";

export const ConnectButton: React.FC = () => {
  const { sessionId } = useSession();
  const [connect, { isLoading, isSuccess }] = useConnectMutation();
  const [isConnected, setIsConnected] = useState(false);

  const getLabel = () => {
    if (isLoading) {
      return "Connecting";
    }
    if (isConnected) {
      return "Connected";
    }
    return "Connect";
  };

  const getColor = () => {
    if (isLoading) {
      return "yellow";
    }
    if (isConnected) {
      return "green";
    }
    return "#990000";
  };

  return (
    <IonButton
      shape="round"
      onClick={() => {
        if (isConnected) {
          setIsConnected(false);
          return;
        }
        connect({ sessionId })
          .then(() => {
            setIsConnected(true);
          })
          .catch(console.error);
      }}
    >
      {getLabel()}
      <IonIcon
        slot="end"
        icon={ellipse}
        style={{ fontSize: "12px", color: getColor() }}
        class={isConnected ? "connected" : ""}
      />
    </IonButton>
  );
};
