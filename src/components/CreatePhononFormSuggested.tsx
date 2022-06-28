import { IonButton } from "@ionic/react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useChain from "../hooks/useChain";
import { makeChange } from "../utils/math";

export type CreatePhononFormSuggestedValues = {
  amount: string;
};

export const CreatePhononFormSuggested: React.FC<{
  handleCustomize: () => void;
  onSubmit: any;
  isPending: boolean;
}> = ({ handleCustomize, onSubmit, isPending }) => {
  const { chain } = useChain();

  const { register, handleSubmit, control } =
    useForm<CreatePhononFormSuggestedValues>();
  const formValues = useWatch({
    name: "amount",
    control,
  });
  const denominationAmounts = makeChange(parseFloat(formValues));

  return (
    <form
      className="flex flex-col content-center justify-start h-full gap-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
        placeholder="Amount"
        disabled={isPending}
        {...register("amount", { required: true })}
      />
      <p className="text-sm text-gray-400 font-bold text-center">SUGGESTED</p>
      {denominationAmounts
        .filter((x) => x.amount)
        .map((denom) => (
          <p
            key={denom.denomination}
            className="text-md text-gray-200 font-bold text-center"
          >
            {denom.amount}x {chain.symbol}
            {denom.denomination}
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
          Create
        </IonButton>
      </div>
    </form>
  );
};
