import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";


interface Genre{
    id:number;
    name:string;
}

interface FetchGenresResponse{
    count:number;
    results:Genre[];
}

const useGenres=() =>{
    //stroing game objects
  //state var for error messages too
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send req to backend
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresResponse>("/genres", {signal:controller.signal})
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
    });
    
    return() => controller.abort();

    }, []);

  return {genres, error, isLoading};
};


export default useGenres;