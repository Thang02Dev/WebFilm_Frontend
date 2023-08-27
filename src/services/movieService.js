import { ref } from "vue";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetAll(data) {
    const res = await axios.get("Movies");
    data.value = await res.data;
}
async function GetById(id,data) {
    const res = await axios.get("Movies/get-by-id/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        const res = await axios.post("Movies",data,{
            headers: {
                'Content-Type': 'multipart/form-data',      
            }
        });
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
        const res = await axios.put("Movies?id=" + id,data);
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
        await axios.delete("Movies?id=" + id);
    }
    catch(err){
        console.log(err);
    }
}

async function ChangedStatus(id) {
    await axios.post("Movies/changed-status?id=" + id);
}
async function ChangedHot(id) {
    await axios.post("Movies/changed-hot?id=" + id);
}
async function ChangedTopView(id) {
    await axios.post("Movies/changed-topview?id=" + id);
}

export function movieservice(){
    return{
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        ChangedHot,
        ChangedTopView,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}