<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Danh sách quốc gia</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm quốc gia
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
                <th>Tên quốc gia</th>
                <th>Slug</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in countries" :key="index">
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
import { countryservice } from "../../services/countryService";
import CompCreateModal from "../../components/admin/countries/compCreateModal.vue";
import CompEditModal from "../../components/admin/countries/compEditModal.vue";

export default {
  setup() {
    document.title = "Quốc gia phim";
    let keySearch = ref("");
    let countries = ref({});
    let country = ref({});
    let { isCreateAlert, isCreateError, isEditAlert, isEditError } = countryservice();
    let formCreate = reactive({
      name: "",
      description: "",
    });

    async function GetAll() {
      await countryservice().GetAll(countries);
    }
    async function getById(id) {
      await countryservice().GetById(id, country);
    }
    async function submitCreate() {
      await countryservice().Create(formCreate);
      formCreate.name = "";
      formCreate.description = "";
      await GetAll();
    }
    async function submitEdit(id) {
      await countryservice().Edit(id, this.country);
      await GetAll();
    }
    async function handleDelete(id) {
      if (!confirm("Có chắc muốn xóa quốc gia này không?")) return null;
      else {
        await countryservice().Delete(id);
        await GetAll();

        alert("Xóa quốc gia thành công");
      }
    }
    async function keyUpSearch() {
      if (keySearch.value.length > 0) {
        await GetAll();
        const rs = await this.countries.filter((item) =>
          item.name.toLowerCase().includes(keySearch.value.toLowerCase())
        );
        countries.value = await rs;
      } else {
        await GetAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await countryservice().ChangedStatus(id, countries);
      await GetAll();
    }
    onMounted(async () => {
      await GetAll();
    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("country", country);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    return {
      keySearch,
      countries,
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