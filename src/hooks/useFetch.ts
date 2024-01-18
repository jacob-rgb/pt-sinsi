import { useEffect, useState } from "react";

export interface UseFetchProps<T> {
    endpoint: string, 
    method?: string, 
    body?: unknown, 
    params?: URLSearchParams,
    setStateCb?: null | ((newState: T) => void )
}

export default function useFetch<T>({
    endpoint, 
    method = 'GET', 
    body, 
    params,
    setStateCb
}: UseFetchProps<T>) {

    let controller: AbortController;

    const [ response, setResponse ] = useState<T | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<Error | null>(null);

    useEffect( () => {
        if (endpoint) {
            setIsLoading(true);
            fetchData();
        }
        return () => {
            controller?.abort();
        }
    }, [endpoint, method, body]);

    const fetchData = async () => {
        try {
            controller = new AbortController();
            const signal = controller.signal;
            let response = null;
            if (params) {
                endpoint+= '?' + params.toString();
            }
            if( ['GET', 'DELETE'].includes(method)) {
                response = await fetch(endpoint, { method, signal });
            } else {
                response = await fetch(endpoint, { method, body: (body as BodyInit | null), signal });
            }
            const data = await response.json();
            setResponse(data);
            if(setStateCb) setStateCb(data);
            setIsLoading(false);
            setError(null);
        } catch (error: unknown) {
            setIsLoading(false);
            setError(error as Error);
            setResponse(null);
            throw new Error('Error al cargar la data en ' + endpoint);
        }
    }  
    
    return { isLoading, response, error };
}