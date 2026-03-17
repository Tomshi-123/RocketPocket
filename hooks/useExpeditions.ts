import { getExpeditions } from "../services/api";
import { Expedition } from "../types/Expeditions";
import { useAsyncResource } from "./useAsyncResource";

export function useExpeditions() {
  const { data, loading, error, refresh } = useAsyncResource<Expedition[]>(
    getExpeditions,
    {
      initialData: [],
      fallbackErrorMessage: "Kunde inte hämta expeditioner.",
    },
  );

  return { expeditions: data, loading, error, refresh };
}
