import axios from "axios"
import {tokenservice} from "../services/tokenService"

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

axios.defaults.headers.common["Authorization"] = 'Bearer ' + tokenservice().getToken();
async function login(data) {
    try{
        const res = await axios.post("Authen/login",data);
        return res
    }
    catch(err){
        return err.response
    }
}

export function authservice(){
    return{
        login
    }
}