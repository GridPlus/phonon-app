import { useIonRouter } from "@ionic/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  SendPhononFormCustomValues,
  SendPhononFormCustom,
} from "../components/SendPhononFormCustom";
import {
  SendPhononFormSuggestedValues,
  SendPhononFormSuggested,
} from "../components/SendPhononFormSuggested";

import useNetwork from "../hooks/useNetwork";
import { usePhonons } from "../hooks/usePhonons";
import { useConnectMutation, useSendPhononMutation } from "../store/api";
import { SendPhononDTO } from "../types";
import { makeChangeWithPhonons } from "../utils/math";

const SendPhononPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const router = useIonRouter();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [sendAddress, setSendAddress] = useState("");
  const [sendPhonon] = useSendPhononMutation();
  const [connect] = useConnectMutation();
  const { network } = useNetwork();
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
        .then(() => router.push(`/${sessionId}/${networkId}/`))
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
        Send {network.ticker}
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