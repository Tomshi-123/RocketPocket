import { useEffect, useState } from "react";
import { getExpeditions } from "../services/api";
import { Expedition } from "../types/Expeditions";

export function useExpeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getExpeditions()
      .then(setExpeditions)
      .catch((caughtError: unknown) => {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Kunde inte hämta expeditioner.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { expeditions, loading, error };
}
