import { useConnectionStatusQuery } from "../store/api";
import { useSession } from "./useSession";

export const useIsConnected = () => {
  const { sessionId } = useSession();
  const { data: isConnected } = useConnectionStatusQuery({ sessionId });
  return { isConnected };
};
