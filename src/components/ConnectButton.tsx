import { IonButton, IonIcon } from "@ionic/react";
import { ellipse } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useConnectMutation } from "../store/api";

export const ConnectButton: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [connect] = useConnectMutation();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const getLabel = () => {
    if (isConnecting) {
      return "Connected";
    }
    if (isConnected) {
      return "Connected";
    }
    return "Connect";
  };

  const getColor = () => {
    if (isConnecting) {
      return "yellow";
    }
    if (isConnected) {
      return "green";
    }
    return "red";
  };

  return (
    <IonButton
      shape="round"
      onClick={() => {
        if (isConnected) {
          setIsConnected(false);
          setIsConnecting(false);
          return;
        }
        console.log("clicked");
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
      }}
    >
      {getLabel()}
      <IonIcon
        slot="end"
        icon={ellipse}
        style={{ fontSize: "12px", color: getColor() }}
      />
    </IonButton>
  );
};
