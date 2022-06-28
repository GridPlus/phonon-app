import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { addSharp } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";

export default function CreatePhononButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useIonRouter();

  const goToCreatePage = () => {
    router.push(`/${sessionId}/create`);
  };

  return (
    <>
      <IonButton
        fill="outline"
        color="primary"
        slot="end"
        onClick={goToCreatePage}
        className="shadow-lg shadow-blue-300/20"
      >
        <IonIcon slot="end" icon={addSharp} />
        Create
      </IonButton>
    </>
  );
}
