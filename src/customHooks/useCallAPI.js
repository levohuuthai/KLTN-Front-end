import { useState, useEffect } from "react";

const useCallAPI = ({ url, body = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchCallAPI = async () => {
    try {
      const requestCallAPI = await url(body);
      setResponse(requestCallAPI);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCallAPI();
  }, [url, body]);

  return { response, error, loading };
};

export default useCallAPI;
