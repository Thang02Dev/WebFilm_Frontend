<template>
  <nav
    class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
  >
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start"
    >
      <div class="me-3">
        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-bs-toggle="minimize"
        >
          <span class="icon-menu"></span>
        </button>
      </div>
      <div>
        <router-link :to="{ name: 'admin-dashboard-router' }" class="navbar-brand brand-logo">
          <p class="fw-bold mx-4" style="color: white; text-transform: uppercase;font-size: 25px;">
            admin
          </p>
        </router-link>
        <a class="navbar-brand brand-logo-mini" href="index.html">
          <i class="fa-solid fa-house" style="color: #787878;"></i>
        </a>
      </div>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-top">
      <ul class="navbar-nav">
        <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
          <h1 class="welcome-text">
            Good Morning, <span class="text-black fw-bold">John Doe</span>
          </h1>
          <h3 class="welcome-sub-text">Your performance summary this week</h3>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown user-dropdown">
          <a
            class="nav-link "
            id="UserDropdown"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          <i class="fa-solid fa-user" style="font-size: 25px;color: #787878;"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="UserDropdown"
          >
            <div class="dropdown-header text-center">
              <p class="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
            </div>
            <a class="dropdown-item"
              ><i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i
              >Sign Out</a
            >
          </div>
        </li>
      </ul>
      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center  mx-3"
        type="button"
        data-bs-toggle="offcanvas"
      >
        <span class="mdi mdi-menu" style="font-size: 25px;"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>