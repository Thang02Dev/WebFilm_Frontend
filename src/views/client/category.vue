<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          >mọt phim / </span
        >
        <span class="nav-page-text mx-2" style="color: rgb(177, 177, 177)">{{ cateName }}</span>
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
            <div v-for="item in movies.movieViewModels" :key="item.id" class="box-movie">
              <span class="tag-víetsub">Tập 10 Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img
                class="image-movie"
                :src="item.image"
                alt=""
              />
              <div class="box-movie-title">{{ item.title }}</div>
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
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from "vue";
import { categoryservice } from "../../services/categoryService";
import { movieservice } from "../../services/movieService";
export default {
  setup(){
    
    let route = useRoute();
    let cateName = ref("");
    let cateId = ref(null);
    let categories = ref({});
    let movies = ref({});
    let pageCount = ref(0);

    async function getMovies(currentPage) {
      await categoryservice().GetBySlug(route.params.slug,categories);
      cateId.value = categories.value.id;
      await movieservice().PaginationByCate(cateId.value,movies,currentPage,pageCount)
    }
    async function getCateName() {
      await categoryservice().GetBySlug(route.params.slug,categories);
      cateName.value = categories.value.name;
    }
    watch(() => route.params.slug, async (newSlug, oldSlug) => {
      if (newSlug !== oldSlug && route.params.slug!==undefined) {
        await getCateName();
        await getMovies(1);
      }
      
    });
    onMounted(async () =>{
      await getMovies(1);
      await getCateName();
    })
    return{
      movies,
      cateName,
    }
  },

  components: {
    CompMoviesTrend,
  },
};
</script>

<style>
</style>