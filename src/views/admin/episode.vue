<template>
  <div class="row">
    <div class="grid-margin stretch-card col-5">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Thêm tập mới cho phim</h4>
          <div class="card-description"></div>
          <div>
            <div class="form-group">
              <label class="fw-bold">Tên phim cần thêm</label>
              <select
                v-model="formCreate.movieId"
                required
                @change.prevent="getByMovieId(formCreate.movieId)"
                class="form-control"
                style="color: black"
              >
                <option v-for="(item, index) in movies"
                :key="index" :value="item.id">{{ item.title }}</option>
              </select>
              <small v-if="formCreate.movieId!==null">Id của phim: {{ formCreate.movieId }}</small>
            </div>
            <div class="form-group">
              <label class="fw-bold">Thứ tự tập phim</label>
              <input
                v-model="formCreate.episode_Number"
                required
                class="form-control"
                type="number"
              />
            </div>
            <div class="form-group">
              <label class="fw-bold">Link tập phim</label>
              <input
                v-model="formCreate.link"
                required
                class="form-control"
                type="text"
                placeholder="Nhập link"
              />
            </div>
            <div class="form-group">
              <label class="fw-bold">Tên server link</label>
              <select
                v-model="formCreate.linkServerId"
                required
                
                class="form-control"
                style="color: black"
                name=""
                id=""
              >
                <option v-for="(item, index) in servers"
                :key="index" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <button class="btn btn-primary">Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-7">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            Danh sách tập của phim - ID: {{ formCreate.movieId }}
          </h4>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Tập</th>
                  <th>Server</th>
                  <th class="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in episodes" :key="index">
                  <td>{{ item.episode_Number }}</td>
                  <td>{{ item.linkServerId }}</td>
                  <td class="d-flex justify-content-around">
                    <span
                      @click.prevent="getById(item.id)"
                      style="cursor: pointer"
                      class="p-1"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                    >
                      <i
                        class="fa-solid fa-pen-to-square"
                        style="color: #050000; font-size: 22px"
                      ></i>
                    </span>
                    <span
                      @click.prevent="handleDelete(item.id)"
                      style="cursor: pointer"
                      class="p-1"
                    >
                      <i
                        class="fa-solid fa-circle-xmark"
                        style="color: #b80f0f; font-size: 22px"
                      ></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { movieservice } from "../../services/movieService";
import { serverservice } from "../../services/serverService";
import { episodeservice } from "../../services/episodeService";
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    let movies = ref({});
    let servers = ref({});
    let formCreate = reactive({
      movieId: null,
      link: "",
      episode_Number: null,
      linkServerId: null,
    });
    let episodes = ref({});
    let movieId = ref("");
    

    async function getByMovieId(id) {
      await episodeservice().GetByMovieId(id, episodes);
    }
    async function submitCreate() {
      await episodeservice().Create(formCreate);
    }
    async function getMovies() {
      await movieservice().GetAll(movies);
    }
    async function getServerByStatus() {
      await serverservice().GetByStatus(servers);
    }

    onMounted(async () => {   
      if(route.query.movieid!=null){
        movieId.value = route.query.movieid;
        formCreate.movieId = movieId.value;
        await getByMovieId(formCreate.movieId)
      }        
      await getMovies();
      await getServerByStatus();
    });
    return {
      movies,
      servers,
      formCreate,
      episodes,
      movieId,
      submitCreate,
      getByMovieId,
    };
  },
};
</script>

<style>
</style>