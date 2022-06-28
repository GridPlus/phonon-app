import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

type Chain = {
  icon: typeof faBtc;
  ticker: string;
  name: string;
  textColor: string;
  symbol: string;
  CurrencyType: number;
  apiRoute: string;
  baseUrl: string;
  isTestnet: boolean;
};
export const DEFAULT_CHAIN = {
  apiRoute: "api?module=contract&action=getabi",
  baseUrl: "https://api.etherscan.io",
  icon: faEthereum,
  ticker: "ETH",
  name: "Ethereum",
  textColor: "text-indigo-300",
  symbol: "Ξ",
  CurrencyType: 2,
  isTestnet: false,
};

export const CHAINS: { [key: string]: Chain } = {
  "1": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://api.etherscan.io",
    icon: faEthereum,
    ticker: "ETH",
    name: "Ethereum",
    textColor: "text-indigo-300",
    symbol: "Ξ",
    CurrencyType: 2,
    isTestnet: false,
  },
  PHONON: {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://api.etherscan.io",
    icon: faQuestionCircle,
    ticker: "PHONON",
    name: "PHONON",
    textColor: "text-cyan-300",
    symbol: "PHONON",
    CurrencyType: 3,
    isTestnet: false,
  },
  "4": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://rinkeby.etherscan.io",
    icon: faQuestionCircle,
    textColor: "text-indigo-300",
    ticker: "RINKEBY-ETH",
    name: "Rinkeby",
    symbol: "Ξ",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: true,
  },
  "56": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://api.bscscan.com",
    icon: faQuestionCircle,
    textColor: "text-yellow-300",
    ticker: "BNB",
    name: "Binance",
    symbol: "BNB",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: false,
  },
  "97": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://testnet.bscscan.com",
    icon: faQuestionCircle,
    textColor: "text-yellow-300",
    ticker: "BNB-TEST",
    name: "Binance-testnet",
    symbol: "BNB",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: true,
  },
  "137": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://api.polygonscan.com",
    icon: faQuestionCircle,
    textColor: "text-purple-300",
    ticker: "MATIC",
    symbol: "MATIC",
    name: "polygon",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: false,
  },
  "43113": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://testnet.snowtrace.io",
    icon: faQuestionCircle,
    textColor: "text-red-300",
    ticker: "AVAX-TEST",
    symbol: "AVAX-TEST",
    name: "avalanche-testnet",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: true,
  },
  "43114": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://api.snowtrace.io",
    icon: faQuestionCircle,
    textColor: "text-red-300",
    ticker: "AVAX",
    symbol: "AVAX",
    name: "avalanche",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: false,
  },
  "80001": {
    apiRoute: "api?module=contract&action=getabi",
    baseUrl: "https://mumbai.polygonscan.com",
    icon: faQuestionCircle,
    textColor: "text-purple-300",
    ticker: "MATIC-TEST",
    symbol: "MATIC-TEST",
    name: "polygon-testnet",
    CurrencyType: 2, // TODO: Update Value
    isTestnet: true,
  },
};
