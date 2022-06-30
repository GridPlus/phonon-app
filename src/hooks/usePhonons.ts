import { useFetchPhononsQuery } from "../store/api";
import { reduceDenominations } from "./../utils/math";
import useChain from "./useChain";
import { useSession } from "./useSession";

export const usePhonons = () => {
  const { chain } = useChain();
  const { sessionId } = useSession();
  const { data } = useFetchPhononsQuery({
    sessionId,
  });
  const phonons =
    data?.filter((item) => item.CurrencyType === chain?.CurrencyType) ?? [];
  const total =
    phonons.map((p) => p.Denomination).reduce(reduceDenominations, "0") ?? 0;

  return { phonons, total };
};
