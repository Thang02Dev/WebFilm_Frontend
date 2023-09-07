<template>
  <div class="main-content">
    <div class="container">
      <div class="movie-hot mt-4">
        <h2 class="text-hot">phim hot</h2>
      </div>
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide class="carousel__slide" v-for="slide in 10" :key="slide">
          <img
            class="carousel__item"
            src="https://i.mpcdn.top/c/wG3aPK4/van-chi-vu.jpg?1694085506"
            alt=""
          />
          <div class="carousel__title">
            <span class="text">Vân Chi Vũ</span>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div class="container mt-4">
      <div class="row">
        <div class="movie-new my-4 col-md-8">
          <div style="display: flex">
            <div class="box-text-1 active">
              <span class="text-new-1">phim bộ mới cập nhật</span>
            </div>
            <div class="box-text-2">
              <span class="text-new-2">Phim lẻ mới cập nhật</span>
            </div>
          </div>
          <div class="list-iamge-movie mt-2">
            <div v-for="index in 20" :key="index" class="box-movie">
                <img
                  class="image-movie"
                  src="https://i.mpcdn.top/c/wG3aPK4/van-chi-vu.jpg?1694085506"
                  alt=""
                />  
                <div class="box-movie-title">Vân Chi Vũ</div>      
            </div>
          </div>
        </div>
        <div class="movie-trend my-4 col-md-4">
          <span class="text-trend">trending</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ref } from "vue";
export default {
  setup() {
    return {
      settings: {
        itemsToShow: 1,
        itemsToScroll: 5,
        snapAlign: "start",
        wrapAround: true,
        transition: 1000,
        autoplay: 6000,
      },
      breakpoints: {
        300: {
          itemsToShow: 2,
          itemsToScroll: 2,
          snapAlign: "start",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>

<style>
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: white;
  opacity: 0.4;
  background-color: black;
  padding: 20px 5px;
}
.carousel__next:hover {
  color: rgb(251, 251, 251);
  opacity: 0.6;
}
.carousel__prev:hover {
  color: rgb(251, 251, 251);
  opacity: 0.6;
}
</style>