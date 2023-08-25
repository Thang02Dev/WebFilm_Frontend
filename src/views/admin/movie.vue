<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Danh sách phim</h4>
        <div class="card-description">
          <div>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Thêm phim
            </button>
            <div class="d-flex justify-content-end align-items-center">
              <i class="icon-search text-dark mx-2"></i>
              <input
                style="width: 200px"
                placeholder="Tìm kiếm"
                type="text"
                class="form-control"
                @keyup="keyUpSearch"
                v-model="keySearch"
              />
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên phim</th>
                <th>Slug</th>
                <th>Danh mục</th>
                <th>Hot</th>
                <th>Xem nhiều</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in movies" :key="index">
                <td>{{ index + 1 }}</td>
                <td>ảnh</td>
                <td  style="width: 10px;">
                  <p>{{ item.title }}</p>
                  <p>({{ item.name_Eng }})</p>
                  <p>- {{ item.episode_Number }} tập -</p>
                </td>
                <td>{{ item.slug }}</td>
                <td>{{ item.categoryId }}</td>
                <td>{{ item.hot }}</td>
                <td>{{ item.top_view }}</td>
                <td>
                  <span
                    @click.prevent="hanhdleChangedStatus(item.id)"
                    v-if="item.status"
                    class="badge badge-success button__status_true"
                    >Kích hoạt</span
                  >
                  <span
                    @click.prevent="hanhdleChangedStatus(item.id)"
                    v-else
                    class="badge badge-dark button__status_false"
                    >Tạm ẩn</span
                  >
                </td>
                <td>
                  <span class="p-1 mx-1" style="cursor: pointer"><u>Chi tiết</u></span>
                  <span
                    @click.prevent="getById(item.id)"
                    style="cursor: pointer"
                    class="p-1 mx-1"
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
                    class="p-1 mx-1"
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
  <comp-create-modal :submitCreate="submitCreate" />

</template>

<script>
import { ref, onMounted, reactive, provide } from "vue";
import { movieservice } from "../../services/movieService";
import { genreservice } from "../../services/genreService";
import {categoryservice} from "../../services/categoryService";
import { countryservice } from "../../services/countryService";
import CompCreateModal from "../../components/admin/movies/compCreateModal.vue";

export default {
  setup() {
    let keySearch = ref("");
    let movies = ref({});
    let movie = ref({});
    let { isCreateAlert, isCreateError, isEditAlert, isEditError } = movieservice();
    let formCreate = reactive({
      title: "",
      description: "",
      trailer:"",
      resolution: null,
      subtitle: null,
      duration_Minutes: null,
      image:null,
      categoryId: null,
      countryId:null,
      hot:"",
    });
    let genres = ref({});
    let categories = ref({});
    let countries = ref({});

    async function getAll() {
      await movieservice().GetAll(movies);
    }
    async function getById(id) {
      await movieservice().GetById(id, movie);
    }
    async function submitCreate() {
      await movieservice().Create(formCreate);
      formCreate.title = "";
      formCreate.description = "";
      await getAll();
    }
    async function submitEdit(id) {
      await movieservice().Edit(id, this.movie);
      await getAll();
    }
    async function handleDelete(id) {
      if (!confirm("Có chắc muốn xóa thể loại này không?")) return null;
      else {
        await movieservice().Delete(id);
        await getAll();

        alert("Xóa thể loại thành công");
      }
    }
    async function keyUpSearch() {
      if (keySearch.value.length > 0) {
        await getAll();
        const rs = await this.movies.filter((item) =>
          item.name.toLowerCase().includes(keySearch.value.toLowerCase())
        );
        movies.value = await rs;
      } else {
        await getAll();
      }
    }
    async function hanhdleChangedStatus(id) {
      await movieservice().ChangedStatus(id, movies);
      await getAll();
    }
    async function getAllGenres() {
      await genreservice().GetAll(genres);
    }
    async function getAllCategories() {
      await categoryservice().GetAll(categories);
    }
    async function getAllCountries() {
      await countryservice().GetAll(countries);
    }
    onMounted(async () => {
      await getAll();
      await getAllGenres();
      await getAllCountries();
      await getAllCategories();

    });
    provide("formCreate", formCreate);
    provide("isCreateAlert", isCreateAlert);
    provide("isCreateError", isCreateError);
    provide("movie", movie);
    provide("isEditAlert", isEditAlert);
    provide("isEditError", isEditError);
    provide("genres", genres);
    provide("categories", categories);
    provide("countries", countries);
    
    return {
      keySearch,
      movies,
      getById,
      handleDelete,
      hanhdleChangedStatus,
      keyUpSearch,
      submitCreate,
      submitEdit,
      getAllGenres,
      getAllCategories,
      getAllCountries,
    };
  },
  components: {
    CompCreateModal,
    // CompEditModal,
  },
};
</script>

<style>
</style>