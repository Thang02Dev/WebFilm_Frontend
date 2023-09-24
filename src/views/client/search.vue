<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          ><span>mọt phim / </span
          ><span class="mx-2" style="color: rgb(217, 216, 216)"
            >kết quả tìm kiếm: "{{ keySearch }}"</span
          ></span
        >
      </div>
      <div class="row">
        <div class="col-md-8">
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
              <span class="tag-víetsub">Tập 10 Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img class="image-movie" :src="item.image" alt="" />
              <div class="box-movie-title">{{ item.title }}</div>
            </router-link>
          </div>
          <div class="box-pagin my-3">
            <paginate
              v-if="movieCount > 24"
              :page-count="this.pageCount"
              :page-range="3"
              :margin-pages="2"
              :click-handler="handleSearching"
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
import { onMounted, watch, ref } from "vue";
import { movieservice } from "../../services/movieService";
import Paginate from "vuejs-paginate-next";

export default {
  setup() {
    let route = useRoute();
    let keySearch = ref(route.params.slug.replace(/\+/g, " "));
    let movies = ref({});
    let pageCount = ref(0);
    let movieCount = ref(0);

    async function handleSearching(value, currentPage) {
      await movieservice().PaginSearch(movies, value, currentPage, pageCount);
      movieCount.value = movies.value.movieViewModels.length;
    }

    watch(
      () => route.params.slug,
      async (newSLug, oldSlug) => {
        if (newSLug != oldSlug && route.name == "client-search-router") {
          keySearch.value = newSLug.replace(/\+/g, " ");
          await handleSearching(keySearch.value, 1);
        }
      }
    );
    onMounted(async () => {
      await handleSearching(keySearch.value, 1);
    });
    return {
      keySearch,
      movies,
      pageCount,
      movieCount,
      handleSearching,
    };
  },
  components: {
    CompMoviesTrend,
    paginate: Paginate,
  },
};
</script>
  
  <style>
</style>