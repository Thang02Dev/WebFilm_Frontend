<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Danh sách người dùng</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm người dùng
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
                <th>Email</th>
                <th>Họ Tên</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in users" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.name }}</td>
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
                <td>{{ formattedDateTime(item.createdAt) }}</td>
                <td>{{ formattedDateTime(item.updatedAt) }}</td>
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
import { userservice } from "../../services/userService";
import moment from "moment";
import CompCreateModal from "../../components/admin/users/compCreateModal.vue";
import CompEditModal from "../../components/admin/users/compEditModal.vue";

export default {
  setup() {
    document.title = "Người dùng";
    let keySearch = ref("");
    let users = ref({});
    let user = ref({});
    let { isCreateAlert, isCreateError, isEditAlert, isEditError } =
      userservice();
    let formCreate = reactive({
      name: "",
      email: "",
      password: "",
    });

    

    function formattedDateTime(value) {
      if (value === null) return "";
      const dateTime = moment(value);
      return dateTime.format("DD/MM/YYYY HH:mm:ss");
    }
    async function getAll() {
      await userservice().GetAll(users);
    }
    async function getById(id) {
      await userservice().GetById(id, user);
    }
    async function submitCreate() {
      await userservice().Create(formCreate);
      formCreate.name = "";
      formCreate.email = "";
      formCreate.password = "";
      await getAll();
    }
    async function submitEdit(id) {
      if (!confirm("Có chắc muốn cập nhật lại thông tin không?")) return null;
      else {
      await userservice().Edit(id, this.user);
      await getAll();
      }
    }
    async function handleDelete(id) {
      if (!confirm("Có chắc muốn xóa người dùng này không?")) return null;
      else {
        await userservice().Delete(id);
        await getAll();

        alert("Xóa người dùng thành công");
      }
    }
    async function keyUpSearch() {
      if(keySearch.value.length>0){
          await getAll();
          const rs =  this.users.filter(item => item.name.toLowerCase().includes(keySearch.value.toLowerCase())
                                                || item.email.toLowerCase().includes(keySearch.value.toLowerCase()));
          users.value =  rs
      }
      else{
        await getAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await userservice().ChangedStatus(id,users);
      await getAll();
    }

    onMounted(async () => {
      await getAll();
    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("user", user);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    return {
      keySearch,
      users,
      formattedDateTime,
      handleDelete,
      submitCreate,
      submitEdit,
      getById,
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
<style>
</style>