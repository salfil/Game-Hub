//general data fetching hook
import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";


interface FetchResponse<T>{
    count:number;
    results:T[];
}

const useData=<T>(endpoint:string, 
    requestConfig?: AxiosRequestConfig,
    deps?: any[]
    
    ) =>{
    //stroing game objects
  //state var for error messages too
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send req to backend
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, 
        {signal:controller.signal, ...requestConfig})
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
    });
    
    return() => controller.abort();

    }, deps? [...deps]:[]);

  return {data, error, isLoading};
};


export default useData;


