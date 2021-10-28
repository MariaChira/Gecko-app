import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers: {'Accept': 'application/json'}
});

const buildParams = (params) => {
    if(params === undefined)return ''
    const arr = [];
    Object.keys(params).forEach(k => {
        if(params[k] !== undefined)arr.push(`${k}=${params[k]}`)
    });
    return '?'+arr.join('&');
}

//TODO reqParams to be array
const validateParams = (params, reqParams) => {
    let isValid = params !== undefined;
    if(params){
        const paramsArray = Object.keys(params);
        reqParams.forEach((rp) => {
            if(!paramsArray.includes(rp)){
                isValid = false;
            }
        })
    }
    return isValid;
}

export const getCoinsMarket = async (params) => {
    const isValid = validateParams(params, ['vs_currency']);

    if(isValid){
        const parsedParams = buildParams(params)
        try{
            const res = await instance.get(`/coins/markets${parsedParams}`);
            return { data: res.data };
        }
        catch(error){
            return { error }
        }       
    }  
    else {
        return {
            error: 'Invalid call parameters'
        }
    }
}

export const getCoinDetails = async (subUrl, params) => {

    if(subUrl){
        const parsedParams = buildParams(params)
        try{
            const res = await instance.get(`/coins/${subUrl}${parsedParams}`);
            return { data: res.data };
        }
        catch(error){
            return { error }
        }       
    }  
    else {
        return {
            error: 'Invalid call parameters'
        }
    }
}
