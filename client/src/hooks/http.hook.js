import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLOading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = 'get', body = null, headers = {}) => {
      setLOading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-type'] = 'application/json';
        }
        const response = await fetch(
          url,
          {
            method,
            body,
            headers,
          },
          []
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'че то пошло не так');
        }

        setLOading(false);
        return data;
      } catch (e) {
        setLOading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
