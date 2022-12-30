import { useState, useCallback } from "react";

const useHttp4File = (processData) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetError = () => {
    setError(null);
  };

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchdata = await fetch(requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: requestConfig.body,
        });

        if (!fetchdata.ok) {
          const errorData = await fetchdata.json();
          throw new Error(errorData.message || errorData.msg);
        }

        const rawData = await fetchdata.json();
        processData(rawData);
      } catch (err) {
        setError(err.message || err.statusText || "Something Went Wrong...");
      }
      setIsLoading(false);
    },
    [processData]
  );

  // fetchMeals();

  return {
    isFileloading: isloading,
    fileRrror: error,
    sendRequest4File: sendRequest,
    resetFileError: resetError,
  };
};

export default useHttp4File;
