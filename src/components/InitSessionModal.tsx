import { IonButton, IonContent, IonModal, IonText } from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../hooks/useSession";
import { useInitSessionMutation } from "../store/api";
import { logger } from "../utils/logger";
import { isValidCardPin } from "../utils/validation";
import FormErrorText from "./FormErrorText";

type InitSessionModalProps = {
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

type InitFormData = {
  pin: string;
  confirmPin: string;
};

const InitSessionModal: React.FC<InitSessionModalProps> = ({
  sessionId,
  isOpen,
  setIsOpen,
}) => {
  const [initSession, { isError, isLoading }] = useInitSessionMutation();
  const { getSessionNameForId } = useSession();

  const { register, handleSubmit, watch, formState } = useForm<InitFormData>();

  const handleInit = ({ pin }: InitFormData) =>
    initSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
      })
      .catch((err) => {
        logger.error(err);
      });

  const handleCancel = () => {
    setIsOpen(false);
  };

  const displayName = getSessionNameForId(sessionId);

  return (
    <IonContent>
      <IonModal isOpen={isOpen}>
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-xl text-center">
              Initialize {displayName}
            </h1>
          </IonText>
          <p className="mt-10 text-lg text-bold text-center">
            Choose a 6 digit pin for your card
          </p>
          <form
            className="flex flex-col mt-10 gap-10"
            onSubmit={handleSubmit(handleInit)}
          >
            <input
              className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
              placeholder="Pin"
              type="password"
              disabled={isLoading}
              {...register("pin", {
                required: true,
                validate: isValidCardPin,
              })}
            />
            {formState.errors?.pin?.type === "required" && (
              <FormErrorText>Pin is required.</FormErrorText>
            )}
            {formState.errors?.pin?.type === "validate" && (
              <FormErrorText>Your pin must be six digits (0-9).</FormErrorText>
            )}
            <input
              className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
              placeholder="Confirm pin"
              type="password"
              disabled={isLoading}
              {...register("confirmPin", {
                required: true,
                validate: (val: string) => {
                  if (watch("pin") != val) {
                    return "Pins do not match";
                  }
                },
              })}
            />
            {formState.errors?.confirmPin?.type === "required" && (
              <FormErrorText>Confirm pin is required.</FormErrorText>
            )}
            {formState.errors?.confirmPin?.type === "validate" && (
              <FormErrorText>
                {formState.errors?.confirmPin?.message}
              </FormErrorText>
            )}
            {isError && (
              <IonText color="danger">
                <p className="mx-auto text-center">
                  Something went wrong. Please try again.
                </p>
              </IonText>
            )}
            <div className="flex flex-row justify-evenly mt-10">
              <IonButton
                color="medium"
                fill="clear"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </IonButton>
              <IonButton key="submit" type="submit" disabled={isLoading}>
                Initialize
              </IonButton>
            </div>
          </form>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default InitSessionModal;
