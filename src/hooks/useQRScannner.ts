import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { logger } from "../utils/logger";

export const scanQr = async (callback: (x: string) => void) => {
  const isPermissionGranted = await didUserGrantPermission();
  if (isPermissionGranted) {
    BarcodeScanner.hideBackground().catch(logger.error);
    document.body.classList.add("qrscanner");
    const result = await BarcodeScanner.startScan();
    document.body.classList.remove("qrscanner");
    if (result.hasContent) {
      callback(result.content ?? "");
    }
  }
};
export const checkPermission = async () => {
  // check or request permission
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.granted) {
    // the user granted permission
    return true;
  }

  return false;
};

export const didUserGrantPermission = async () => {
  // check if user already granted permission
  const status = await BarcodeScanner.checkPermission({ force: false });

  if (status.granted) {
    // user granted permission
    return true;
  }

  if (status.denied) {
    // user denied permission
    return false;
  }

  if (status.asked) {
    // system requested the user for permission during this call
    // only possible when force set to true
  }

  if (status.neverAsked) {
    // user has not been requested this permission before
    // it is advised to show the user some sort of prompt
    // this way you will not waste your only chance to ask for the permission
    // const c = confirm(
    //   "We need your permission to use your camera to be able to scan barcodes"
    // );
    // if (!c) {
    //   return false;
    // }
  }

  if (status.restricted || status.unknown) {
    // ios only
    // probably means the permission has been denied
    return false;
  }

  // user has not denied permission
  // but the user also has not yet granted the permission
  // so request it
  const statusRequest = await BarcodeScanner.checkPermission({ force: true });

  if (statusRequest.asked) {
    // system requested the user for permission during this call
    // only possible when force set to true
  }

  if (statusRequest.granted) {
    // the user did grant the permission now
    return true;
  }

  // user did not grant the permission, so he must have declined the request
  return false;
};
