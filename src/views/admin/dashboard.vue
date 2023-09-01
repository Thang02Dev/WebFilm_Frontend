<template>
  <div class="row" style="font-size: 14px;">
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px;">{{movieCount}}</p>
          <span>Phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px;">{{ categoryCount }}</p>
          <span>Danh mục phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px;">{{ genreCount }}</p>
          <span>Thể loại phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px;">{{ countryCount }}</p>
          <span>Quốc gia phim</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { movieservice } from "../../services/movieService";
import { genreservice } from "../../services/genreService";
import { categoryservice } from "../../services/categoryService";
import { countryservice } from "../../services/countryService";
import { ref, onMounted} from "vue";

export default {
  setup() {
    document.title = "Thống kê";
    let movieCount = ref(null);
    let categoryCount = ref(null);
    let genreCount = ref(null);
    let countryCount = ref(null);

    async function getMovieCount() {
      await movieservice().GetCount(movieCount);
    }
    async function getGenreCount() {
      await genreservice().GetCount(genreCount);
    }async function getCategoryCount() {
      await categoryservice().GetCount(categoryCount);
    }async function getCountryCount() {
      await countryservice().GetCount(countryCount);
    }
    
    onMounted(async () => {
      await getMovieCount();
      await getGenreCount();
      await getCategoryCount();
      await getCountryCount();
    })

    return {
      movieCount,
      categoryCount,
      genreCount,
      countryCount,
    };
  },
};
</script>