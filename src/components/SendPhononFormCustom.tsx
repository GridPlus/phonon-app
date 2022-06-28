import { IonButton } from "@ionic/react";
import clsx from "clsx";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useChain from "../hooks/useChain";
import { usePhonons } from "../hooks/usePhonons";
import { weiToEth } from "../utils/denomination";
import { reduceDenominations } from "../utils/math";

export type SendPhononFormCustomValues = {
  phononsToSend: string[];
};

export const SendPhononFormCustom: React.FC<{
  handleSuggest: () => void;
  onSubmit: any;
  isPending: boolean;
}> = ({ handleSuggest, onSubmit, isPending }) => {
  const { register, control, handleSubmit } =
    useForm<SendPhononFormCustomValues>({
      defaultValues: {
        phononsToSend: [],
      },
      mode: "onBlur",
    });
  const formValues = useWatch({
    name: "phononsToSend",
    control,
  });
  const { chain } = useChain();
  const { phonons } = usePhonons();

  const getTotal = () => {
    try {
      const total = reduceSelectedPhononTotals();
      return total ? weiToEth(total) : 0;
    } catch (err) {
      console.error(err);
    }
  };

  const reduceSelectedPhononTotals = () => {
    try {
      if (typeof formValues === "boolean") {
        return formValues ? phonons[0].Denomination : 0;
      }
      if (typeof formValues === "string") {
        return phonons.filter((p) => formValues === p.PubKey)[0].Denomination;
      }
      return phonons
        .filter((p) => formValues.some((fv) => fv === p.PubKey))
        .map((phonon) => phonon.Denomination)
        .reduce(reduceDenominations, "0");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-bold p-2 text-xl font-center text-zinc-400">
        {getTotal()}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {phonons.map((phonon) => (
          <div
            className="flex flex-row justify-center align-middle items-center m-2 gap-2"
            key={phonon.PubKey}
          >
            <input
              type="checkbox"
              className={clsx(
                "appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-teal-400 checked:border-teal-600 focus:outline-none transition duration-200  cursor-pointer"
              )}
              value={phonon.PubKey}
              key={phonon.PubKey}
              {...register("phononsToSend")}
            />
            <div
              className={clsx(
                "text-bold p-2 text-xl bg-zinc-800 shadow-inner w-1/3"
              )}
            >
              {chain.symbol} {weiToEth(phonon.Denomination)}
            </div>
          </div>
        ))}
        <div className="pinned">
          <IonButton
            key="back"
            color="medium"
            size="large"
            fill="clear"
            expand="full"
            onClick={handleSuggest}
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
          >
            Send
          </IonButton>
        </div>
      </form>
    </div>
  );
};
