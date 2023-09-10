<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav">
        <span class="nav-text"
          >mọt phim / <span style="color: gray">phim bộ</span></span
        >
      </div>
      <div class="category-filter">
        <select class="input-filter" name="" id="">
          <option selected value="">-- Sắp xếp --</option>
        </select>
        <select class="input-filter" name="" id="">
          <option selected value="">-- Thể loại --</option>
        </select>
        <select class="input-filter" name="" id="">
          <option selected value="">-- Quốc gia --</option>
        </select>
        <select class="input-filter" name="" id="">
          <option selected value="">-- Năm --</option>
        </select>
        <button class="button-filter" type="button">Lọc phim</button>
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
        <comp-movies-trend/>
      </div>
    </div>
  </div>
</template>

<script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue"

export default {
  components: {
    CompMoviesTrend,
  },
};
</script>

<style>
</style>