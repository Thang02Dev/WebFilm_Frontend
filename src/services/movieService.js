import { ref } from "vue";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

let isCreateAlert = ref(false);
let isCreateError = ref(false);

let isEditAlert = ref(false);
let isEditError = ref(false);

async function GetAll(data) {
    try{
        let res = await axios.get("Movies");
        data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetByHot(data) {
    
    try{
        let res = await axios.get("Movies/get-by-hot");
        data.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetById(id, data) {
    let res = await axios.get("Movies/get-by-id/" + id);
    data.value = await res.data;
}
async function GetBySlug(slug, data) {
    let res = await axios.get("Movies/get-by-slug/" + slug);
    data.value = await res.data;
}
async function GetByStatus(data) {
    let res = await axios.get("Movies/get-by-status");
    data.value = await res.data;
}
async function Create(data) {
    try {
        let res = await axios.post("Movies", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if (res.status === 200) {
            isCreateAlert.value = true;
            setTimeout(() => {
                isCreateAlert.value = false;
            }, 5000);
        }
    }
    catch (err) {
        if (err.response.status === 400) {
            isCreateError.value = true;
            setTimeout(() => {
                isCreateError.value = false;
            }, 5000);
        }
    }
}
async function Edit(id, data) {
    try {
        let res = await axios.put("Movies?id=" + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if (res.status === 200) {
            isEditAlert.value = true;
            setTimeout(() => {
                isEditAlert.value = false;
            }, 5000);
        }
    }
    catch (err) {
        if (err.response.status === 400) {
            isEditError.value = true;
            setTimeout(() => {
                isEditError.value = false;
            }, 5000);
        }
    }
}
async function Delete(id) {
    try {
        await axios.delete("Movies?id=" + id);
    }
    catch (err) {
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
async function Pagination(data, Currentpage, pageCount) {
    let res = await axios.get("Movies/" + Currentpage);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginSearch(data,value, Currentpage, pageCount) {
    let res = await axios.get("Movies/pagin-search/" + Currentpage +"?value="+value);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginationByCate(id, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/get-by-cateid/" + Currentpage + "?cateId=" + id);
    data.value = res.data;
    
    pageCount.value = data.value.pageCount;
}
async function PaginationByGenre(id, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/get-by-genreid/" + Currentpage + "?genreId=" + id);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginationByCountry(id, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/get-by-countryid/" + Currentpage + "?countryId=" + id);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginationByYear(id, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/get-by-year/" + Currentpage + "?year=" + id);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginFilterCountry(order, genreid, countryid, year, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/pagin-filter-country/" + Currentpage + "?order=" + order + "&genreId=" + genreid + "&countryId=" + countryid + "&year=" + year);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginFilterYear(order, genreid, countryid, year, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/pagin-filter-year/" + Currentpage + "?order=" + order + "&genreId=" + genreid + "&countryId=" + countryid + "&year=" + year);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function PaginFilterGenre(order, genreid, countryid, year, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/pagin-filter-genre/" + Currentpage + "?order=" + order + "&genreId=" + genreid + "&countryId=" + countryid + "&year=" + year);
    data.value = res.data;
    console.log(res)
    pageCount.value = data.value.pageCount;
}
async function PaginFilterCate(id, order, genreid, countryid, year, data, Currentpage, pageCount) {
    let res = await axios.get("Movies/pagin-filter-cate/" + Currentpage + "?cateId=" + id + "&order=" + order + "&genreId=" + genreid + "&countryId=" + countryid + "&year=" + year);
    data.value = res.data;
    pageCount.value = data.value.pageCount;
}
async function GetCount(count) {
    
    try{
        let res = await axios.get("Movies/get-count");
    count.value = await res.data;
        return res.status;
    }
    catch(err){
        return err.response.status
    }
}
async function GetByCategorySlug(slug, data) {
    let res = await axios.get("Movies/get-by-categoryslug?cateSlug=" + slug);
    data.value = await res.data;
}
async function ChangedPosition(id, position) {
    await axios.post("Movies/changed-position?id=" + id + "&newPosition=" + position);
}
async function GetByGenreSlug(slug, data) {
    let res = await axios.get("Movies/get-by-genreslug?genreSlug=" + slug);
    data.value = await res.data;
}
export function movieservice() {
    return {
        GetAll,
        Create,
        Edit,
        GetById,
        Delete,
        ChangedStatus,
        ChangedHot,
        ChangedTopView,
        Pagination,
        GetByStatus,
        GetCount,
        GetByCategorySlug,
        ChangedPosition,
        GetByGenreSlug,
        GetByHot,
        PaginationByCate,
        PaginFilterGenre,
        PaginFilterCate,
        PaginationByGenre,
        PaginFilterCountry,
        PaginFilterYear,
        PaginationByYear,
        PaginationByCountry,
        GetBySlug,
        PaginSearch,
        //var
        isCreateAlert,
        isCreateError,
        isEditAlert,
        isEditError
    }
}