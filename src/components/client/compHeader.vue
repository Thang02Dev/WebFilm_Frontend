<template>
  <div class="header">
    <div class="container p-1">
      <div class="top d-flex">
        <div class="menu-header" @click="toggleMenu">
          <i class="fa-solid fa-bars icon-menu"></i>
        </div>
        <div class="left-header">
          <router-link
            class="d-flex"
            style="width: 250px"
            :to="{ name: 'client-home-router' }"
          >
            <img
              class="logo"
              src="https://motchill.info/motchill.png?v1.0.2"
              alt=""
            />
          </router-link>
        </div>
        <div class="right-header">
          <div class="search">
            <input
              class="input-search"
              type="text"
              placeholder="Vd: tên phim,..."
              style="font-style: italic"
            />
            <i
              @click="toggleSearch"
              class="fa-solid fa-magnifying-glass icon-search"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isShowSearch" class="repon-search d-flex">
    <input
      v-model="search"
      type="text"
      class="repon-input-search"
      placeholder="Nhập tên phim tìm kiếm"
    />
    <i
      @click="deleteTextSearch"
      class="icon-delete fa-solid fa-circle-xmark"
    ></i>
  </div>
  <div class="main-menu">
    <ul class="container">
      <li class="menu-item menu-active"><router-link :to="{ name: 'client-home-router' }">Trang chủ</router-link></li>
      <li v-for="item in categories" :key="item.id" class="menu-item">
        <a
          v-if="
            item.slug === 'the-loai' ||
            item.slug === 'quoc-gia' ||
            item.slug === 'phim-moi'
          "
          >{{ item.name }}</a
        >
        <router-link
          v-else
          :to="{ name: 'client-category-router', params: { slug: item.slug } }"
          >{{ item.name }}</router-link
        >
        <div class="menu-extension">
          <ul v-if="item.slug === 'the-loai'" class="ul-item-1">
            <li v-for="(item, index) in genres" :key="index">
              {{ item.name }}
            </li>
          </ul>
          <ul
            v-else-if="item.slug === 'quoc-gia'"
            class="ul-item-1"
            style="width: 450px"
          >
            <li v-for="(item, index) in countries" :key="index">
              {{ item.name }}
            </li>
          </ul>
          <ul v-else-if="item.slug === 'phim-moi'" class="ul-item-2">
            <li v-for="year in yearList" :key="year">Phim {{ year }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <div :class="{ 'menu-out': !isShow, 'repon-menu': isShow }" ref="menu">
    <div class="repon-list-menu">
      <ul style="list-style: none; padding: 0">
        <li class="repon-menu-item menu-active"><router-link @click="showMenu" :to="{ name: 'client-home-router' }">Trang chủ</router-link></li>
        <li v-for="item in categories" :key="item.id">
          <div class="repon-menu-item">
            <a
              v-if="
                item.slug === 'the-loai' ||
                item.slug === 'quoc-gia' ||
                item.slug === 'phim-moi'
              "
              >{{ item.name }}</a
            >
            <router-link
              @click="showMenu"
              v-else
              :to="{
                name: 'client-category-router',
                params: { slug: item.slug },
              }"
              >{{ item.name }}</router-link
            ><span v-if="item.slug === 'the-loai'" class="icon-more">
              <i
                v-if="genreShow"
                @click="toggleGenreMenu"
                class="fa-solid fa-minus"
              ></i>
              <i v-else @click="toggleGenreMenu" class="fa-solid fa-plus"></i>
            </span>
            <span v-else-if="item.slug === 'quoc-gia'" class="icon-more">
              <i
                v-if="countryShow"
                @click="toggleCountryMenu"
                class="fa-solid fa-minus"
              ></i>
              <i v-else @click="toggleCountryMenu" class="fa-solid fa-plus"></i
            ></span>
            <span v-else-if="item.slug === 'phim-moi'" class="icon-more"
              ><i
                v-if="newShow"
                @click="toggleNewMenu"
                class="fa-solid fa-minus"
              ></i>
              <i v-else @click="toggleNewMenu" class="fa-solid fa-plus"></i
            ></span>
          </div>
          <div
            v-if="genreShow && item.slug === 'the-loai'"
            class="repon-menu-extension"
          >
            <ul style="list-style: none">
              <li v-for="(item, index) in genres" :key="index">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            v-else-if="countryShow && item.slug === 'quoc-gia'"
            class="repon-menu-extension"
          >
            <ul style="list-style: none">
              <li v-for="(item, index) in countries" :key="index">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            v-else-if="newShow && item.slug === 'phim-moi'"
            class="repon-menu-extension"
          >
            <ul style="list-style: none">
              <li v-for="year in yearList" :key="year">Phim {{ year }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { genreservice } from "../../services/genreService";
import { countryservice } from "../../services/countryService";
import { categoryservice } from "../../services/categoryService";

export default {
  setup() {
    let isShow = ref(false);
    let genreShow = ref(false);
    let countryShow = ref(false);
    let newShow = ref(false);
    let isShowSearch = ref(false);

    let menu = ref(null);
    let search = ref("");
    let genres = ref({});
    let countries = ref({});
    let categories = ref({});

    function test() {
      console.log("ss");
    }
    async function getGenres() {
      await genreservice().GetByStatus(genres);
    }
    async function getCountries() {
      await countryservice().GetByStatus(countries);
    }
    async function getCategories() {
      await categoryservice().GetByStatus(categories);
    }

    function toggleGenreMenu() {
      genreShow.value = !genreShow.value;
      countryShow.value = false;
      newShow.value = false;
    }
    function toggleCountryMenu() {
      countryShow.value = !countryShow.value;
      newShow.value = false;
      genreShow.value = false;
    }
    function toggleNewMenu() {
      newShow.value = !newShow.value;
      genreShow.value = false;
      countryShow.value = false;
    }
    function toggleMenu() {
      isShow.value = !isShow.value;
    }
    function toggleSearch() {
      isShowSearch.value = !isShowSearch.value;
    }
    function deleteTextSearch() {
      search.value = "";
    }
    function showMenu() {
      isShow.value = false;
    }
    onClickOutside(menu, () => {
      isShow.value = false;
    });
    onMounted(async () => {
      await getGenres();
      await getCountries();
      await getCategories();
    });
    return {
      menu,
      isShow,
      isShowSearch,
      search,
      genreShow,
      countryShow,
      newShow,
      genres,
      countries,
      categories,
      showMenu,
      toggleMenu,
      toggleSearch,
      deleteTextSearch,
      toggleGenreMenu,
      toggleCountryMenu,
      toggleNewMenu,
      test,
    };
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