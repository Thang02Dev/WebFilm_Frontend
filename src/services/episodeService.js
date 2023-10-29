import axios from "axios"
import { ref } from "vue"

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError=ref(false);

let isEditAlert = ref(false);
let isEditError =ref(false);

async function GetAll(data) {
    try{
        let res = await axios.get("Episodes");
        data.value = await res.data;
        
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetByEpisodeNumber(number,movieId,serverId,data) {
    let res = await axios.get("Episodes/get-by-episode-number/"+number+"?movieId="+movieId+"&serverId="+ serverId);
    data.value = await res.data;
}
async function GetServer(number,movieId,data) {
    let res = await axios.get("Episodes/get-server/"+number+"?movieId="+movieId);
    data.value = await res.data;
}
async function GetByMovieId(id,data) {
    let res = await axios.get("Episodes/get-by-movieid/"+id);
    data.value = await res.data;
}
async function GetById(id,data) {
    let res = await axios.get("Episodes/get-by-id/" + id);
    data.value = await res.data;
}
async function Create(data){
    try{
        let res = await axios.post("Episodes",data);
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
        let res = await axios.put("Episodes?id=" + id,data);
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
async function Pagination(id,data,Currentpage,pageCount){
    let res = await axios.get("Episodes/" + Currentpage + "?id=" +id);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function GetCount(count) {
    let res = await axios.get("Episodes/get-count");
    count.value = await res.data;
}
async function GetEpisodes(id,data) {
    let res = await axios.get("Episodes/get-episodes/"+ id);
    data.value = await res.data;
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
        Pagination,
        GetCount,
        GetByEpisodeNumber,
        GetEpisodes,
        GetServer,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}