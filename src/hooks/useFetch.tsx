import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string, body: { prompt: string; },  initialState: T): [T, boolean] => {
    const [data, setData] = useState<T>(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setData(data);
            
        }).finally(() => setLoading(false))
    }, [url]);

    return [data, loading];
}