import { useEffect, useState } from "react";
import { getLaunches } from "../services/api";
import { Launch } from "../types/Launch";

export function useLaunches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaunches()
      .then(setLaunches)
      .finally(() => setLoading(false));
  }, []);

  return { launches, loading };
}
