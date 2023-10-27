<template>
  <comp-header-admin />
  <div class="container-fluid page-body-wrapper px-0">
    <comp-sidebar-admin />
    <div class="main-panel">
      <div class="content-wrapper">
        <slot />
      </div>
      <comp-footer-admin />
    </div>
  </div>
</template>

<script>
import CompHeaderAdmin from "../../components/admin/compHeader.vue";
import CompFooterAdmin from "../../components/admin/compFooter.vue";
import CompSidebarAdmin from "../../components/admin/compSidebar.vue";
import * as signalR from "@microsoft/signalr";
import { userservice } from "../../services/userService";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    let userCount = ref(0);
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_APP_HUB + "userhub") // Địa chỉ Hub SignalR
      .build();
    function connectSignalR() {
      connection.start().then(() => {
        connection.on("ReceiveUserCount");
      });
    }
    onMounted(async () => {
      if (!localStorage.getItem("AdminOnline")) {
        connectSignalR();
        await userservice().AddUserCount(userCount);
        localStorage.setItem("AdminOnline", userCount.value);
      } else {
        await userservice().GetUserCount(userCount);
      }
      window.addEventListener("beforeunload", async () => {
        localStorage.removeItem("AdminOnline");
        await userservice().RemoveUserCount(userCount);
      });
    });
    onBeforeUnmount(() => {
      connection.stop();
    });
    return {
      userCount,
    };
  },
  components: {
    CompHeaderAdmin,
    CompFooterAdmin,
    CompSidebarAdmin,
  },
};
</script>

<style></style>
  