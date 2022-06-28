import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";

export default function SendPhononButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useIonRouter();

  const goToSendPage = () => {
    router.push(`/${sessionId}/send`);
  };
  return (
    <>
      <IonButton
        color="primary"
        fill="outline"
        slot="end"
        onClick={goToSendPage}
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
    </>
  );
}
