import {
  IonButtons,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router-dom";
import CreatePhononButton from "../components/CreatePhononButton";
import PhononListItem from "../components/PhononListItem";
import ReceivePhononButton from "../components/ReceivePhononButton";
import Layout from "../layout/Layout";
import { useFetchPhononsQuery } from "../store/api";

const PhononsList: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data, refetch, isLoading, isFetching } = useFetchPhononsQuery({
    sessionId,
  });

  function refresh(event: CustomEvent<any>) {
    refetch();
    event.detail.complete();
  }

  return (
    <Layout>
      <div className="flex my-2 justify-evenly">
        <IonButtons slot="primary">
          <CreatePhononButton />
        </IonButtons>
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
            {data?.map((item) => (
              <PhononListItem phonon={item} key={item.PubKey} />
            ))}
          </IonList>
        </>
      )}
    </Layout>
  );
};

export default PhononsList;
