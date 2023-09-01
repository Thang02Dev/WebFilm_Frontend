<template>
  <div class="row">
    <div v-if="isCreateAlert" class="alert alert-success">
      <h5 class="fw-bold">Thông báo!</h5>
      <p style="font-size: 14px;">Thêm mới tập phim thành công</p>
    </div>
    <div v-if="isCreateError" class="alert alert-danger">
      <h5 class="fw-bold">Lỗi!</h5>
      <p style="font-size: 14px;">Thêm mới tập phim không thành công</p>
    </div>
    <div class="grid-margin stretch-card col-5">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Thêm tập mới cho phim</h4>
          <div class="card-description"></div>
          <div>
            <form @submit.prevent="submitCreate">
            <div class="form-group">
              <label class="fw-bold">Tên phim cần thêm</label>
              <select
                v-model="formCreate.movieId"
                required
                @change.prevent="getPagination(formCreate.movieId,1)"
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
              <button type="submit" class="btn btn-primary">Thêm</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-margin stretch-card col-7">
      <div class="card">
        <div class="card-body">
          <h4 v-if="formCreate.movieId!==null" class="card-title">
            Danh sách tập của phim - ID: {{ formCreate.movieId }}
          </h4>
          <h4 v-else class="card-title">
            <span>&lt;</span> Chọn phim để hiển thị danh sách các tập phim
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
                <tr v-for="(item, index) in paginates.episodeViewModels" :key="index">
                  <td class="fw-bold">{{ item.episode_Number }}</td>
                  <td>{{ item.serverName }}</td>
                  <td class="d-flex justify-content-center">
                    <span
                      @click.prevent="getById(item.id)"
                      style="cursor: pointer"
                      class="mx-2"
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
                      class="mx-2"
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
            <div class="my-5">
              <paginate
                :page-count="this.pageCount"
                :page-range="3"
                :margin-pages="2"
                :click-handler="getPagination"
                :prev-text="'<'"
                :next-text="'>'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              >
              </paginate> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <comp-edit-modal :submitEdit="submitEdit" />
</template>

<script>
import { ref, onMounted, reactive ,provide} from "vue";
import { movieservice } from "../../services/movieService";
import { serverservice } from "../../services/serverService";
import { episodeservice } from "../../services/episodeService";
import { useRoute } from 'vue-router';
import Paginate from "vuejs-paginate-next";
import CompEditModal from "../../components/admin/episodes/compEditModal.vue";

export default {
  setup() {
    document.title = "Liệt kê tập phim";
    const route = useRoute();
    let { isCreateAlert, isCreateError, isEditAlert, isEditError } = episodeservice();
    let movies = ref({});
    let servers = ref({});
    let formCreate = reactive({
      movieId: null,
      link: "",
      episode_Number: null,
      linkServerId: null,
    });
    let episodes = ref({});
    let episode = ref({});
    let movieId = ref("");
    let paginates = ref({});
    let pageCount = ref(0);

    async function getPagination(id,currentPage){
      await episodeservice().Pagination(id,paginates,currentPage,pageCount)
    }
    async function getByMovieId(id) {
      await episodeservice().GetByMovieId(id, episodes);
    }
    async function getById(id) {
      await episodeservice().GetById(id, episode);
    }
    async function submitCreate() {
      await episodeservice().Create(formCreate);
      // await getByMovieId(formCreate.movieId)
      await getPagination(formCreate.movieId,1);
      formCreate.episode_Number=null;
      formCreate.link="";
      formCreate.linkServerId=null;
    }
    async function submitEdit(id) {
      await episodeservice().Edit(id, this.episode);
      await getPagination(formCreate.movieId,paginates.value.currentPage);
    }
    async function getMovies() {
      await movieservice().GetAll(movies);
    }
    async function getServerByStatus() {
      await serverservice().GetByStatus(servers);
    }
    async function handleDelete(id) {
      if (!confirm("Có chắc muốn xóa tập phim này không?")) return null;
      else {
        await episodeservice().Delete(id);
        await getPagination(formCreate.movieId,paginates.value.currentPage);
        // await getByMovieId(formCreate.movieId);
        alert("Xóa thể loại thành công");
      }
    }
    onMounted(async () => {   
      if(route.query.movieid!=null){
        movieId.value = route.query.movieid;
        formCreate.movieId = movieId.value;
        await getPagination(formCreate.movieId,1);
      }        
      await getMovies();
      await getServerByStatus();
      
    });
    provide("episode", episode);
    provide("servers", servers);
    provide("movies", movies);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);

    return {
      movies,
      servers,
      formCreate,
      episodes,
      movieId,
      paginates,
      pageCount,
      isCreateAlert,
      isCreateError,
      isEditAlert,
      isEditError,
      submitCreate,
      getByMovieId,
      handleDelete,
      getPagination,
      submitEdit,
      getById,
    };
  },
  components: {
    CompEditModal,
    paginate: Paginate,
  },
};
</script>

<style>
</style>