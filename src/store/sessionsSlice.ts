import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionNamesLocalStorage } from "../utils/local-storage";

const initialState = { names: sessionNamesLocalStorage.get() || {} };

type SetNamePayload = {
  sessionId: string;
  name: string | undefined;
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<SetNamePayload>) {
      const updatedNames = {
        ...state.names,
        [action.payload.sessionId]: action.payload.name,
      };
      state.names = updatedNames;
      sessionNamesLocalStorage.set(updatedNames);
    },
  },
});

export const { setName } = sessionsSlice.actions;
export default sessionsSlice.reducer;
