import { useEffect, useState } from "react"

const useGet = (path) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_HOST + path).then(res => {
            if (!res.ok) return alert("Couldn't fetch data!");
            return res.json();
        }).then(resData => {
            setData(resData);
            setIsPending(false);
        })
    }, [path]);

    return {data, isPending}

}

export default useGet();