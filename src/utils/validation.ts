import { ethToWei } from "./denomination";

export const isValidPhononDenomination = (eth: Eth) => {
  const wei = ethToWei(eth);
  const firstThreeChars = wei.substring(0, 3);
  const remainingChars = wei.substring(3);
  return (
    parseInt(firstThreeChars) < 256 && remainingChars.replace(/^0+/, "") === ""
  );
};

export const isValidCardPin = (pin: string) => !!pin.match(/^[0-9]{6}$/);
