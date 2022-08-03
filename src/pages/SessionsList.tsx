import { IonButton, IonList } from "@ionic/react";
import React from "react";
import SessionListItem from "../components/SessionListItem";
import { useCreateMockCardMutation, useFetchSessionsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { data } = useFetchSessionsQuery();
  const [createMockCard, { isLoading }] = useCreateMockCardMutation();

  return (
    <>
      <h2 className="my-2 text-xl text-center">Wallets</h2>
      {data && (
        <IonList>
          {data.map((session) => (
            <SessionListItem session={session} key={session.Id} />
          ))}
        </IonList>
      )}

      {!data && (
        <div className="text-center text-sm">
          <p className="mt-10 text-lg">No phonon cards detected.</p>
          <p className="mt-5 text-lg">
            Create a mock card below to preview the Phonon Protocol features.
          </p>
          <p className="mt-5">Please note, mock cards...</p>
          <ul className="list-disc list-inside">
            <li className="mt-2">
              are deleted, including all phonons, when this app is closed
            </li>
            <li className="mt-2">
              have a different certificate than alpha and test net phonon cards
              and therefore cannot communicate with them.
            </li>
          </ul>
          <IonButton
            color="primary"
            fill="outline"
            onClick={() => createMockCard()}
            className="mt-10"
            disabled={isLoading}
          >
            Create mock card
          </IonButton>
        </div>
      )}
    </>
  );
};

export default SessionsPage;
