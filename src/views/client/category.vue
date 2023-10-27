<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text">mọt phim / </span>
        <span class="nav-page-text mx-2" style="color: rgb(177, 177, 177)">{{
          nameNav
        }}</span>
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
          <option v-for="item in countries" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <select v-model="filter.year" class="input-filter" name="" id="">
          <option selected value="0">-- Năm --</option>
          <option v-for="item in yearList" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <button
          @click.prevent="
            handleFilter(
              filter.order,
              filter.genreId,
              filter.countryId,
              filter.year,
              1
            )
          "
          class="button-filter"
          type="button"
        >
          Lọc phim
        </button>
      </div>
      <div class="row">
        <div class="col-md-8" >
          <div class="list-iamge-movie mt-2">
            <router-link
              :to="{
                name: 'client-detail-router',
                params: { slug: item.slug },
              }"
              v-for="item in movies.movieViewModels"
              :key="item.id"
              class="box-movie"
            >
            <span v-if="item.episodeNew===item.episode_Number" class="tag-víetsub">Full Vietsub</span>
              <span v-else-if="item.episodeNew!==item.episode_Number" class="tag-víetsub">Tập {{ item.episodeNew }} Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img class="image-movie" :src="item.image" alt="" />
              <div class="box-movie-title">{{ item.title }}</div>
            </router-link>
          </div>
          <div class="box-pagin my-3">
            <paginate
              v-if="paginShow && movieCount>24"
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
              v-else-if="!paginShow && movieCount>24"
              :page-count="this.pageCounFilter"
              :page-range="3"
              :margin-pages="2"
              :click-handler="handleFilter"
              :prev-text="'Trước'"
              :next-text="'Sau'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>

<script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { categoryservice } from "../../services/categoryService";
import { countryservice } from "../../services/countryService";
import { genreservice } from "../../services/genreService";
import { movieservice } from "../../services/movieService";
import Paginate from "vuejs-paginate-next";

export default {
  setup() {
    let route = useRoute();
    let nameNav = ref("");
    let cateId = ref(null);
    let genreId = ref(null);
    let countryId = ref(null);
    let year = ref(null);
    let cateBySlug = ref({});
    let genreBySlug = ref({});
    let countryBySlug = ref({});
    let movies = ref({});
    let pageCount = ref(0);
    let pageCounFilter = ref(0);
    let genres = ref({});
    let countries = ref({});
    let filter = ref({
      order: 0,
      genreId: 0,
      countryId: 0,
      year: 0,
    });
    let paginShow = ref(true);
    let movieCount = ref(0)

    async function getCountries() {
      await countryservice().GetByStatus(countries);
    }
    async function getGenres() {
      await genreservice().GetByStatus(genres);
    }
    async function getMovies(currentPage) {
      if (route.name === "client-category-router") {
        await categoryservice().GetBySlug(route.params.slug, cateBySlug);
        cateId.value = cateBySlug.value.id;
        await movieservice().PaginationByCate(
          cateId.value,
          movies,
          currentPage,
          pageCount
        );
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-genre-router") {
        await genreservice().GetBySlug(route.params.slug, genreBySlug);
        genreId.value = genreBySlug.value.id;
        await movieservice().PaginationByGenre(
          genreId.value,
          movies,
          currentPage,
          pageCount
        );
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-country-router") {
        await countryservice().GetBySlug(route.params.slug, countryBySlug);
        countryId.value = countryBySlug.value.id;
        await movieservice().PaginationByCountry(
          countryId.value,
          movies,
          currentPage,
          pageCount
        );
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-year-router") {
        year.value = route.params.slug;
        await movieservice().PaginationByYear(
          year.value,
          movies,
          currentPage,
          pageCount
        );
        movieCount.value  = movies.value.movieViewModels.length;
      }
    }
    async function getCateName() {
      await categoryservice().GetBySlug(route.params.slug, cateBySlug);
      nameNav.value = cateBySlug.value.name;
    }
    async function getGenreName() {
      await genreservice().GetBySlug(route.params.slug, genreBySlug);
      nameNav.value = genreBySlug.value.name;
    }
    async function getCountryName() {
      await countryservice().GetBySlug(route.params.slug, countryBySlug);
      nameNav.value = countryBySlug.value.name;
    }
    async function handleFilter(order, genreid, countryid, year, currentPage) {
      if (route.name === "client-category-router") {
        await movieservice().PaginFilterCate(
          cateId.value,
          order,
          genreid,
          countryid,
          year,
          movies,
          currentPage,
          pageCounFilter
        );
        if (order == 0 && genreid == 0 && countryid == 0 && year == 0)
          paginShow.value = true;
        else if (order != 0 || genreid != 0 || countryid != 0 || year != 0) {
          paginShow.value = false;
        }
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-genre-router") {
        await movieservice().PaginFilterGenre(
          order,
          genreid,
          countryid,
          year,
          movies,
          currentPage,
          pageCounFilter
        );
        if (order == 0 && genreid == 0 && countryid == 0 && year == 0)
          paginShow.value = true;
        else if (order != 0 || genreid != 0 || countryid != 0 || year != 0) {
          paginShow.value = false;
        }
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-country-router") {
        await movieservice().PaginFilterCountry(
          order,
          genreid,
          countryid,
          year,
          movies,
          currentPage,
          pageCounFilter
        );
        if (order == 0 && genreid == 0 && countryid == 0 && year == 0)
          paginShow.value = true;
        else if (order != 0 || genreid != 0 || countryid != 0 || year != 0) {
          paginShow.value = false;
        }
        movieCount.value  = movies.value.movieViewModels.length;
      } else if (route.name === "client-year-router") {
        await movieservice().PaginFilterYear(
          order,
          genreid,
          countryid,
          year,
          movies,
          currentPage,
          pageCounFilter
        );
        if (order == 0 && genreid == 0 && countryid == 0 && year == 0)
          paginShow.value = true;
        else if (order != 0 || genreid != 0 || countryid != 0 || year != 0) {
          paginShow.value = false;
        }
        movieCount.value  = movies.value.movieViewModels.length;
      }
    }
    watch(
      () => route.params.slug,
      async (newSlug, oldSlug) => {
        if (route.name === "client-category-router") {
          if (newSlug !== oldSlug && route.params.slug !== undefined) {
            await getMovies(1);
            await getCateName();
          }
        } else if (route.name === "client-genre-router") {
          await getMovies(1);
          await getGenreName();
        } else if (route.name === "client-country-router") {
          await getMovies(1);
          await getCountryName();
        } else if (route.name === "client-year-router") {
          await getMovies(1);
          nameNav.value = year.value;
        }
      }
    );
    onMounted(async () => {
      if (route.name === "client-category-router") {
        await getMovies(1);
        await getCateName();
      } else if (route.name === "client-genre-router") {
        await getMovies(1);
        await getGenreName();
      } else if (route.name === "client-country-router") {
        await getMovies(1);
        await getCountryName();
      } else if (route.name === "client-year-router") {
        await getMovies(1);
        nameNav.value = year.value;
      }
      await getGenres();
      await getCountries();
    });
    return {
      movies,
      nameNav,
      pageCount,
      genres,
      countries,
      filter,
      pageCounFilter,
      paginShow,
      movieCount,
      getMovies,
      handleFilter,
    };
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