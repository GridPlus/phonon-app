import { useParams } from "react-router";

export const useSession = () => {
  const { sessionId } = useParams<{
    sessionId: string;
  }>();
  return { sessionId };
};
