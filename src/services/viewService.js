import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

async function GetAll(data) {
        let res = await axios.get("Views");
        data.value = await res.data;
}
async function GetViewAll(data) {
    
    try{
        let res = await axios.get("Views/get-view-all")
    data.value = res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function Delete(id) {
    await axios.delete("Views/"+id)
}
async function Pagination(data,page,pageCount) {
    let res = await axios.get("Views/page/"+page)
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function CountPagination(data,page,pageCount) {
    let res = await axios.get("Views/get-view-all/"+page)
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function CreatedView(movieId) {
    await axios.post("Views/created-view/" + movieId)
}
async function GetByDay(data) {
    let res = await axios.get("Views/get-view-day")
    data.value = res.data;
}
async function GetByMonth(data) {
    let res = await axios.get("Views/get-view-month")
    data.value = res.data;
}
async function GetByWeek(data) {
    let res = await axios.get("Views/get-view-week")
    data.value = res.data;
}

export function viewservice(){
    return{
        GetAll,
        CreatedView,
        GetByDay,
        GetByMonth,
        GetByWeek,
        Pagination,
        Delete,
        CountPagination,
        GetViewAll
    }
}