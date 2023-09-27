import { useState, useEffect } from "react";
import axios from "axios";


const useFetch =(endpoint, query, params, headers, method)=>{
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const options = {
      method: method,
      url: endpoint,
      headers: {...headers},
      params: {...query}
    };
      const fetchData=async()=>{

        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert("An error occurred while fetching data")
        } finally{
            setIsLoading(false);
        }
      }

      useEffect(()=>{
        fetchData()
      },[])

      const refetch = async()=>{
        fetchData()
        setIsLoading(true)
      }

    return {data, refetch, isLoading, error}
}


export default useFetch