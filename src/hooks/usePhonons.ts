import { useParams } from "react-router";
import { useFetchPhononsQuery } from "../store/api";
import { reduceDenominations } from "./../utils/math";
import useChain from "./useChain";

export const usePhonons = () => {
  const { chain } = useChain();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data } = useFetchPhononsQuery({
    sessionId,
  });
  const phonons =
    data?.filter((item) => item.CurrencyType === chain.CurrencyType) ?? [];
  const total =
    phonons.map((p) => p.Denomination).reduce(reduceDenominations, "0") ?? 0;

  return { phonons, total };
};
