import { useCallback, useEffect, useState } from "react";

const base_url = import.meta.env.VITE_BE_URL;

interface Data {
  status: "success" | "error";
  data: unknown;
}

type method = "GET" | "POST" | undefined;
type data = object | null;

function useFetch(
  url: string,
  method: method = undefined,
  data: data = null,
  exec = true,
) {
  const [response, setResponse] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [execute, setExecute] = useState(exec);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const bd = data
      ? {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ ...data }),
        }
      : {};

    try {
      const res = await fetch(base_url + url, {
        method: method,
        ...bd,
      });
      setResponse(await res.json());
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
      setExecute(false);
    }
  }, [url, method, data]);

  useEffect(() => {
    if (execute) {
      fetchData();
    }
  }, [fetchData, execute]);

  return {
    response,
    loading,
    error,
    setExecute,
    execute,
  };
}

export default useFetch;
