import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";

export default function RedeemPhononButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [color, setColor] = useState("medium");
  const router = useIonRouter();
  const DEFAULT_COLOR = "medium";
  const ACTIVE_COLOR = "tertiary";

  const goToRedeemPage = () => {
    router.push(`/${sessionId}/redeem`);
  };

  return (
    <IonButton
      fill="outline"
      onMouseEnter={() => setColor(ACTIVE_COLOR)}
      onMouseLeave={() => setColor(DEFAULT_COLOR)}
      color={color}
      onClick={goToRedeemPage}
      slot="end"
    >
      <IonIcon slot="end" icon={logOutOutline} />
      Redeem
    </IonButton>
  );
}
