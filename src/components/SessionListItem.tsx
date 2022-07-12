import { IonButton, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import UnlockSessionModal from "./UnlockSessionModal";
import SetSessionNameModal from "./SetSessionNameModal";
import useSessionDisplayName from "../hooks/useSessionDisplayName";
import { Session } from "../types";
import InitSessionModal from "./InitSessionModal";

type Props = {
  session: Session;
};

const SessionListItem: React.FC<Props> = ({ session }) => {
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [isInitOpen, setIsInitOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const displayName = useSessionDisplayName(session.Name);

  return (
    <>
      <IonItem detail>
        <IonLabel>{displayName}</IonLabel>
        <IonButton
          fill="clear"
          slot="end"
          onClick={() => setIsRenameOpen(true)}
        >
          Rename
        </IonButton>
        {session.Initialized ? (
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setIsUnlockOpen(true)}
          >
            Unlock
          </IonButton>
        ) : (
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setIsInitOpen(true)}
          >
            Initialize
          </IonButton>
        )}
      </IonItem>

      <UnlockSessionModal
        sessionId={session.Name}
        isOpen={isUnlockOpen}
        setIsOpen={setIsUnlockOpen}
      />
      <InitSessionModal
        sessionId={session.Name}
        isOpen={isInitOpen}
        setIsOpen={setIsInitOpen}
      />
      <SetSessionNameModal
        sessionId={session.Name}
        isOpen={isRenameOpen}
        setIsOpen={setIsRenameOpen}
      />
    </>
  );
};

export default SessionListItem;
