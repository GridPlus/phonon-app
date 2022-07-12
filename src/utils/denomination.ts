import { ethers } from "ethers";
import bigDecimal from "js-big-decimal";
import { Eth, Wei } from "../types";

export type Denomination = {
  getStr: () => string;
  getEth: () => string;
  getWei: () => string;
  getBn: () => bigDecimal;
};

export const ethToWei = (eth: Eth) => {
  const _eth = typeof eth === "number" ? eth.toString() : eth;
  return ethers.utils.parseEther(_eth).toString();
};

export const weiToEth = (wei: Wei) => {
  if (wei === "NaN") return "0";
  const bnValue = ethers.BigNumber.from(`${wei}`);
  return ethers.utils.formatEther(bnValue);
};

export const ethToBn = (eth: Eth) => {
  if (typeof eth === "string") return ethers.utils.parseEther(eth);
};
