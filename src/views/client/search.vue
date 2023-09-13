<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          >mọt phim / <span style="color:rgb(177, 177, 177)">kết quả tìm kiếm "van"</span></span
        >
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="list-iamge-movie mt-2">
            <div v-for="index in 24" :key="index" class="box-movie">
              <span class="tag-víetsub">Tập 10 Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img
                class="image-movie"
                src="https://i.mpcdn.top/c/wG3aPK4/van-chi-vu.jpg?1694085506"
                alt=""
              />
              <div class="box-movie-title">Vân Chi Vũ</div>
            </div>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>
  
  <script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";

export default {
  components: {
    CompMoviesTrend,
  },
};
</script>
  
  <style>
</style>