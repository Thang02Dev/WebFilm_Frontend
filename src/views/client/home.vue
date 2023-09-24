<template>
  <div class="main-content">
    <div class="container">
      <div class="movie-hot mt-4">
        <h2 class="text-hot">phim hot</h2>
      </div>
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide class="carousel__slide" v-for="item in hotMovies" :key="item.id">
          <router-link :to="{ name: 'client-detail-router',params:{slug:item.slug} }">
            <span v-if="item.episodeNew===item.episode_Number"  class="tag_carousel__slide">Full Vietsub</span>
            <span v-else-if="item.episodeNew!==item.episode_Number" class="tag_carousel__slide">Tập {{ item.episodeNew }} Vietsub</span>
          <span class="button_carousel_play"
            ><i class="fa-solid fa-play"></i
          ></span>
          <img
            class="carousel__item"
            :src="item.image"
            alt=""
          />
          <div class="carousel__title">
            <span class="text">{{ item.title }}</span>
          </div>
          </router-link>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div class="container mt-4">
      <div class="row">
        <div class="movie-new my-4 col-md-8">
          <div class="mb-2 box-text-all" style="display: flex">
            <div :class="{'active':isActive1}" class="box-text-1">
              <span @click.prevent="getNewMovies('phim-bo')" class="text-new-1"
                >Phim bộ mới cập nhật</span
              >
            </div>
            <div :class="{'active':isActive2}" class="box-text-2 ">
              <span @click.prevent="getNewMovies('phim-le')" class="text-new-2"
                >Phim lẻ mới cập nhật</span
              >
            </div>
          </div>
          <div class="list-iamge-movie mt-2">
            <router-link :to="{ name: 'client-detail-router',params:{slug:item.slug} }" v-for="item in newMovies" :key="item.id" class="box-movie">
              <span v-if="item.episodeNew===item.episode_Number" class="tag-víetsub">Full Vietsub</span>
              <span v-else-if="item.episodeNew!==item.episode_Number" class="tag-víetsub">Tập {{ item.episodeNew }} Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img class="image-movie" :src="item.image" alt="" />
              <div class="box-movie-title">{{ item.title }}</div>
            </router-link>
          </div>
          <div class="mt-4 mb-2" style="display: flex">
            <div class="box-text-1 active">
              <span class="text-new-1">phim chiếu rạp</span>
            </div>
          </div>
          <div class="list-iamge-movie mt-2">
            <router-link :to="{ name: 'client-detail-router',params:{slug:item.slug} }" v-for="item in cinemas" :key="item.id" class="box-movie">
              <span v-if="item.episodeNew===item.episode_Number" class="tag-víetsub">Full Vietsub</span>
              <span v-else-if="item.episodeNew!==item.episode_Number" class="tag-víetsub">Tập {{ item.episodeNew }} Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img
                class="image-movie"
                :src="item.image"
                alt=""
              />
              <div class="box-movie-title">{{ item.title }}</div>
            </router-link>
          </div>
          <div class="mt-4 mb-2" style="display: flex">
            <div class="box-text-1 active">
              <span class="text-new-1">phim hoạt hình</span>
            </div>
          </div>
          <div class="list-iamge-movie mt-2">
            <router-link :to="{ name: 'client-detail-router',params:{slug:item.slug} }" v-for="item in cartoons" :key="item.id" class="box-movie">
              <span v-if="item.episodeNew===item.episode_Number" class="tag-víetsub">Full Vietsub</span>
              <span v-else-if="item.episodeNew!==item.episode_Number" class="tag-víetsub">Tập {{ item.episodeNew }} Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img class="image-movie" :src="item.image" alt="" />
              <div class="box-movie-title">{{ item.title }}</div>
            </router-link>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";
import { ref, onMounted } from "vue";
import { movieservice } from "../../services/movieService";
export default {
  setup() {
    let newMovies = ref({});
    let cartoons = ref({});
    let cinemas = ref({});
    let isActive1 = ref(true);
    let isActive2 = ref(false);
    let hotMovies = ref({});

    async function getByHot() {
      await movieservice().GetByHot(hotMovies);
    }
    async function getCinemas() {
      await movieservice().GetByCategorySlug("phim-chieu-rap",cinemas);
    }
    async function getNewMovies(slug) {
      await movieservice().GetByCategorySlug(slug, newMovies);
      if(slug=='phim-bo'){
        isActive1.value=true;
        isActive2.value=false;
      }
      else{
        isActive1.value=false;
        isActive2.value=true;
      }
    }
    async function getCartoons() {
      await movieservice().GetByGenreSlug("hoat-hinh", cartoons);
    }

    onMounted(async () => {
      await getNewMovies("phim-bo");
      await getCartoons();
      await getCinemas();
      await getByHot();
    });
    return {
      isActive1,
      isActive2,
      newMovies,
      cartoons,
      cinemas,
      hotMovies,
      getNewMovies,
      getCartoons,
      getByHot,

      settings: {
        itemsToShow: 1,
        itemsToScroll: 5,
        snapAlign: "start",
        wrapAround: true,
        transition: 1000,
        autoplay: 9000,
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
    CompMoviesTrend,
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