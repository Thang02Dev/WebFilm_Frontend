import { useCookies } from "vue3-cookies";
import { ref } from "vue";

let { cookies } = useCookies();
let token = cookies.get("Login_Token");
let saveRoute = ref(null)
function isToken() {
    if(token===null){
        return false;
    }
    return true;
}

function getToken(){
    return cookies.get("Login_Token");
}


export function tokenservice(){
    return {
        isToken,
        getToken,
        saveRoute,
    }
};