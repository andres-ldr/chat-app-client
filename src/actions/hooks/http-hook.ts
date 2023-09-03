import { useState, useCallback, useEffect, useRef } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: RequestInfo | URL,
      method = 'GET',
      body: FormData | string | null = null,
      headers = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl: AbortController = new AbortController();

      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
          credentials: 'include',
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsSuccess(true);
        setIsLoading(false);
        return responseData;
      } catch (err) {
        const error = err as Error;
        if (error.message !== 'The user aborted a request.') {
          setError(error.message);
          setIsLoading(false);
          throw err;
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl: AbortController) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError, isSuccess };
};
