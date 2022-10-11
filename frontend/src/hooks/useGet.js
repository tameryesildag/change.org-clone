import { useEffect, useState } from "react"

const useGet = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        fetch(url).then(res => {
            if (!res.ok) return alert("Couldn't fetch data!");
            return res.json();
        }).then(resData => {
            setData(resData);
            setIsPending(false);
        })
    }, [url]);

    return {data, isPending}

}

export default useGet;