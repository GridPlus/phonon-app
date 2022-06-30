import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import icon from "../assets/icon.svg";
import CardLockButton from "../components/CardLockButton";
import { ConnectButton } from "../components/ConnectButton";
import { MetaMaskAuth } from "../components/MetaMaskAuth";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <CardLockButton />
          <ConnectButton />
        </IonButtons>
        <IonTitle>
          <div className="flex flex-row content-center justify-center">
            <img src={icon} className="mr-1 w-7" alt="logo" />
            <h2 className="logoHeader">PHONON</h2>
          </div>
        </IonTitle>
        <IonButtons slot="end">
          <MetaMaskAuth />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
