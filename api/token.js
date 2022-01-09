import { func } from "prop-types";

export function setToken(token){

    localStorage.setItem("token", token);
}


export function getToken(){
    return localStorage.getItem("token");
}