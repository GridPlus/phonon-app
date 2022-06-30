import { IonButton, IonIcon } from "@ionic/react";
import { ellipse } from "ionicons/icons";
import React from "react";
import { useSession } from "../hooks/useSession";
import { useConnectionStatusQuery, useConnectMutation } from "../store/api";

export const ConnectButton: React.FC = () => {
  const { sessionId } = useSession();
  const [connect, { isLoading }] = useConnectMutation();
  const { data: isConnected } = useConnectionStatusQuery(
    { sessionId },
    { pollingInterval: 1000 }
  );

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
        connect({ sessionId }).catch(console.error);
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
