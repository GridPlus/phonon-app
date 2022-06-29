import { useIonRouter } from "@ionic/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import {
  SendPhononFormCustom,
  SendPhononFormCustomValues,
} from "../components/SendPhononFormCustom";
import {
  SendPhononFormSuggested,
  SendPhononFormSuggestedValues,
} from "../components/SendPhononFormSuggested";
import useChain from "../hooks/useChain";
import { usePhonons } from "../hooks/usePhonons";
import { useSession } from "../hooks/useSession";
import { useConnectMutation, useSendPhononMutation } from "../store/api";
import { SendPhononDTO } from "../types";
import { makeChangeWithPhonons } from "../utils/math";

const SendPhononPage: React.FC = () => {
  const { sessionId } = useSession();
  const router = useIonRouter();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [sendAddress, setSendAddress] = useState("");
  const [sendPhonon] = useSendPhononMutation();
  const [connect] = useConnectMutation();
  const { chain } = useChain();
  const { phonons } = usePhonons();

  const getAddress = async () => {
    // @ts-expect-error window.ethereum needs to be added to namespace
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setSendAddress(address);
  };

  useEffect(() => {
    getAddress().catch(console.error);
  }, []);

  const onSubmit = (payload: SendPhononDTO) => {
    setIsPending(true);
    if (payload.length) {
      connect({ sessionId })
        .then(() => {
          console.log("connected");
        })
        .catch(console.error);
      sendPhonon({ payload, sessionId })
        .then(() => router.push(`/${sessionId}/`))
        .catch(console.error)
        .finally(() => setIsPending(false));
    }
  };

  const onSubmitSuggested = (data: SendPhononFormSuggestedValues) =>
    onSubmit(makeChangeWithPhonons(data.amount, phonons));

  const onSubmitCustomized = (data: SendPhononFormCustomValues) =>
    onSubmit(
      phonons.filter((p) => data.phononsToSend.some((d) => d === p.PubKey))
    );

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggest = () => {
    setIsCustomizing(false);
    // setInputValue(rollupChange(denominationAmounts));
  };

  const onChangeSendAddress = (value: string) => {
    setSendAddress(value);
  };

  return (
    <div className="flex flex-col content-center justify-start h-full gap-2">
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        Send {chain.ticker}
      </p>
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner w-auto"
        placeholder="Send Address"
        onChange={(event) => onChangeSendAddress(event.target.value)}
        value={sendAddress}
        disabled={isPending}
      />
      {isCustomizing ? (
        <SendPhononFormCustom
          {...{ handleSuggest, onSubmit: onSubmitCustomized, isPending }}
        />
      ) : (
        <SendPhononFormSuggested
          {...{ handleCustomize, onSubmit: onSubmitSuggested, isPending }}
        />
      )}
    </div>
  );
};

export default SendPhononPage;
