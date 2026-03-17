import { getLaunches } from "../services/api";
import { Launch } from "../types/Launch";
import { useAsyncResource } from "./useAsyncResource";

export function useLaunches() {
  const { data, loading, error, refresh } = useAsyncResource<Launch[]>(
    getLaunches,
    {
      initialData: [],
      fallbackErrorMessage: "Kunde inte hämta raketer.",
    },
  );

  return { launches: data, loading, error, refresh };
}
