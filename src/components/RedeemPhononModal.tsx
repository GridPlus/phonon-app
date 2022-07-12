import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CHAINS } from "../constants/chains";
import { useSession } from "../hooks/useSession";
import { useRedeemPhononMutation } from "../store/api";
import { PhononDTO } from "../types";
import { weiToEth } from "../utils/denomination";

export type RedeemPhononFormData = {
  redeemAddress: string;
};

export default function RedeemPhononModal({
  isModalVisible,
  hideModal,
  phonon,
}: {
  isModalVisible: boolean;
  hideModal: () => void;
  phonon: PhononDTO;
}) {
  const { sessionId } = useSession();
  const [redeemPhonon, { isLoading }] = useRedeemPhononMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const chain = CHAINS[phonon.ChainID] ?? null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RedeemPhononFormData>();

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
    reset();
  };

  const onSubmit = async (data: RedeemPhononFormData, event) => {
    event.preventDefault();
    const payload = [
      {
        P: phonon,
        RedeemAddress: data.redeemAddress,
      },
    ];
    await redeemPhonon({ payload, sessionId })
      .then(destroyModal)
      .catch((err) => {
        setErrorMessage(err.message);
        console.error(err);
      });
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Redeem {chain?.name} Phonon
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        <p className="text-l font-bold text-center text-gray-400 uppercase">
          {`${weiToEth(phonon.Denomination)} ${chain ? chain.ticker : "ERR"}`}
        </p>

        <form
          className="flex flex-col mt-10 gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
            placeholder="Redeem Address"
            disabled={isLoading}
            {...register("redeemAddress", {
              required: true,
            })}
          />
          {errors?.redeemAddress?.type === "required" && (
            <p className="text-bold p-2 text-xl text-red-400 shadow-inner">
              Redeem address is required
            </p>
          )}
          <IonButton
            key="submit"
            size="large"
            type="submit"
            fill="solid"
            expand="full"
            color="tertiary"
            disabled={isLoading}
          >
            REDEEM
          </IonButton>
          <IonButton
            size="large"
            expand="full"
            fill="clear"
            color="medium"
            onClick={destroyModal}
            disabled={isLoading}
          >
            CANCEL
          </IonButton>
        </form>
      </div>
    </IonModal>
  );
}
