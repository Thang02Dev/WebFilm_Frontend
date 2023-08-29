<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        
        <h4 class="card-title">Danh sách server phim</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm server phim
            </button>
            <div class="d-flex justify-content-end align-items-center">
              <i class="icon-search text-dark mx-2"></i>
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
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên server</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in servers" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <span
                    @click.prevent="hanhdleChangedStatus(item.id)"
                    v-if="item.status"
                    class="badge badge-success button__status_true"
                    >Kích hoạt</span
                  >
                  <span @click.prevent="hanhdleChangedStatus(item.id)" v-else class="badge badge-dark button__status_false"
                    >Tạm ẩn</span
                  >
                </td>
                <td class="d-flex justify-content-around">
                  <span
                    @click.prevent="getById(item.id)"
                    style="cursor: pointer"
                    class="p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    <i
                      class="fa-solid fa-pen-to-square"
                      style="color: #050000; font-size: 22px"
                    ></i>
                  </span>
                  <span @click.prevent="handleDelete(item.id)" style="cursor: pointer" class="p-1"
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
        </div>
      </div>
    </div>
  </div>
  <comp-create-modal
    :submitCreate="submitCreate"
  />
  <comp-edit-modal :submitEdit="submitEdit"/>
</template>

<script>
import { ref, onMounted, reactive, provide } from "vue";
import {serverservice} from "../../services/serverService";
import CompCreateModal from "../../components/admin/linkservers/compCreateModal.vue";
import CompEditModal from "../../components/admin/linkservers/compEditModal.vue";

export default {
  setup() {
    let {isCreateAlert,isCreateError,isEditAlert,isEditError} = serverservice();
    
    let servers = ref({});
    let formCreate = reactive({
      name: "",
      description: "",
    });
    let server = ref({});
    let keySearch = ref("");

    async function GetAll() {
      await serverservice().GetAll(servers);
    }
    async function submitCreate() {
      await serverservice().Create(formCreate);
      formCreate.name = "";
      formCreate.description = "";
      await GetAll();
    }
    async function getById(id) {
      await serverservice().GetById(id,server);
    }
    async function handleDelete(id) {
      if(!confirm("Có chắc muốn xóa server này không?")) return null;
      else{
        await serverservice().Delete(id);
        await GetAll();
        
        alert("Xóa server phim thành công")
      }
    }
    async function submitEdit(id) {
      await serverservice().Edit(id,this.server);
      await GetAll();
    }
    async function keyUpSearch() {
      if(keySearch.value.length>0){
          await GetAll();
          const rs = await this.servers.filter(item => item.name.toLowerCase().includes(keySearch.value.toLowerCase()));
          servers.value = await rs
      }
      else{
        await GetAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await serverservice().ChangedStatus(id,servers);
      await GetAll();
    }

    onMounted(async () => {
      await GetAll();
      
    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("server", server);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    return {
      //var
      servers,
      keySearch,
      //func
      submitCreate,
      handleDelete,
      getById,
      submitEdit,
      keyUpSearch,
      hanhdleChangedStatus,
    };
  },
  components: {
    CompCreateModal,
    CompEditModal,
  },
};
</script>

<style scoped>

</style>