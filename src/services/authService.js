import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;


async function login(data) {
    try{
        const res = await axios.post("Authen/login",data,{
            withCredentials: true,
        });
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