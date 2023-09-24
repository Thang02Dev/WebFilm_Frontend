<template>
  <div class="container-scroller">
    <component :is="layout">
      <router-view :key="viewKey"/> 
    </component>
  </div>
</template>

<script>
import {computed} from "vue"
import { useRoute } from "vue-router"
export default {
  setup(){
    const router = useRoute()
    return {
      layout:computed(()=> router.meta.layout || 'div'),
      viewKey: 0
    }
  },
}
</script>

<style>

</style>