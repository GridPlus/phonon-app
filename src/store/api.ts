import {
  RedeemPhononDTO,
  CreatePhononResponse,
  DepositConfirmation,
  DepositRequest,
  DescriptorDTO,
  PhononDTO,
  Session,
  SendPhononDTO,
} from "./../types/index";
import { isPlatform } from "@ionic/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = isPlatform("capacitor")
  ? "https://phonon.npmaile.com:8080/"
  : "/";
const bridgeUrl = "https://phonon.npmaile.com:443/phonon/";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Session", "Phonon"],
  endpoints: (builder) => ({
    fetchSessions: builder.query<{ Sessions: Session[] }, void>({
      query: () => "listSessions",
      providesTags: ["Session"],
    }),
    unlockSession: builder.mutation<void, { sessionId: string; pin: string }>({
      query: ({ sessionId, pin }) => ({
        url: `cards/${sessionId}/unlock`,
        method: "POST",
        body: { pin },
      }),
      invalidatesTags: ["Session"],
    }),
    pair: builder.mutation<void, { sessionId: string; cardId: string }>({
      query: ({ cardId, sessionId }) => ({
        url: `cards/${sessionId}/pair`,
        method: "POST",
        body: { url: `${bridgeUrl}${cardId}` },
      }),
    }),
    connect: builder.mutation<void, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `cards/${sessionId}/connect`,
        method: "POST",
        body: { url: `${bridgeUrl}` },
      }),
    }),
    connectionStatus: builder.query<boolean, { sessionId: string }>({
      query: ({ sessionId }) => `/cards/${sessionId}/connectionStatus`,
    }),
    fetchPhonons: builder.query<PhononDTO[], { sessionId: string }>({
      query: ({ sessionId }) => `/cards/${sessionId}/listPhonons`,
      providesTags: ["Phonon"],
    }),
    createPhonon: builder.mutation<CreatePhononResponse, { sessionId: string }>(
      {
        query: ({ sessionId }) => ({
          url: `cards/${sessionId}/phonon/create`,
          method: "POST",
        }),
      }
    ),
    setDescriptor: builder.mutation<void, DescriptorDTO>({
      query: ({ index, currencyType, sessionId, value }) => ({
        url: `cards/${sessionId}/phonon/${index}/setDescriptor`,
        method: "POST",
        body: { currencyType, value },
      }),
      invalidatesTags: ["Phonon"],
    }),
    redeemPhonon: builder.mutation<
      { privateKey: string },
      { payload: RedeemPhononDTO[]; sessionId: string }
    >({
      query: ({ payload, sessionId }) => ({
        url: `cards/${sessionId}/phonon/redeem`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Phonon"],
    }),
    sendPhonon: builder.mutation<
      void,
      { payload: SendPhononDTO; sessionId: string }
    >({
      query: ({ payload, sessionId }) => ({
        url: `cards/${sessionId}/phonon/send`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["Phonon"],
    }),
    initDeposit: builder.mutation<
      PhononDTO[],
      { payload: DepositRequest; sessionId: string }
    >({
      query: ({ payload, sessionId }) => ({
        url: `cards/${sessionId}/phonon/initDeposit`,
        method: "POST",
        body: payload,
      }),
    }),
    finalizeDeposit: builder.mutation<
      DepositConfirmation,
      { payload: DepositConfirmation; sessionId: string }
    >({
      query: ({ payload, sessionId }) => ({
        url: `cards/${sessionId}/phonon/finalizeDeposit`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Phonon"],
    }),
  }),
});

export const {
  useFetchSessionsQuery,
  useUnlockSessionMutation,
  usePairMutation,
  useConnectMutation,
  useConnectionStatusQuery,
  useFetchPhononsQuery,
  useCreatePhononMutation,
  useInitDepositMutation,
  useFinalizeDepositMutation,
  useSetDescriptorMutation,
  useRedeemPhononMutation,
  useSendPhononMutation,
} = api;
