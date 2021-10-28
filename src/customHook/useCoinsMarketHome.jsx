import React, {useState, useEffect} from 'react';
import { validateParams, buildParams, instance } from "../services/api";

export function useCoinsMarketHome(params) {

    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData(){
            const isValid = validateParams(params, ['vs_currency']);

            if(isValid){
                const parsedParams = buildParams(params)
                try{
                    const res = await instance.get(`/coins/markets${parsedParams}`);
                    setData({ data: res.data });
                }
                catch(error){
                    return setData({ error })
                }       
            }  
            else {
                setData({
                    error: 'Invalid call parameters'
                })
            }
        }

        fetchData();
    }, [])

    return data; 
}