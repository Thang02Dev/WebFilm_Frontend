<template>
  <div class="header">
    <div class="container p-1">
      <div class="top d-flex">
        <div class="menu-header" @click="toggleMenu">
          <i class="fa-solid fa-bars icon-menu"></i>
        </div>
        <div class="left-header">
          <img
            class="logo"
            src="https://motchill.info/motchill.png?v1.0.2"
            alt=""
          />
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
    <i @click="deleteTextSearch" class="icon-delete fa-solid fa-circle-xmark"></i>
  </div>
  <div class="main-menu">
    <ul class="container">
      <li class="menu-item menu-active"><a href="">Trang chủ</a></li>
      <li class="menu-item"><a href="">thể loại</a></li>
      <li class="menu-item"><a href="">quốc gia</a></li>
      <li class="menu-item"><a href="">phim mới</a></li>
      <li class="menu-item"><a href="">phim bộ</a></li>
      <li class="menu-item"><a href="">phim lẻ</a></li>
      <li class="menu-item"><a href="">phim thuyết minh</a></li>
      <li class="menu-item"><a href="">phim chiếu rạp</a></li>
      <li class="menu-item"><a href="">tv show</a></li>
    </ul>
  </div>
  <div :class="{ 'menu-out': !isShow, 'repon-menu': isShow }" ref="menu">
    <div class="repon-list-menu">
      <ul>
        <li class="repon-menu-item menu-active"><a href="">Trang chủ</a></li>
        <li class="repon-menu-item">
          <a href="/">thể loại</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">quốc gia</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">phim mới</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">phim bộ</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">phim lẻ</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">phim thuyết minh</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">phim chiếu rạp</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
        <li class="repon-menu-item">
          <a href="">tv show</a
          ><span class="icon-more"><i class="fa-solid fa-plus"></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
  setup() {
    let isShow = ref(false);
    const menu = ref(null);
    let isShowSearch = ref(false);
    let search = ref("")

    function toggleMenu() {
      isShow.value = !isShow.value;
    }
    function toggleSearch() {
      isShowSearch.value = !isShowSearch.value;
    }
    function deleteTextSearch(){
      search.value = "";
    }
    onClickOutside(menu, () => {
      isShow.value = false;
    });
    return {
      menu,
      isShow,
      isShowSearch,
      search,
      toggleMenu,
      toggleSearch,
      deleteTextSearch,
    };
  },
};
</script>

<style>
</style>