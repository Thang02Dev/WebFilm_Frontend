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
  <div>
    <span>tổng view {{ userCount }}</span>
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
    let initialUserCount = ref(0);
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7174/userhub") // Địa chỉ Hub SignalR
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
      await userservice().GetUserCount(userCount);
      await userservice().AddUserCount(userCount);
      connectSignalR();
      window.addEventListener('beforeunload', async () => {
        await userservice().RemoveUserCount(userCount);
      });
    });
    onBeforeUnmount( () =>{
      connection.stop();
    });
    return {
      movieCount,
      categoryCount,
      genreCount,
      countryCount,
      userCount,
      initialUserCount,
    };
  },
};
</script>