import axios from "axios"
import { ref } from "vue"

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetAll(data) {
    const res = await axios.get("Episodes");
    data.value = await res.data;
}
async function GetByMovieId(id,data) {
    const res = await axios.get("Episodes/get-by-movieid/"+id);
    data.value = await res.data;
}
async function GetById(id,data) {
    const res = await axios.get("Episodes/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        const res = await axios.post("Episodes",data);
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
        const res = await axios.put("Episodes?id=" + id,data);
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
        await axios.delete("Episodes?id=" + id);
    }
    catch(err){
        console.log(err);
    }
}

async function ChangedStatus(id) {
    await axios.post("Episodes/changed-status?id=" + id);
}

export function episodeservice(){
    return{
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        GetByMovieId,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}