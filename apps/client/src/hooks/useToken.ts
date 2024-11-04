import { useState } from "react";

export default function useToken() {

    function getToken() {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken
        }
    }

    const [token, setToken] = useState(getToken())

    function saveToken(userToken: string) {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken)
    }

    function removeToken() {
        localStorage.removeItem('token');
        setToken(null)
    }

    return {
        setToken: saveToken,
        token, 
        removeToken
    }

}