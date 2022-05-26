import { IonButton } from "@ionic/react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useNetwork from "../hooks/useNetwork";
import { usePhonons } from "../hooks/usePhonons";
import { weiToEth } from "../utils/denomination";
import { makeChangeWithPhonons, reduceDenominations } from "../utils/math";

export type SendPhononFormSuggestedValues = {
  amount: number;
};

export const SendPhononFormSuggested: React.FC<{
  handleCustomize: () => void;
  onSubmit: any;
  isPending: boolean;
}> = ({ handleCustomize, onSubmit, isPending }) => {
  const { network } = useNetwork();

  const { register, handleSubmit, control } =
    useForm<SendPhononFormSuggestedValues>();
  const formValues = useWatch({
    name: "amount",
    control,
  });

  const { phonons } = usePhonons();
  const denominations = makeChangeWithPhonons(formValues, phonons);
  const total = denominations
    .map((phonon) => phonon.Denomination)
    .reduce(reduceDenominations, "0");

  return (
    <form
      className="flex flex-col content-center justify-start h-full gap-2 p-2"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      onSubmit={handleSubmit((data) => onSubmit({ ...data, denominations }))}
    >
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
        placeholder="Amount"
        disabled={isPending}
        {...register("amount", { required: true })}
      />
      <p className="text-sm text-gray-400 font-bold text-center">
        {weiToEth(total)}
      </p>
      <p className="text-sm text-gray-400 font-bold text-center">SUGGESTED</p>
      {denominations.map((phonon) => (
        <p
          key={phonon.PubKey}
          className="text-md text-gray-200 font-bold text-center"
        >
          {weiToEth(phonon.Denomination)} {network.symbol}
        </p>
      ))}
      <div className="pinned">
        <IonButton
          key="back"
          color="medium"
          size="large"
          fill="clear"
          expand="full"
          onClick={handleCustomize}
          disabled={isPending}
        >
          Customize
        </IonButton>
        <IonButton
          key="submit"
          size="large"
          type="submit"
          fill="solid"
          expand="full"
          color="primary"
          className="shadow-lg shadow-teal-300/40"
          disabled={isPending}
        >
          Send
        </IonButton>
      </div>
    </form>
  );
};
