import { useSelector } from "react-redux";
import { RootState } from "../store";

const useSessionDisplayName = (sessionId: string): string => {
  const sessionNames = useSelector((state: RootState) => state.sessions.names);
  return sessionNames[sessionId] || sessionId;
};

export default useSessionDisplayName;
