<template>
  <div class="body-main">
    <comp-header/>
    <slot/>
    <comp-footer />
  </div>
</template>

<script>
import CompHeader from "../../components/client/compHeader.vue";
import CompFooter from "../../components/client/compFooter.vue";
export default {
  setup() {
    return {};
  },
  components: {
    CompHeader,
    CompFooter,
    
  },
};
</script>

<style>
  body{
    font-family: Arial,Tahoma;
    font-size: 14px;
  }
  .body-main{
    background-color:#101010;
    color: white;
  }
</style>