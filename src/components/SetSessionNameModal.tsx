import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useSessionDisplayName from "../hooks/useSessionDisplayName";
import { setName } from "../store/sessionsSlice";

type Props = {
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

const SetSessionNameModal: React.FC<Props> = ({
  sessionId,
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const displayName = useSessionDisplayName(sessionId);

  const [newName, setNewName] = useState<string>(displayName);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    dispatch(setName({ sessionId, name: newName }));
    onClose();
  };

  return (
    <IonContent>
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-lg text-center">
              Update name for {sessionId}
            </h1>
          </IonText>
          <IonItem className="my-7">
            <IonInput
              value={newName}
              placeholder="Name"
              className="text-white"
              type="text"
              onIonChange={(e) => setNewName(e?.detail?.value ?? "")}
            ></IonInput>
          </IonItem>
          <div className="flex flex-row justify-evenly">
            <IonButton color="medium" fill="clear" onClick={onClose}>
              Cancel
            </IonButton>
            <IonButton onClick={onSubmit}>Update name</IonButton>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default SetSessionNameModal;
