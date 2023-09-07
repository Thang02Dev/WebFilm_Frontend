<template>
  <div class="row" style="font-size: 14px">
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ movieCount }}</p>
          <span>Phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ categoryCount }}</p>
          <span>Danh mục phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ genreCount }}</p>
          <span>Thể loại phim</span>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-3">
      <div class="card">
        <div class="card-body">
          <p style="font-size: 20px">{{ countryCount }}</p>
          <span>Quốc gia phim</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
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
import { userservice } from "../../services/userService";
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as signalR from "@microsoft/signalr";

export default {
  setup() {
    document.title = "Thống kê";
    let movieCount = ref(null);
    let categoryCount = ref(null);
    let genreCount = ref(null);
    let countryCount = ref(null);
    let userCount = ref(0);
    let isFirstLoad = ref(true);

    let connection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_APP_HUB + "userhub") // Địa chỉ Hub SignalR
      .build();

    async function getMovieCount() {
      await movieservice().GetCount(movieCount);
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
    function connectSignalR() {
      connection.start().then(() => {
        connection.on("ReceiveUserCount", (count) => {
          userCount.value = count;
        });
      });
    }
    onMounted(async () => {
      await getMovieCount();
      await getGenreCount();
      await getCategoryCount();
      await getCountryCount();
      if (!localStorage.getItem("userOnline")) {
        connectSignalR();
        await userservice().AddUserCount(userCount);
        localStorage.setItem("userOnline", "true");
      } else {
        await userservice().GetUserCount(userCount);
      }
      window.addEventListener("beforeunload", async () => {
        localStorage.removeItem("userOnline");
        await userservice().RemoveUserCount(userCount);
      });
    });
    onBeforeUnmount(() => {
      connection.stop();
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