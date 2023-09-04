<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Cài đặt giao diện trang chủ</h4>
        <div class="card-description">
          <div class="my-5">
            <draggable
              class="row d-flex justify-content-center"
              @end="savePositionCate"
              :list="categories"
            >
              <div
                style="
                  border: solid 2px rgb(57, 57, 57);
                  width: 138px;
                  font-size: 13px;
                "
                class="list-item uppercase col-md-1 mx-1 p-2 text-dark"
                v-for="item in categories"
                :key="item.name"
              >
                {{ item.name }}
              </div>
            </draggable>
          </div>
        </div>
        <div>
          <span class="uppercase text-bold">phim hot </span>
          <small>(thay đổi vị trí cho slide)</small>
          <div class="row mt-3">
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
            <img
              class="col-md-1 mb-3"
              style="width: 140px"
              src="https://i.mpcdn.top/poster/dao-hai-tac-718.jpg?1693722429"
              alt="ảnh"
            />
          </div>
        </div>
        <div class="mt-3">
          <div class="d-flex">
            <span
              :class="{
                uppercase: !isClick,
                'text-bold': !isClick,
                'category-border': !isClick,
              }"
              class="cursor-pointer transition"
              @click="toggleMovie('phim-bo')"
              >phim bộ mới cập nhật</span
            >
            <span
              :class="{
                uppercase: isClick,
                'text-bold': isClick,
                'category-border': isClick,
              }"
              class="cursor-pointer mx-3 transition"
              @click="toggleMovie('phim-le')"
              >phim lẻ mới cập nhật
            </span>
          </div>
          <div class="row">
            <div class="col-6">
              <draggable
                @end="savePositionMovie"
                :list="movies"
                class="row mt-3"
              >
                <img
                  v-for="(item, index) in movies"
                  :key="index"
                  class="col-md-1 mb-3 list-image"
                  style="width: 140px"
                  :src="item.image"
                  alt="ảnh"
                />
              </draggable>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <span class="uppercase text-bold">phim chiếu rạp</span>
          <div class="row">
            <div class="col-6">
              <draggable
                @end="savePositionCinima"
                :list="cinima"
                class="row mt-3"
              >
                <img
                  v-for="(item, index) in cinima"
                  :key="index"
                  class="col-md-1 mb-3 list-image"
                  style="width: 140px"
                  :src="item.image"
                  alt="ảnh"
                />
              </draggable>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <span class="uppercase text-bold">phim hoạt hình</span>
          <div class="row">
            <div class="col-6">
              <draggable
                @end="savePositionAnime"
                :list="animes"
                class="row mt-3"
              >
                <img
                  v-for="(item, index) in animes"
                  :key="index"
                  class="col-md-1 mb-3 list-image"
                  style="width: 140px"
                  :src="item.image"
                  alt="ảnh"
                />
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { categoryservice } from "../../services/categoryService";
import { movieservice } from "../../services/movieService";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  setup() {
    let categories = ref([]);
    let movies = ref([]);
    let isClick = ref(false);
    let animes = ref([]);
    let cinima = ref([]);

    async function getCategories() {
      await categoryservice().GetByStatus(categories);
    }
    async function getMoviesByCategorySlug(slug) {
      await movieservice().GetByCategorySlug(slug, movies);
    }
    async function getMoviesByCategoryCinima(slug) {
      await movieservice().GetByCategorySlug(slug, cinima);
    }
    async function getMoviesByAnime() {
      await movieservice().GetByGenreSlug("hoat-hinh", animes);
    }
    async function savePositionCate() {
      // Cập nhật lại thuộc tính position dựa trên vị trí mới của các phần tử
      categories.value.forEach((item, index) => {
        item.position = index + 1;
      });
      for (let item of categories.value) {
        await categoryservice().ChangedPosition(item.id, item.position);
      }
    }
    async function savePositionAnime() {
      // Cập nhật lại thuộc tính position dựa trên vị trí mới của các phần tử
      animes.value.forEach((item, index) => {
        item.position = index + 1;
      });
      for (let item of animes.value) {
        await movieservice().ChangedPosition(item.id, item.position);
      }
    }
    async function savePositionMovie() {
      // Cập nhật lại thuộc tính position dựa trên vị trí mới của các phần tử
      movies.value.forEach((item, index) => {
        item.position = index + 1;
      });
      for (let item of movies.value) {
        await movieservice().ChangedPosition(item.id, item.position);
      }
    }
    async function savePositionCinima() {
      // Cập nhật lại thuộc tính position dựa trên vị trí mới của các phần tử
      cinima.value.forEach((item, index) => {
        item.position = index + 1;
      });
      for (let item of cinima.value) {
        await movieservice().ChangedPosition(item.id, item.position);
      }
    }
    async function toggleMovie(slug) {
      isClick.value = !isClick.value;
      await getMoviesByCategorySlug(slug);
    }
    onMounted(async () => {
      await getCategories();
      await getMoviesByCategorySlug("phim-bo");
      await getMoviesByAnime();
      await getMoviesByCategoryCinima("phim-chieu-rap");
    });
    return {
      categories,
      movies,
      isClick,
      animes,
      cinima,
      savePositionCate,
      getMoviesByCategorySlug,
      savePositionMovie,
      toggleMovie,
      getMoviesByAnime,
      savePositionAnime,
      savePositionCinima,
    };
  },
  components: {
    draggable: VueDraggableNext,
  },
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
.list-item {
  border: solid 1px black;
  text-align: center;
  cursor: grab;
  transition: transform 0.2s ease-in-out;
}

.list-item:active {
  cursor: grabbing;
  transform: scale(1.05);
}
.list-image {
  cursor: grab;
  transition: transform 0.2s ease-in-out;
}
.list-image:active {
  cursor: grabbing;
  transform: scale(1.05);
}
.uppercase {
  text-transform: uppercase;
}
.cursor-pointer {
  cursor: pointer;
}
.category-border {
  border-bottom: solid 3px black;
  padding: 2px;
}
.transition {
  transition: all 0.3s ease-in-out;
}
</style>