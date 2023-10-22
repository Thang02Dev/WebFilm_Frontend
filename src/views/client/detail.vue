<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text">mọt phim / </span>
        <span class="mx-2 nav-page-text">{{ movie.countryName }} /</span>
        <span class="nav-page-text" style="color: rgb(177, 177, 177)">{{
          movie.title
        }}</span>
      </div>
      <div class="row m-0 mt-3">
        <div style="background-color: #181818" class="col-md-8">
          <div class="row mt-3">
            <div class="box-image-movie-info col-md-6">
              <div class="poi-image-info">
                <img class="image" :src="movie.image" alt="" />
                <div class="box-play">
                  <button @click.prevent="watchingMovie">Xem phim</button>
                </div>
              </div>
            </div>
            <div class="col-md-6 px-2">
              <div class="title-movie-info">
                <span class="name-vn">{{ movie.title }}</span>
                <br />
                <small class="name-eng"
                  >{{ movie.name_Eng }} ({{ movie.year_Release }})</small
                >
              </div>
              <div class="detail-info mt-2">
                <div class="text-detail-info">
                  Trạng thái:
                  <span v-if="movie.episode_Number===1" class="text">Tập Full Vietsub</span>
                  <span v-else class="text">{{ movie.episodeStatus }}</span>
                </div>
                <div class="text-detail-info">
                  Đạo diễn: <span class="text">{{ movie.director }}</span>
                </div>
                <div class="text-detail-info">
                  Thời lượng:
                  <span class="text"
                    >{{ movie.duration_Minutes }} phút / tập</span
                  >
                </div>
                <div class="text-detail-info">
                  Số tập:
                  <span class="text">{{ movie.episode_Number }} tập</span>
                </div>
                <div class="text-detail-info">
                  Tình trạng: <span class="text">{{ movie.condition }}</span>
                </div>
                <div class="text-detail-info">
                  Ngôn ngữ: <span class="text">Phụ đề Việt</span>
                </div>
                <div class="text-detail-info">
                  Năm sản xuất:
                  <span class="text">{{ movie.year_Release }}</span>
                </div>
                <div class="text-detail-info">
                  Quốc gia: <span class="text">{{ movie.countryName }}</span>
                </div>
                <div class="text-detail-info">
                  Diễn viên:
                  <span class="text" style="line-height: 20px">{{
                    movie.performer
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="list-episode mt-2">
            <span class="text">tập mới nhất: </span>
            <button v-if="movie.episode_Number===1"  class="btn-episode">Tập Full</button>
            <button v-else class="btn-episode">Tập {{ movie.episodeNew }}</button>
          </div>
          <div class="description mt-3">
            <span class="text-1">nội dung phim</span>
            <br />
            <br />
            <p class="text-2">
              Vân Chi Vũ là câu chuyện của thích khách mong muốn tự do Vũ Vị Sam
              (Ngu Thư Hân thủ vai) phải thâm nhập hoàng cung hoàn thành nhiệm
              vụ. Trong chốn cung cấm đầy hiểm nguy, cô gặp tình yêu, tình bạn,
              tìm kiếm bản thân, kiên định hướng đi, và trưởng thành cùng với Tử
              Vũ - chàng điện hạ ương bướng (Trương Lăng Hách thủ vai).
            </p>
          </div>
          <div v-if="movie.tags != ''" class="tags mt-3">
            <span class="tag-text">Tags</span>
            <button v-for="item in arrayTags" :key="item" class="tag-button">
              {{ item }}
            </button>
          </div>
          <div class="mt-3">
            <div
              class="fb-comments"
              :data-href="url_comment + slug"
              data-width="100%"
              data-numposts="10"
            ></div>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>
    
<script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";
import { ref, onMounted } from "vue";
import { movieservice } from "../../services/movieService";
import { useRoute,useRouter } from "vue-router";
import { viewservice } from "../../services/viewService";

export default {
  setup() {
    let route = useRoute();
    let router = useRouter();
    let movieBySlug = ref({});
    let movie = ref({});
    let arrayTags = ref([]);
    let slug = route.params.slug;
    let url_comment = import.meta.env.VITE_APP_URL_COMMENT_FB;

    async function getMovie() {
      await movieservice().GetById(movieBySlug.value.id, movie);
      arrayTags.value = movie.value.tags.split(", ");
    }

    async function getBySlug() {
      await movieservice().GetBySlug(route.params.slug, movieBySlug);
    }
    async function watchingMovie() {
      router.push({name:"client-watch-router",params:{slug:slug,episode:1}});
      await viewservice().CreatedView(movie.value.id);
    }
    onMounted(async () => {
      await getBySlug();
      await getMovie();
      FB.XFBML.parse();
    });
    return {
      movie,
      arrayTags,
      slug,
      url_comment,
      watchingMovie,
    };
  },
  components: {
    CompMoviesTrend,
  },
};
</script>
    
    <style>
</style>