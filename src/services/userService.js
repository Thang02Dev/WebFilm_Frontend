import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

async function GetUserCount(data) {
    let res = await axios.get("User/count");
    data.value = res.data
}
async function GetAll(data) {
    let res = await axios.get("http://localhost:3000/api/user");
    data.value = res.data
}
async function GetById(id,data) {
    let res = await axios.get("http://localhost:3000/api/user/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        let res = await axios.post("http://localhost:3000/api/user",data);
        if(res.status === 200){
            isCreateAlert.value = true;
            setTimeout(() => {
                isCreateAlert.value = false;
            }, 5000);
        }
    }
    catch(err){
        if(err.response.status===400){
            isCreateError.value = true;
            setTimeout(() => {
                isCreateError.value = false;
            }, 5000);
        }
    }
}
async function Edit(id,data) {
    try{
        let res = await axios.put("http://localhost:3000/api/user/" + id,data);
        if(res.status === 200){
            isEditAlert.value = true;
            setTimeout(() => {
                isEditAlert.value = false;
            }, 5000);
        }
    }
    catch(err){
        if(err.response.status===400){
            isEditError.value = true;
            setTimeout(() => {
                isEditError.value = false;
            }, 5000);
        }
    }
}
async function Delete(id) {
    try{
        await axios.delete("http://localhost:3000/api/user/" + id);
    }
    catch(err){
        console.log(err);
    }
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
        GetAll,
        Create,
        Edit,
        Delete,
        GetById,
    }
}