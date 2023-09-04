import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

async function GetUserCount(data) {
    let res = await axios.get("User/count");
    data.value = res.data
}
async function AddUserCount(data) {
    let res= await axios.post("User/increment");
    data.value = res.data
}
async function RemoveUserCount(data) {
    let res= await axios.post("User/decrement");
    data.value = res.data
}
export function userservice(){
    return{
        GetUserCount,
        AddUserCount,
        RemoveUserCount,
    }
}