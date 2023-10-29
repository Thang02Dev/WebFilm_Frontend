<template>
  <div class="row" style="font-size: 14px">
    <div class="grid-margin stretch-card col-md-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ movieCount }}</p>
          <span>Phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-md-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ categoryCount }}</p>
          <span>Danh mục phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-md-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ genreCount }}</p>
          <span>Thể loại phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-md-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ countryCount }}</p>
          <span>Quốc gia phim</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span>Số lượng admin đang online trang quản lý</span>
              <i
                class="fa-solid fa-circle mx-2"
                style="color: #269a1d; font-size: 12px"
              ></i>
              <span class="fw-bold" style="font-size: 20px">{{ userCount }}</span>
            </div>
          </div>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {tokenservice} from "../../services/tokenService"
export default {
  setup() {
    const router  = useRouter();
    document.title = "Thống kê";
    let movieCount = ref(null);
    let categoryCount = ref(null);
    let genreCount = ref(null);
    let countryCount = ref(null);
    let userCount = ref(0);
    let isFirstLoad = ref(true);

    async function getMovieCount() {
      let res = await movieservice().GetCount(movieCount);
      if(res == 401){
        tokenservice().saveRoute.value = "admin-dashboard-router"
        router.push({ name: "admin-login-router" });
      }
    }
    async function getGenreCount() {
      await genreservice().GetCount(genreCount);
    }
    async function getCategoryCount() {
      await categoryservice().GetCount(categoryCount);
    }
    async function getCountryCount() {
      await countryservice().GetCount(countryCount);
    }
    
    onMounted(async () => {
      await getMovieCount();
      await getGenreCount();
      await getCategoryCount();
      await getCountryCount();
      userCount.value = localStorage.getItem("AdminOnline");
      
    });
    return {
      movieCount,
      categoryCount,
      genreCount,
      countryCount,
      userCount,
      isFirstLoad,
    };
  },
};
</script>