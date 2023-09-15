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
        <select v-model="filter.order" class="input-filter" name="" id="">
          <option selected value="0">-- Sắp xếp --</option>
          <option value="1">Ngày đăng phim</option>
          <option value="2">Năm sản xuất</option>
          <option value="3">Tên phim</option>
          <option value="4">Lượt xem</option>
        </select>
        <select v-model="filter.genreId" class="input-filter" name="" id="">
          <option selected value="0">-- Thể loại --</option>
          <option v-for="item in genres" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <select v-model="filter.countryId" class="input-filter" name="" id="">
          <option selected value="0">-- Quốc gia --</option>
          <option v-for="item in countries" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
        <select v-model="filter.year" class="input-filter" name="" id="">
          <option selected value="0">-- Năm --</option>
          <option v-for="item in yearList" :key="item" :value="item">{{ item }}</option>
        </select>
        <button @click.prevent="handleFilter(filter.order,filter.genreId,filter.countryId,filter.year,1)" class="button-filter" type="button">Lọc phim</button>
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
          <div class="box-pagin my-3">
            <paginate   
              v-if="paginShow"
              :page-count="this.pageCount"
              :page-range="3"
              :margin-pages="2"
              :click-handler="getMovies"
              :prev-text="'Trước'"
              :next-text="'Sau'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate>
            <paginate   
              v-else
              :page-count="this.pageCounFilter"
              :page-range="3"
              :margin-pages="2"
              :click-handler="handleFilter"
              :prev-text="'<'"
              :next-text="'>'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate>
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
import { countryservice } from "../../services/countryService";
import { genreservice } from "../../services/genreService";
import { movieservice } from "../../services/movieService";
import Paginate from "vuejs-paginate-next";

export default {
  setup(){
    
    let route = useRoute();
    let cateName = ref("");
    let cateId = ref(null);
    let cateBySlug = ref({});
    let movies = ref({});
    let pageCount = ref(0);
    let pageCounFilter = ref(0);
    let genres = ref({});
    let countries = ref({});
    let filter = ref({
      order:0,
      genreId:0,
      countryId:0,
      year:0,
    })
    let paginShow =ref(true);

    async function getCountries() {
      await countryservice().GetByStatus(countries);
    }
    async function getCategories() {
      await genreservice().GetByStatus(genres);
    }
    async function getMovies(currentPage) {
      await categoryservice().GetBySlug(route.params.slug,cateBySlug);
      cateId.value = cateBySlug.value.id;
      await movieservice().PaginationByCate(cateId.value,movies,currentPage,pageCount)
    }
    async function getCateName() {
      await categoryservice().GetBySlug(route.params.slug,cateBySlug);
      cateName.value = cateBySlug.value.name;
    }
    async function handleFilter(order, genreid, countryid, year,currentPage) {
      await movieservice().PaginFilter(cateId.value,order, genreid, countryid, year,movies,currentPage,pageCounFilter);
      if(order == 0 && genreid == 0 && countryid == 0 && year == 0) paginShow.value = true;
      else if(order != 0 || genreid != 0 || countryid != 0 || year != 0){
        paginShow.value =false;
      }
      console.log(paginShow.value)
      console.log(order)
      console.log(genreid)
      console.log(countryid)
      console.log(year)
    }
    watch(() => route.params.slug, async (newSlug, oldSlug) => {
      if (newSlug !== oldSlug && route.params.slug!==undefined) {
        await getMovies(1);
        await getCateName();       
      }
    });
    onMounted(async () =>{
      await getMovies(1);
      await getCateName();
      await getCategories();
      await getCountries();
    })
    return{
      movies,
      cateName,
      pageCount,
      genres,
      countries,
      filter,
      pageCounFilter,
      paginShow,
      getMovies,
      handleFilter,
    }
  },

  components: {
    CompMoviesTrend,
    paginate: Paginate,
  },
  computed: {
    yearList() {
      const currentYear = new Date().getFullYear();
      const startYear = 2013;
      const years = [];
      for (let year = startYear; year <= currentYear; year++) {
        years.push(year);
      }
      return years.sort((a, b) => b - a);
    },
  },
};
</script>

<style>
</style>