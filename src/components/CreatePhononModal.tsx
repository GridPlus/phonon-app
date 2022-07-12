import { IonButton, IonModal } from "@ionic/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useChain from "../hooks/useChain";
import { useSession } from "../hooks/useSession";
import {
  useFinalizeDepositMutation,
  useInitDepositMutation,
} from "../store/api";
import { ethToBn, ethToWei, weiToEth } from "../utils/denomination";
import { isValidPhononDenomination } from "../utils/validation";

export type CreatePhononFormData = {
  amount: string;
};

export default function CreatePhononModal({
  isModalVisible,
  hideModal,
}: {
  isModalVisible: boolean;
  hideModal: () => void;
}) {
  const { sessionId } = useSession();
  const [isPending, setIsPending] = useState(false);
  const [initDeposit] = useInitDepositMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [finalizeDeposit] = useFinalizeDepositMutation();
  const { chain, chainId, isAuthenticated } = useChain();

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePhononFormData>();

  const onSubmitSingle = (data: CreatePhononFormData) =>
    onSubmit([{ amount: 1, denomination: data.amount }])
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setIsPending(false));

  const onSubmit = async (
    data: {
      amount: number;
      denomination: string;
    }[]
  ) => {
    setIsPending(true);
    setErrorMessage("");
    if (!chain) {
      throw new Error(
        "Chain Unavailable. Please reauthenticate with MetaMask."
      );
    }
    if (!isAuthenticated) {
      throw new Error("Must be authenticated with MetaMask.");
    }
    const Denominations = data.flatMap((d) => {
      const denomination = ethToWei(d.denomination);
      const arr = Array(d.amount);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return arr.fill(denomination);
    });
    const CurrencyType = chain.CurrencyType;
    const payload = { CurrencyType, Denominations };
    await initDeposit({ payload, sessionId })
      .unwrap()
      .then(async (payload) => {
        // @ts-expect-error - window
        if (window.ethereum) {
          // @ts-expect-error - window
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const ChainID = chainId;
          const signer = provider.getSigner();
          await Promise.all(
            payload.map(async (phonon) => {
              const to = phonon.Address;
              const value = ethToBn(weiToEth(phonon.Denomination));

              return signer
                .sendTransaction({ to, value })
                .then(async (response) => {
                  if (response) {
                    const Phonon = { ...phonon, ChainID };
                    console.log({ Phonon });
                    const payload = [
                      {
                        Phonon,
                        ConfirmedOnChain: true,
                        ConfirmedOnCard: true,
                      },
                    ];
                    await finalizeDeposit({ payload, sessionId }).catch(
                      console.error
                    );
                    destroyModal();
                  }
                })
                .catch((err) => {
                  console.error(err);
                  setErrorMessage(err.message);
                  const Phonon = { ...phonon, ChainID };
                  const payload = [
                    {
                      Phonon,
                      ConfirmedOnChain: false,
                      ConfirmedOnCard: true,
                    },
                  ];
                  finalizeDeposit({ payload, sessionId }).catch(console.error);
                })
                .finally(() => setIsPending(false));
            })
          );
        } else {
          // TODO: Show an error message to the user about MetaMask not being installed or available
          throw new Error("MetaMask is not installed.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message) setErrorMessage(err.message);
        else if (err.data) setErrorMessage(err.data);
      });
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Create {chain?.name} Phonon
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        <form
          className="flex flex-col mt-10 gap-10"
          onSubmit={handleSubmit(onSubmitSingle)}
        >
          <input
            className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
            placeholder="Amount"
            disabled={isPending}
            {...register("amount", {
              required: true,
              validate: isValidPhononDenomination,
            })}
          />
          {errors?.amount?.type === "required" && (
            <p className="text-bold p-2 text-xl text-zinc-200 shadow-inner">
              Amount is required.
            </p>
          )}
          {errors?.amount?.type === "validate" && (
            <p className="text-bold p-2 text-xl text-zinc-200 shadow-inner">
              First three digits must be less than 255.
            </p>
          )}

          <IonButton
            key="submit"
            size="large"
            type="submit"
            fill="solid"
            expand="full"
            color="primary"
            disabled={isPending}
          >
            CREATE
          </IonButton>
          <IonButton
            size="large"
            expand="full"
            fill="clear"
            color="medium"
            onClick={destroyModal}
            disabled={isPending}
          >
            CANCEL
          </IonButton>
        </form>
      </div>
    </IonModal>
  );
}
