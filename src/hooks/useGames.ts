import { useState, useEffect } from "react";
import apiClient from "../services/api-client";


export interface Platform{
  id:number;
  name:string;
  slug:string;

}

export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms:{platform:Platform}[]
    metacritic:number;
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }
  



const useGames=() => {
    //stroing game objects
  //state var for error messages too
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send req to backend
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", {signal:controller.signal})
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
    });
    
    return() => controller.abort();

    }, []);

  return {games, error, isLoading};

}


export default useGames;











