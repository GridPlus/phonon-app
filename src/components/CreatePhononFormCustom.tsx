import { IonButton, IonIcon } from "@ionic/react";
import clsx from "clsx";
import { add, closeCircleOutline } from "ionicons/icons";
import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { denominations } from "../constants/denominations";
import useChain from "../hooks/useChain";
import { rollupChange } from "../utils/math";
import { isValidPhononDenomination } from "../utils/validation";

export type CreatePhononFormCustomValues = {
  phononsToCreate: {
    amount: number;
    denomination: string;
  }[];
};

export const CreatePhononFormCustom: React.FC<{
  handleSuggest: () => void;
  onSubmit: any;
  isPending: boolean;
}> = ({ handleSuggest, onSubmit, isPending }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePhononFormCustomValues>({
    defaultValues: {
      phononsToCreate: [{ amount: 1, denomination: "1" }],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "phononsToCreate",
    control,
  });
  const formValues = useWatch({
    name: "phononsToCreate",
    control,
  });
  const total = rollupChange(formValues);
  const { chain } = useChain();

  const handleAddDenomination = (formValues) => {
    const unusedDenominations = denominations.filter(
      (d) => !formValues.some(({ denomination }) => d === denomination)
    );
    const index = unusedDenominations.length - 1;
    const lowestUnusedDenomination = unusedDenominations[index];
    return {
      amount: 1,
      denomination: lowestUnusedDenomination,
    };
  };

  return (
    <div>
      <div className="text-bold p-2 text-xl font-center text-zinc-400">
        {total}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div className="flex flex-row justify-center m-2" key={field.id}>
              <input
                placeholder="Amount"
                {...register(`phononsToCreate.${index}.amount` as const, {
                  required: true,
                  validate: isValidPhononDenomination,
                })}
                className={clsx(
                  "text-bold p-2 text-xl bg-zinc-800 shadow-inner w-1/3",
                  errors?.phononsToCreate?.[index]?.amount ? "error" : ""
                )}
              />
              <select
                {...register(`phononsToCreate.${index}.denomination` as const, {
                  valueAsNumber: true,
                  required: true,
                })}
                className={clsx(
                  "text-bold p-2 text-xl bg-zinc-800 shadow-inner",
                  errors?.phononsToCreate?.[index]?.denomination ? "error" : ""
                )}
              >
                {denominations.map((denomination) => (
                  <option
                    value={denomination}
                    key={denomination}
                    disabled={formValues.some(
                      (d) => d.denomination === denomination
                    )}
                  >
                    {chain.symbol} {denomination}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={"text-bold p-2 text-xl"}
                onClick={() => remove(index)}
              >
                <IonIcon icon={closeCircleOutline} />
              </button>
            </div>
          );
        })}
        <IonButton
          expand="full"
          fill="clear"
          type="button"
          onClick={() => append(handleAddDenomination(formValues))}
        >
          <IonIcon slot="start" icon={add} />
          Add
        </IonButton>
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
            Create
          </IonButton>
        </div>
      </form>
    </div>
  );
};
