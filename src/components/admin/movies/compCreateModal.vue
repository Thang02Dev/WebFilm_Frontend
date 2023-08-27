<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div v-if="isCreateAlert" class="alert alert-success">
        <h5 class="fw-bold">Thông báo!</h5>
        <p style="font-size: 14px">Thêm mới một phim thành công</p>
      </div>
      <div class="alert alert-danger" v-if="isCreateError">
        <h5 class="fw-bold">Thông báo!</h5>
        <p style="font-size: 14px">Thêm phim không thành công</p>
        <p style="font-size: 14px">Tên đã tồn tại</p>
      </div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalScrollableTitle">
            Thêm phim
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="this.submitCreate">
            <div class="form-group">
              <label>Ảnh <span class="text-danger">*</span></label>
              <input
                required
                v-model="form.image"
                type="text"
                class="form-control"
                placeholder="Nhập link ảnh"
              />
            </div>
            <div class="form-group">
              <label>Trailer</label>
              <input
                v-model="form.trailer"
                type="text"
                class="form-control"
                placeholder="Nhập link trailer"
              />
            </div>
            <div class="form-group">
              <label>Tên phim <span class="text-danger">*</span></label>
              <input
                required
                v-model="form.title"
                type="text"
                class="form-control"
                placeholder="Nhập tên phim"
              />
            </div>
            <div class="form-group">
              <label>Tên gốc <span class="text-danger">*</span></label>
              <input
                required
                v-model="form.name_Eng"
                type="text"
                class="form-control"
                placeholder="Nhập tên gốc"
              />
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label>Tổng số tập <span class="text-danger">*</span></label>
                <input
                  required
                  v-model="form.episode_Number"
                  type="number"
                  class="form-control"
                />
              </div>
              <div class="form-group col-4">
                <label>Thời lượng (phút) <span class="text-danger">*</span></label>
                <input
                  required
                  v-model="form.duration_Minutes"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group col-4">
                <label>Năm phát hành <span class="text-danger">*</span></label>
                <input
                  required
                  v-model="form.year_Release"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label>Quốc gia <span class="text-danger">*</span></label>
                <br />
                <div>
                  <select required v-model="form.countryId" class="form-control text-dark">
                    <option
                      v-for="(item, index) in countries"
                      :key="index"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group col-4">
                <label>Chất lượng phim <span class="text-danger">*</span></label>
                <br />
                <div>
                  <select required v-model="form.resolution" class="form-control text-dark">
                    <option value="0">Trailer</option>
                    <option value="1">Cam</option>
                    <option value="2">SD</option>
                    <option selected value="3">HD</option>
                    <option value="4">FullHD</option>
                  </select>
                </div>
              </div>
              <div class="form-group col-4">
                <label>Sub/Thuyết minh<span class="text-danger">*</span></label>
                <br />
                <div>
                  <select required v-model="form.subtitle" class="form-control text-dark">
                    <option value="false">Thuyết minh</option>
                    <option value="true">Phụ đề</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Tag</label>
              <input
                v-model="form.tags"
                type="text"
                class="form-control"
                placeholder="Nhập tag"
              />
            </div>
            <div class="form-group">
              <label>Danh mục <span class="text-danger">*</span></label>
              <br />
              <select required v-model="form.categoryId" class="form-control text-dark">
                <option
                  v-for="(item, index) in categories"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Thể loại <span class="text-danger">*</span></label>
              <br />
              <div>
                <span v-for="(item, index) in genres" :key="index" class="mx-1">
                  <input
                    v-model="form.genreId"
                    type="checkbox"
                    :value="item.id"
                  />
                  <span style="font-size: 12px">{{ item.name }}</span>
                </span>
              </div>
            </div>
            <div class="form-group">
              <label>Mô tả <span class="text-danger">*</span></label>
              <textarea
                required
                v-model="form.description"
                placeholder="Nhập mô tả"
                class="form-control"
                style="height: 200px"
              ></textarea>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label>Vị trí <span class="text-danger">*</span></label>
                <input
                  required
                  v-model="form.position"
                  type="number"
                  class="form-control"
                  placeholder="Nhập vị trí"
                />
              </div>
              <div class="form-group col-4">
                <label>Hot <span class="text-danger">*</span></label>
                <br />
                <select required v-model="form.hot" class="form-control text-dark" name="" id="">
                  <option value="false">không</option>
                  <option value="true">có</option>
                </select>
              </div>
              <div class="form-group col-4">
                <label>Xem nhiều <span class="text-danger">*</span></label>
                <br />
                <select required v-model="form.top_View"  class="form-control text-dark" name="" id="">
                  <option value="false">không</option>
                  <option value="true">có</option>
                </select>
              </div>
            </div>
            <div style="float: right">
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
        <div class="modal-footer"></div>
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
    const genres = inject("genres");
    const categories = inject("categories");
    const countries = inject("countries");

    return {
      form,
      isCreateAlert,
      isCreateError,
      genres,
      categories,
      countries,
    };
  },
};
</script>
    
    <style>
</style>
  