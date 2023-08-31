<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'admin-dashboard-router' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Thống kê </span>
        </router-link>
      </li>

      <li class="nav-item nav-category">Quản lý</li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'admin-category-router' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Danh mục phim</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'admin-genre-router' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Thể loại phim</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'admin-country-router' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Quốc gia phim</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'admin-server-router' }">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Server phim</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-bs-toggle="collapse"
          href="#icons"
          aria-expanded="false"
          aria-controls="icons"
        >
          <i class="menu-icon mdi mdi-layers-outline"></i>
          <span class="menu-title">Phim</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="icons">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'admin-movie-router' }"
                >Danh sách phim</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'admin-episode-router' }"
                >Liệt kê tập phim</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="mdi mdi-grid-large menu-icon"></i>
          <span class="menu-title">Tài khoản</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    return {};
  },
};
</script>

<style>
</style>