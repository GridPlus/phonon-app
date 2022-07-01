import {
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from "@ionic/react";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CreatePhononButton from "../components/CreatePhononButton";
import PhononListItem from "../components/PhononListItem";
import ReceivePhononButton from "../components/ReceivePhononButton";
import RedeemPhononButton from "../components/RedeemPhononButton";
import SendPhononButton from "../components/SendPhononButton";
import { useSession } from "../hooks/useSession";
import Layout from "../layout/Layout";
import { useFetchPhononsQuery } from "../store/api";
import { PhononDTO } from "../types";

const PhononsList: React.FC = () => {
  const { sessionId } = useSession();
  const [selectedPhonon, setSelectedPhonon] = useState<PhononDTO>();
  const { data, refetch, isLoading, isFetching } = useFetchPhononsQuery({
    sessionId,
  });

  function refresh(event: CustomEvent<any>) {
    refetch();
    event.detail.complete();
  }

  return (
    <Layout>
      <div className="flex my-3 justify-evenly items-center">
        <CreatePhononButton />
        <SendPhononButton phonon={selectedPhonon} />
        <RedeemPhononButton phonon={selectedPhonon} />
        <ReceivePhononButton />
      </div>

      {isLoading || isFetching ? (
        <div className="w-full flex justify-center align-middle">
          <IonSpinner />
        </div>
      ) : (
        <>
          <IonRefresher
            slot="fixed"
            onIonRefresh={refresh}
            closeDuration={"50ms"}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonList>
            {data?.map((p) => (
              <ErrorBoundary
                FallbackComponent={({ error }) => (
                  <div className="p-3 uppercase font-black">
                    <p className="text-xs">Failed to load phonon</p>
                    <p className="text-xs text-red-400">{error.message}</p>
                  </div>
                )}
                key={p.PubKey}
              >
                <PhononListItem
                  phonon={p}
                  {...{ selectedPhonon, setSelectedPhonon }}
                />
              </ErrorBoundary>
            ))}
          </IonList>
        </>
      )}
    </Layout>
  );
};

export default PhononsList;
