import { useRef } from 'react';


/**
 * method: get | set
 * key: string
 * data: obj
 * type: local | session
 */

export function usePersistentStorage(method, key, data, type) {
    console.log({method, key, data, type})

    const hookState = useRef();

    const dataToBeStored = JSON.stringify(data);

    switch(method) {
        case 'get':
            if(type === 'local'){
                hookState.current = localStorage.getItem(key);
                break;
            }
            else if(type === 'session'){
                hookState.current = sessionStorage.getItem(key);
                break;
            }
            break;
        case 'set':
            if(type === 'local')return localStorage.setItem(key, dataToBeStored);
            else if(type === 'session') return sessionStorage.setItem(key, dataToBeStored);
           break;
            default:
            console.log("default")
            break;
    }

    return JSON.parse(hookState.current);
}
