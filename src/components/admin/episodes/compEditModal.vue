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
        <p style="font-size: 14px">Cập nhật tập phim thành công</p>
      </div>
      <div class="alert alert-danger" v-if="isEditError">
        <h5 class="fw-bold">Lỗi!</h5>
        <p style="font-size: 14px">Cập nhật tập phim không thành công</p>
      </div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Cập nhật tập phim
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="this.submitEdit(episode.id)">
          <div class="modal-body">
            <div class="form-group">
              <label class="fw-bold">Tên phim cần thêm</label>
              <select
                disabled
                v-model="episode.movieId"
                required
                class="form-control"
                style="color: black"
              >
                <option
                  v-for="(item, index) in movies"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.title }}
                </option>
              </select>
              <small v-if="episode.movieId !== null"
                >Id của phim: {{ episode.movieId }}</small
              >
            </div>
            <div class="form-group">
              <label class="fw-bold">Link tập phim</label>
              <input
                v-model="episode.link"
                required
                class="form-control"
                type="text"
              />
            </div>
            <div class="form-group">
              <label class="fw-bold">Thứ tự tập phim</label>
              <input
                v-model="episode.episode_Number"
                required
                class="form-control"
                type="number"
              />
            </div>
            <div class="form-group">
              <label class="fw-bold">Link tập phim</label>
              <input
                v-model="episode.link"
                required
                class="form-control"
                type="text"
                placeholder="Nhập link"
              />
            </div>
            <div class="form-group">
              <label class="fw-bold">Tên server link</label>
              <select
                v-model="episode.linkServerId"
                required
                class="form-control"
                style="color: black"
                name=""
                id=""
              >
                <option
                  v-for="(item, index) in servers"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
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
    const episode = inject("episode");
    const servers = inject("servers");
    const movies = inject("movies");
    const isEditAlert = inject("isEditAlert");
    const isEditError = inject("isEditError");
    return {
      episode,
      servers,
      movies,
      isEditAlert,
      isEditError,
    };
  },
};
</script>
  
  
  <style scoped>
</style>
  