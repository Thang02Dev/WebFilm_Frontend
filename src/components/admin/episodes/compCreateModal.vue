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
        <p style="font-size: 14px">Thêm mới một tập phim thành công</p>
      </div>
      <div class="alert alert-danger" v-if="isCreateError">
        <h5 class="fw-bold">Thông báo!</h5>
        <p style="font-size: 14px">Thêm tập phim không thành công</p>
      </div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm tập phim</h5>
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
              <label>Tên phim cần thêm</label>
              <select v-model="form.movieId" name="" id="">
                <option value="">a</option>
                <option value="">b</option>
              </select>
            </div>
            <div class="form-group">
              <label>Thứ tự tập phim</label>
              <input v-model="form.episode_Number" type="number">
            </div>
            <div class="form-group">
              <label>Link tập phim</label>
              <input v-model="form.linkServerId" type="text" placeholder="Nhập link">
            </div>
            <div class="form-group">
              <label>Tên server link</label>
              <select v-model="form.linkServerId" name="" id="">
                <option value="">a</option>
                <option value="">b</option>
              </select>
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
  
<style scoped>
</style>
  
  
    
  