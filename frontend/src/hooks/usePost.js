import { useState, useEffect } from "react";

const usePost = () => {

    function postRequest(url, data){
        fetch(url, {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
            if (!res.ok) return alert("Couldn't post the data!");
            return res.json();
        }).then(resData => {
            console.log(resData);
        });
    }

    return postRequest;

}

export default usePost;