<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo text-center">
                <h3 class="fw-bold">ADMIN LOGIN</h3>
              </div>
              <h6 class="fw-light">Đăng nhập để tiếp tục</h6>
              <form @submit.prevent="onSubmit" class="pt-3">
                <div class="form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-lg"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Mật khẩu"
                    required
                  />
                </div>
                <div class="mt-3">
                  <button style="width: 100%;" class="btn btn-block btn-dark btn-lg font-weight-medium auth-form-btn" type="submit">ĐĂNG NHẬP</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import { ref,reactive } from "vue";
import { authservice } from "../../services/authService";
import { useCookies } from "vue3-cookies";
import {tokenservice} from "../../services/tokenService"
import { useRouter } from "vue-router";

export default {
  setup(){
    let {cookies} = useCookies()
    const form = reactive({
      email:"",
      password:"",
    })
    const router = useRouter();
    async function onSubmit() {
      const res = await authservice().login(form);
      if(res.status == 400)
      {
        alert(res.data)
      }
      else
      {
        let token = res.data.token;
        cookies.set("Login_Token",token,"1d");
        if(tokenservice().saveRoute.value){
          router.push({ name: tokenservice().saveRoute.value }).then(() => {
          window.location.reload();
          tokenservice().saveRoute.value = null; 
        })}
        else{
          router.push({ name: "admin-dashboard-router" }).then(() => {
          window.location.reload();})
        }
      }
    }

    return{
      form,
      onSubmit,
    }
  }
};
</script>

<style>
</style>