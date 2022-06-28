import { CHAINS } from "../constants/chains";

const useChainByCurrencyType = (currencyType: number) => {
  const chain = Object.entries(CHAINS).find(
    ([, chain]) => chain.CurrencyType === currencyType
  );
  if (!chain) {
    throw Error("No chain found");
  }
  return chain[1];
};

export default useChainByCurrencyType;
