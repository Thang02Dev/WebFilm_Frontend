<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Danh sách thể loại phim</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm thể loại phim
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
                <th>Tên thể loại</th>
                <th>Slug</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in genres" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.slug }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <span
                    @click.prevent="hanhdleChangedStatus(item.id)"
                    v-if="item.status"
                    class="badge badge-success button__status_true"
                    >Kích hoạt</span
                  >
                  <span
                    @click.prevent="hanhdleChangedStatus(item.id)"
                    v-else
                    class="badge badge-dark button__status_false"
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
                  <span
                    @click.prevent="handleDelete(item.id)"
                    style="cursor: pointer"
                    class="p-1"
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
  <comp-create-modal :submitCreate="submitCreate" />
  <comp-edit-modal :submitEdit="submitEdit" />
</template>

<script>
import { ref, onMounted, reactive, provide } from "vue";
import { genreservice } from "../../services/genreService";
import CompCreateModal from "../../components/admin/genres/compCreateModal.vue";
import CompEditModal from "../../components/admin/genres/compEditModal.vue";
export default {
  setup() {
    let keySearch = ref("");
    let genres = ref({});
    let genre = ref({});
    let { isCreateAlert, isCreateError, isEditAlert, isEditError } = genreservice();
    let formCreate = reactive({
      name: "",
      description: "",
    });
    async function GetAll() {
      await genreservice().GetAll(genres);
    }
    async function getById(id) {
      await genreservice().GetById(id, genre);
    }
    async function submitCreate() {
      await genreservice().Create(formCreate);
      formCreate.name = "";
      formCreate.description = "";
      await GetAll();
    }
    async function submitEdit(id) {
      await genreservice().Edit(id, this.genre);
      await GetAll();
    }
    async function handleDelete(id) {
      if (!confirm("Có chắc muốn xóa thể loại này không?")) return null;
      else {
        await genreservice().Delete(id);
        await GetAll();

        alert("Xóa thể loại thành công");
      }
    }
    async function keyUpSearch() {
      if (keySearch.value.length > 0) {
        await GetAll();
        const rs = await this.genres.filter((item) =>
          item.name.toLowerCase().includes(keySearch.value.toLowerCase())
        );
        genres.value = await rs;
      } else {
        await GetAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await genreservice().ChangedStatus(id, genres);
      await GetAll();
    }
    onMounted(async () => {
      await GetAll();
    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("genre", genre);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    return {
      keySearch,
      genres,
      getById,
      handleDelete,
      hanhdleChangedStatus,
      keyUpSearch,
      submitCreate,
      submitEdit,
    };
  },
  components: {
    CompCreateModal,
    CompEditModal,
  },
};
</script>

<style>
</style>