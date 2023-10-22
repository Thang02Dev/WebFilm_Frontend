<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Thông tin lượt xem</h4>
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
                :page-count="this.pageCount"
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
export default {
  setup() {
    let views = ref({});
    let pageCount = ref(0);

    function dateFormat(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }

    async function getPagination(currentPage){
      await viewservice().Pagination(views,currentPage,pageCount)
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
        await getPagination(1);
    })

    return {
        views,
        pageCount,
        getPagination,
        dateFormat,
        handleDelete,
    };
  },
  components: {
    paginate: Paginate,
  },
};
</script>

<style>
</style>