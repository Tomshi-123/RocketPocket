import { useEffect, useState } from "react";
import { getExpeditions } from "../services/api";
import { Expedition } from "../types/Expeditions";

export function useExpeditions() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExpeditions()
      .then(setExpeditions)
      .finally(() => setLoading(false));
  }, []);

  return { expeditions, loading };
}
