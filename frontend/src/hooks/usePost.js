import { useState, useEffect } from "react";

const usePost = () => {

    function postRequest(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (!res.ok) reject("Couldn't fetch the data!");
                return res.json();
            }).then(resData => {
                resolve(resData);
            });
        })
    }

    return postRequest;

}

export default usePost;