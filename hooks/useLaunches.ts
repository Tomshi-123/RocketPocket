import { useEffect, useState } from "react";
import { getLaunches } from "../services/api";
import { Launch } from "../types/Launch";

export function useLaunches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLaunches()
      .then(setLaunches)
      .catch((caughtError: unknown) => {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Kunde inte hämta raketer.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { launches, loading, error };
}
