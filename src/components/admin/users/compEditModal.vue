<template>
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div v-if="isEditAlert" class="alert alert-success">
          <h5 class="fw-bold">Thông báo!</h5>
          <p style="font-size: 14px">Cập nhật người dùng thành công</p>
        </div>
        <div class="alert alert-danger" v-if="isEditError">
          <h5 class="fw-bold">Lỗi!</h5>
          <p style="font-size: 14px">Cập nhật người dùng không thành công</p>
        </div>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Cập nhật người dùng
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="this.submitEdit(user.id)">
            <div class="modal-body">
              <div class="form-group">
                <label>Tên người dùng</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.name"
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="user.email"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div class="form-group">
                <label>Mật khẩu</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.password"
                  placeholder="Nhập mật khẩu"
                  required
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
              <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
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
      submitEdit: Function,
    },
    setup() {
      const user = inject("user");
      const isEditAlert  = inject('isEditAlert');
      const isEditError = inject('isEditError')
      return {
        user,
        isEditAlert,
        isEditError
      };
    },
  };
  </script>
  
  
  <style scoped>
  </style>
  