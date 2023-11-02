import axios from "axios"
import { ref } from "vue";
axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetUserCount(data) {
    let res = await axios.get("Users/count");
    data.value = res.data
}
async function GetAll(data) {
    try{
        let res = await axios.get("Users");
        data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetById(id,data) {
    let res = await axios.get("Users/" + id);
    data.value = await res.data;
}
async function ChangedStatus(id) {
    await axios.post("Users/changed-status?id=" + id);
}
async function Create(data){
    try{
        let res = await axios.post("Users",data);
        if(res.status == 200){
            isCreateAlert.value = true;
            setTimeout(() => {
                isCreateAlert.value = false;
            }, 5000);
        }
    }
    catch(err){
        if(err.response.status==400){
            isCreateError.value = true;
            setTimeout(() => {
                isCreateError.value = false;
            }, 5000);
        }
    }
}
async function Edit(id,data) {
    try{
        let res = await axios.put("Users/" + id,data);
        if(res.status == 200){
            isEditAlert.value = true;
            setTimeout(() => {
                isEditAlert.value = false;
            }, 5000);
        }
    }
    catch(err){
        if(err.response.status==400){
            isEditError.value = true;
            setTimeout(() => {
                isEditError.value = false;
            }, 5000);
        }
    }
}
async function Delete(id) {
    try{
        await axios.delete("Users/" + id);
    }
    catch(err){
        console.log(err);
    }
}

async function AddUserCount(data) {
    let res= await axios.post("Users/increment");
    data.value = res.data
}
async function RemoveUserCount(data) {
    let res= await axios.post("Users/decrement");
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
        ChangedStatus,
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}