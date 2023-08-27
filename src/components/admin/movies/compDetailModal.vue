<template>
  <div
    class="modal fade"
    id="detailModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thông tin chi tiết phim</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="fw-bold">Ảnh phim</label>
              <p class="text-center">
                <img :src="movie.image" style="width: 30%;" alt="ảnh">
              </p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Link trailer</label>
              <p>{{movie.trailer}}</p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Tên phim</label>
              <p>{{movie.title}}</p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Tên gốc</label>
              <p>{{movie.name_Eng}}</p>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label class="fw-bold">Tổng số tập</label>
                <p>{{movie.episode_Number}}</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Thời lượng phim</label>
                <p>{{movie.duration_Minutes}} phút</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Năm phát hành</label>
                <p>{{movie.year_Release}}</p>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label class="fw-bold">Quốc gia phim</label>
                <p>{{movie.countryName}}</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Chất lượng phim</label>
                <p v-if="movie.resolution === 0 ">Trailer</p>
                <p v-if="movie.resolution === 1 ">Cam</p>
                <p v-if="movie.resolution === 2 ">SD</p>
                <p v-if="movie.resolution === 3 ">HD</p>
                <p v-if="movie.resolution === 4 ">FullHD</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Phụ đề/Thuyết minh</label>
                <p v-if="movie.subtitle">Phụ đề</p>
                <p v-else>Thuyết minh</p>
              </div>
            </div>
            <div class="form-group">
              <label class="fw-bold">Tag</label>
              <p>{{movie.tags}}</p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Danh mục phim</label>
              <p>{{movie.categoryName}}</p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Thể loại phim</label>
              <p v-if="movie.genreName">{{movie.genreName.join(", ")}}</p>
            </div>
            <div class="form-group">
              <label class="fw-bold">Mô tả phim</label>
              <p>{{movie.description}}</p>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label class="fw-bold">Vị tí</label>
                <p>{{movie.position}}</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Phim hot</label>
                <p v-if="movie.hot">Có</p>
                <p v-else>Không</p>
              </div>
              <div class="form-group col-4">
                <label class="fw-bold">Phim xem nhiều</label>
                <p v-if="movie.top_View">Có</p>
                <p v-else>Không</p>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-6">
                <label class="fw-bold">Thời gian tạo</label>
                <p>{{ formattedDateTime(movie.created_Date) }}</p>
              </div>
              <div class="form-group col-6">
                <label class="fw-bold">Thời gian sửa mới nhất</label>
                <p>{{ formattedDateTime(movie.updated_Date) }}</p>
              </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import moment from 'moment';
export default {
  setup(){
    const movie = inject("movie");
    function formattedDateTime(value) {
      if(value===null) return "";
      const dateTime = moment(value);
      return dateTime.format('DD/MM/YYYY HH:mm:ss');
    }
    return{
      movie,
      formattedDateTime,
    }
  }
};
</script>

<style>
</style>