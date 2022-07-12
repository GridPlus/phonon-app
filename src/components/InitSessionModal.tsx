import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import useSessionDisplayName from "../hooks/useSessionDisplayName";
import { useInitSessionMutation } from "../store/api";
import { logger } from "../utils/logger";

interface InitSessionModalProps {
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const InitSessionModal: React.FC<InitSessionModalProps> = ({
  sessionId,
  isOpen,
  setIsOpen,
}) => {
  const [pin, setPin] = useState<string>("");
  const [initSession, { isError, isLoading }] = useInitSessionMutation();

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleInit();
    }
  };

  const handleInit = () => {
    initSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => {
        logger.error(err);
      });
  };

  const displayName = useSessionDisplayName(sessionId);

  return (
    <IonContent>
      <IonModal isOpen={isOpen}>
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-lg text-center">
              Initialize {displayName}
            </h1>
          </IonText>
          {isError && (
            <IonText color="danger">
              <h1 className="mx-auto text-center">
                Something went wrong. Please try again.
              </h1>
            </IonText>
          )}
          <IonItem className="my-7">
            <IonInput
              value={pin}
              placeholder="Password"
              type="password"
              disabled={isLoading}
              className="text-white"
              onIonChange={(e) => setPin(e?.detail?.value ?? "")}
              onKeyDown={handleOnKeyDown}
            ></IonInput>
          </IonItem>
          <div className="flex flex-row justify-evenly">
            <IonButton
              color="medium"
              fill="clear"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </IonButton>
            <IonButton onClick={handleInit} disabled={isLoading}>
              Initialize
            </IonButton>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default InitSessionModal;
