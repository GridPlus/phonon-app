import { useIonRouter } from "@ionic/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  RedeemPhononFormCustom,
  RedeemPhononFormCustomValues,
} from "../components/RedeemPhononFormCustom";
import {
  RedeemPhononFormSuggested,
  RedeemPhononFormSuggestedValues,
} from "../components/RedeemPhononFormSuggested";
import useChain from "../hooks/useChain";
import { usePhonons } from "../hooks/usePhonons";
import { useRedeemPhononMutation } from "../store/api";
import { RedeemPhononDTO } from "../types";
import { makeChangeWithPhonons } from "../utils/math";

const RedeemPhononPage: React.FC = () => {
  const { sessionId } = useParams<{
    sessionId: string;
  }>();
  const router = useIonRouter();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [RedeemAddress, setRedeemAddress] = useState("");
  const [redeemPhonon] = useRedeemPhononMutation();
  const { chain } = useChain();
  const { phonons } = usePhonons();

  const getAddress = async () => {
    // @ts-expect-error window.ethereum needs to be added to namespace
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setRedeemAddress(address);
  };

  useEffect(() => {
    getAddress().catch((err) => console.error(err));
  }, []);

  const onSubmit = (payload: RedeemPhononDTO[]) => {
    setIsPending(true);
    if (payload.length) {
      redeemPhonon({ payload, sessionId })
        .then(() => router.push(`/${sessionId}/`))
        .catch(console.error)
        .finally(() => setIsPending(false));
    }
  };

  const onSubmitSuggested = (data: RedeemPhononFormSuggestedValues) =>
    onSubmit(
      makeChangeWithPhonons(data.amount, phonons).map((P) => ({
        P,
        RedeemAddress,
      }))
    );

  const onSubmitCustomized = (data: RedeemPhononFormCustomValues) =>
    onSubmit(
      phonons
        .filter((p) => data.phononsToRedeem.some((d) => d === p.PubKey))
        .map((P) => ({ P, RedeemAddress }))
    );

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggest = () => {
    setIsCustomizing(false);
    // setInputValue(rollupChange(denominationAmounts));
  };

  const onChangeRedeemAddress = (value: string) => {
    setRedeemAddress(value);
  };

  return (
    <div className="flex flex-col content-center justify-start h-full gap-2">
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        Redeem {chain.ticker}
      </p>
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner w-auto"
        placeholder="Redeem Address"
        onChange={(event) => onChangeRedeemAddress(event.target.value)}
        value={RedeemAddress}
        disabled={isPending}
      />
      {isCustomizing ? (
        <RedeemPhononFormCustom
          {...{ handleSuggest, onSubmit: onSubmitCustomized, isPending }}
        />
      ) : (
        <RedeemPhononFormSuggested
          {...{ handleCustomize, onSubmit: onSubmitSuggested, isPending }}
        />
      )}
    </div>
  );
};

export default RedeemPhononPage;
