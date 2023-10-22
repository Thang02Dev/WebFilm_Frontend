import axios from "axios"

async function login(data) {
    const res = await axios.post("http://localhost:3000/api/login",data);
    console.log(res.data)
    return await res.data
}

export function authservice(){
    return{
        login
    }
}