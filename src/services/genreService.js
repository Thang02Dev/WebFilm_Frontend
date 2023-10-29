import { ref } from "vue";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);
async function GetBySlug(slug,data) {
    let res = await axios.get("Genres/get-by-slug/"+slug);
    data.value = await res.data;
}
async function GetAll(data) {
    try{
        let res = await axios.get("Genres");
        data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetByStatus(data) {
    let res = await axios.get("Genres/get-by-status");
    data.value = await res.data;
}
async function GetById(id,data) {
    let res = await axios.get("Genres/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        let res = await axios.post("Genres",data);
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
        let res = await axios.put("Genres?id=" + id,data);
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
async function GetCount(count) {
    let res = await axios.get("Genres/get-count");
    count.value = await res.data;
}
export function genreservice(){
    return{
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        GetByStatus,
        GetCount,
        GetBySlug,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}