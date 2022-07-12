import { ethToWei } from "./denomination";

export const isValidPhononDenomination = (eth) => {
  const wei = ethToWei(eth);
  const firstThreeChars = wei.substring(0, 3);
  const remainingChars = wei.substring(3);
  return (
    parseInt(firstThreeChars) < 256 && remainingChars.replace(/^0+/, "") === ""
  );
};
