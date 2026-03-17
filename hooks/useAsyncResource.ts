import { useCallback, useEffect, useState } from "react";

type UseAsyncResourceOptions<T> = {
  initialData: T;
  fallbackErrorMessage: string;
};

export function useAsyncResource<T>(
  fetcher: () => Promise<T>,
  options: UseAsyncResourceOptions<T>,
) {
  const { initialData, fallbackErrorMessage } = options;
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
    } catch (caughtError: unknown) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : fallbackErrorMessage;
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [fallbackErrorMessage, fetcher]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, refresh: load };
}
