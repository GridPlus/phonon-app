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
    fetchSessions: builder.query<Session[], void>({
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
    initSession: builder.mutation<void, { sessionId: string; pin: string }>({
      query: ({ sessionId, pin }) => ({
        url: `cards/${sessionId}/init`,
        method: "POST",
        body: { pin },
      }),
      invalidatesTags: ["Session"],
    }),
    nameSession: builder.mutation<void, { sessionId: string; name: string }>({
      query: ({ sessionId, name }) => ({
        url: `cards/${sessionId}/name`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Session"],
    }),
    pair: builder.mutation<void, { sessionId: string; cardId: string }>({
      query: ({ cardId, sessionId }) => ({
        url: `cards/${sessionId}/pair`,
        method: "POST",
        body: { CardID: `${cardId}` },
      }),
    }),
    connect: builder.mutation<void, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `cards/${sessionId}/connect`,
        method: "POST",
        body: { url: `${bridgeUrl}` },
      }),
    }),
    connectionStatus: builder.query<
      { ConnectionStatus: number },
      { sessionId: string }
    >({
      query: ({ sessionId }) => `/cards/${sessionId}/connectionStatus`,
    }),
    fetchPhonons: builder.query<PhononDTO[], { sessionId: string }>({
      query: ({ sessionId }) => `/cards/${sessionId}/listPhonons`,
      providesTags: ["Phonon"],
    }),
    checkDenomination: builder.mutation<void, { denomination: string }>({
      query: ({ denomination }) => ({
        url: `/checkDenomination`,
        method: "POST",
        body: denomination,
      }),
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
      invalidatesTags: ["Phonon"],
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
    createMockCard: builder.mutation<void, void>({
      query: () => ({
        url: `genMock`,
        method: "GET",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useFetchSessionsQuery,
  useUnlockSessionMutation,
  useInitSessionMutation,
  useNameSessionMutation,
  usePairMutation,
  useConnectMutation,
  useConnectionStatusQuery,
  useFetchPhononsQuery,
  useCheckDenominationMutation,
  useCreatePhononMutation,
  useInitDepositMutation,
  useFinalizeDepositMutation,
  useSetDescriptorMutation,
  useRedeemPhononMutation,
  useSendPhononMutation,
  useCreateMockCardMutation,
} = api;
