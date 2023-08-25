import { ref } from "vue";
import apiUrl from "../common/apiUrl"
import axios from "axios";

axios.defaults.baseURL = apiUrl.return.baseURL;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetAll(data) {
    const res = await axios.get("Genres");
    data.value = await res.data;
}
async function GetById(id,data) {
    const res = await axios.get("Genres/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        const res = await axios.post("Genres",data);
        if(res.status === 200){
            isCreateAlert.value = true;
            setTimeout(() => {
                isCreateAlert.value = false;
            }, 5000);
        }
        console.log(res)
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
        const res = await axios.put("Genres?id=" + id,data);
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
        await axios.delete("Genres?id=" + id);
    }
    catch(err){
        console.log(err);
    }
}

async function ChangedStatus(id) {
    await axios.post("Genres/changed-status?id=" + id);
}

export function genreservice(){
    return{
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}