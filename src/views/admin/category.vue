<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        
        <h4 class="card-title">Danh sách danh mục phim</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm danh mục phim
            </button>
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
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Vị trí</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in categories" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.slug }}</td>
                <td>{{ item.position }}</td>
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
import {categoryservice} from "../../services/categoryService";
import CompCreateModal from "../../components/admin/categories/compCreateModal.vue";
import CompEditModal from "../../components/admin/categories/compEditModal.vue";

export default {
  setup() {
    document.title = "Danh mục phm";
    let {isCreateAlert,isCreateError,isEditAlert,isEditError} = categoryservice();
    
    let categories = ref({});
    let formCreate = reactive({
      name: "",
      position:null,
      description: "",
    });
    let category = ref({});
    let keySearch = ref("");

    async function getAll() {
      await categoryservice().GetAll(categories);
    }
    async function submitCreate() {
      await categoryservice().Create(formCreate);
      formCreate.name = "";
      formCreate.description = "";
      await getAll();
    }
    async function getById(id) {
      await categoryservice().GetById(id,category);
    }
    async function handleDelete(id) {
      if(!confirm("Có chắc muốn xóa danh mục này không?")) return null;
      else{
        await categoryservice().Delete(id);
        await getAll();
        
        alert("Xóa danh mục phim thành công")
      }
    }
    async function submitEdit(id) {
      await categoryservice().Edit(id,this.category);
      await getAll();
    }
    async function keyUpSearch() {
      if(keySearch.value.length>0){
          await getAll();
          const rs = await this.categories.filter(item => item.name.toLowerCase().includes(keySearch.value.toLowerCase()));
          categories.value = await rs
      }
      else{
        await getAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await categoryservice().ChangedStatus(id,categories);
      await getAll();
    }

    onMounted(async () => {
      await getAll();
      
    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("category", category);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    return {
      //var
      categories,
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