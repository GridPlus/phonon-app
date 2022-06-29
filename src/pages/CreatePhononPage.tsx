import { IonButton } from "@ionic/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import {
  CreatePhononFormCustom,
  CreatePhononFormCustomValues,
} from "../components/CreatePhononFormCustom";
import {
  CreatePhononFormSingle,
  CreatePhononFormSingleValues,
} from "../components/CreatePhononFormSingle";
import {
  CreatePhononFormSuggested,
  CreatePhononFormSuggestedValues,
} from "../components/CreatePhononFormSuggested";
import useChain from "../hooks/useChain";
import { useSession } from "../hooks/useSession";
import {
  useFinalizeDepositMutation,
  useInitDepositMutation,
} from "../store/api";
import { ethToBn, ethToWei, weiToEth } from "../utils/denomination";
import { makeChange } from "../utils/math";

const CreatePhononPage: React.FC = () => {
  const { sessionId } = useSession();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isMassCreating, setIsMassCreating] = useState(false);
  const [initDeposit] = useInitDepositMutation();
  const [finalizeDeposit] = useFinalizeDepositMutation();
  const { chain, chainId } = useChain();

  const onSubmitSuggested = (data: CreatePhononFormSuggestedValues) =>
    onSubmit(makeChange(parseFloat(data.amount)));

  const onSubmitCustomized = (data: CreatePhononFormCustomValues) =>
    onSubmit(data.phononsToCreate);

  const onSubmitSingle = (data: CreatePhononFormSingleValues) =>
    onSubmit([{ amount: 1, denomination: data.amount }]);

  const onSubmit = async (
    data: {
      amount: number;
      denomination: string;
    }[]
  ) => {
    setIsPending(true);
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
                .then((response) => {
                  if (response) {
                    console.log(response);
                    const Phonon = { ...phonon, ChainID };
                    const payload = [
                      {
                        Phonon,
                        ConfirmedOnChain: true,
                        ConfirmedOnCard: true,
                      },
                    ];
                    finalizeDeposit({ payload, sessionId }).catch(
                      console.error
                    );
                  }
                })
                .catch((err) => {
                  console.error(err);
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
          setIsPending(false);
        }
      });
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggest = () => {
    setIsCustomizing(false);
    // setInputValue(rollupChange(denominationAmounts));
  };

  return (
    <div>
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        CREATE {chain.ticker} PHONON
      </p>
      {isMassCreating ? (
        <>
          <IonButton
            expand="full"
            fill="clear"
            type="button"
            onClick={() => setIsMassCreating(false)}
          >
            Creating Many Phonons
          </IonButton>
          {isCustomizing ? (
            <CreatePhononFormCustom
              {...{ handleSuggest, onSubmit: onSubmitCustomized, isPending }}
            />
          ) : (
            <CreatePhononFormSuggested
              {...{ handleCustomize, onSubmit: onSubmitSuggested, isPending }}
            />
          )}
        </>
      ) : (
        <>
          <IonButton
            expand="full"
            fill="clear"
            type="button"
            onClick={() => setIsMassCreating(true)}
          >
            Creating Single Phonon
          </IonButton>{" "}
          <CreatePhononFormSingle
            {...{ handleCustomize, onSubmit: onSubmitSingle, isPending }}
          />
        </>
      )}
    </div>
  );
};

export default CreatePhononPage;
