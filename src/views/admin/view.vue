<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Lượt xem của phim</h4>
        <div class="card-description">
          <div class="d-flex justify-content-end align-items-center">
              <i class="icon-search text-dark mx-4"></i>
              <input
                style="width: 200px"
                placeholder="Tìm kiếm"
                type="text"
                class="form-control"
                @keyup="keyUpSearch"
                v-model="keySearch"
              />
            </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên phim</th>
                <th>Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in viewCounts.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <p>{{ item.title }}</p>
                    <small>({{ item.name_Eng }})</small>
                  </td>
                  <td>{{ item.count }}</td>
                </tr>
            </tbody>
          </table>
          <div class="my-5">
            <paginate
                :page-count="this.pageCount1"
                :page-range="3"
                :margin-pages="2"
                :click-handler="getCountPagination"
                :prev-text="'<'"
                :next-text="'>'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              >
              </paginate> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Thông tin chi tiết</h4>
        <div class="card-description"></div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên phim</th>
                <th>Địa chỉ IP</th>
                <th>Thời gian xem</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in views.viewViewModels" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <p>{{ item.title }}</p>
                    <small>({{ item.name_Eng }})</small>
                  </td>
                  <td>{{ item.viewerIP }}</td>
                  <td>{{ dateFormat(item.dateViewed) }}</td>
                  <td>
                    <span
                      @click.prevent="handleDelete(item.id)"
                      style="cursor: pointer"
                      class="mx-2"
                    >
                      <i
                        class="fa-solid fa-circle-xmark"
                        style="color: #b80f0f; font-size: 22px"
                      ></i>
                    </span>
                  </td>
                </tr>
            </tbody>
          </table>
          <div class="my-5">
            <paginate
                :page-count="this.pageCount2"
                :page-range="3"
                :margin-pages="2"
                :click-handler="getPagination"
                :prev-text="'<'"
                :next-text="'>'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              >
              </paginate> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { viewservice } from "../../services/viewService";
import Paginate from "vuejs-paginate-next";
import moment from "moment";
import { useRouter } from "vue-router";
import {tokenservice} from "../../services/tokenService"

export default {
  setup() {
    const router  = useRouter();
    let views = ref({});
    let countsAll = ref({});
    let viewCounts = ref({});
    let pageCount1 = ref(0);
    let pageCount2 = ref(0);
    let keySearch = ref("");

    async function getCountView(){
      let res = await viewservice().GetViewAll(countsAll);
      if(res == 401){
        tokenservice().saveRoute.value = "admin-view-router"
        router.push({ name: "admin-login-router" });
      }
    }
    async function keyUpSearch() {
      if (keySearch.value.length > 0) {
        await getCountView();
        const rs = await this.countsAll.filter((item) =>
          item.title.toLowerCase().includes(keySearch.value.toLowerCase())
        );
        viewCounts.value.data = await rs;
      } else {
        await getCountPagination(viewCounts.value.currentPage);
      }
    }
    function dateFormat(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
    async function getCountPagination(currentPage){
      await viewservice().CountPagination(viewCounts,currentPage,pageCount1)
    }

    async function getPagination(currentPage){
      await viewservice().Pagination(views,currentPage,pageCount2)
    }
    async function handleDelete(id) {
        if(!confirm("Có chắc muốn xóa thông tin này không?")) return null;
      else{
        await viewservice().Delete(id);
        await getPagination(views.value.currentPage);
        
        alert("Xóa danh mục phim thành công")
      }
    }
    onMounted(async()=>{
        await getCountView();
        await getPagination(1);
        await getCountPagination(1);
        
    })

    return {
        views,
        viewCounts,
        pageCount2,
        pageCount1,
        keySearch,
        countsAll,
        getPagination,
        getCountPagination,
        dateFormat,
        handleDelete,
        keyUpSearch,
    };
  },
  components: {
    paginate: Paginate,
  },
};
</script>

<style>
</style>