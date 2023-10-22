<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="isCreateAlert" class="alert alert-success">
        <h5 class="fw-bold">Thông báo!</h5>
        <p style="font-size: 14px">Thêm mới một người dùng thành công</p>
      </div>
      <div class="alert alert-danger" v-if="isCreateError">
        <h5 class="fw-bold">Thông báo!</h5>
        <p style="font-size: 14px">Thêm người dùng không thành công</p>
        <p style="font-size: 14px">Tên người dùng đã tồn tại</p>
      </div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm người dùng</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="this.submitCreate">
          <div class="modal-body">
            <div class="form-group">
              <label>Tên người dùng</label>
              <input
                required
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                required
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="Nhập email"
              />
            </div>
            <div class="form-group">
              <label>Mật khẩu</label>
              <input
                required
                v-model="form.password"
                type="text"
                class="form-control"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Thêm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { inject } from "vue";
export default {
  props: {
    submitCreate: Function,
  },
  setup() {
    const form = inject("formCreate");
    const isCreateAlert = inject("isCreateAlert");
    const isCreateError = inject("isCreateError");
    return {
      form,
      isCreateAlert,
      isCreateError,
    };
  },
};
</script>
  
  <style>
</style>