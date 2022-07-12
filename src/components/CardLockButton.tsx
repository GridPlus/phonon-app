import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import React, { useState } from "react";

export default function CardLockButton() {
  const router = useIonRouter();
  const UnlockedIcon = <IonIcon icon={lockOpenOutline} />;
  const LockedIcon = <IonIcon icon={lockClosedOutline} />;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <IonButton
      fill="outline"
      color={isHovering ? "tertiary" : "secondary"}
      className="mx-3"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        router.push(`/`);
        window.location.reload();
      }}
    >
      {isHovering ? LockedIcon : UnlockedIcon}
    </IonButton>
  );
}
