import axios from "axios"
import { ref } from "vue"

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetAll(data) {
    try{
        let res = await axios.get("Categories");
        data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetByStatus(data) {
    
    try{
        let res = await axios.get("Categories/get-by-status");
    data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetBySlug(slug,data) {
    let res = await axios.get("Categories/get-by-slug/"+slug);
    data.value = await res.data;
}
async function GetById(id,data) {
    let res = await axios.get("Categories/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        let res = await axios.post("Categories",data);
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
        let res = await axios.put("Categories?id=" + id,data);
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
        await axios.delete("Categories?id=" + id);
    }
    catch(err){
        console.log(err);
    }
}

async function ChangedStatus(id) {
    await axios.post("Categories/changed-status?id=" + id);
}
async function GetCount(count) {
    let res = await axios.get("Categories/get-count");
    count.value = await res.data;
}
async function ChangedPosition(id,position) {
    await axios.post("Categories/changed-position?id=" + id + "&newPosition="+ position);
}

export function categoryservice(){
    return{
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        GetByStatus,
        GetCount,
        ChangedPosition,
        GetBySlug,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}