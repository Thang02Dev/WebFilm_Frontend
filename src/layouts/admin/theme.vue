<template>  
    <comp-header-admin />
    <div class="container-fluid page-body-wrapper px-0">
        <comp-sidebar-admin/>
        <div class="main-panel">
            <div class="content-wrapper">
                <slot/>
            </div>
            <comp-footer-admin />
        </div>
    </div>
</template>

<script>
import CompHeaderAdmin from "../../components/admin/compHeader.vue";
import CompFooterAdmin from "../../components/admin/compFooter.vue";
import CompSidebarAdmin from "../../components/admin/compSidebar.vue";
export default {
setup() {
    return {};
},
components: {
    CompHeaderAdmin,
    CompFooterAdmin,
    CompSidebarAdmin
},
};
</script>

<style></style>
  