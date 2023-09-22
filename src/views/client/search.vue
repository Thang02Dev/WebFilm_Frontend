<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          ><span>mọt phim / </span><span  class="mx-2" style="color:rgb(217, 216, 216)">kết quả tìm kiếm: "{{ keySearch }}"</span></span
        >
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="list-iamge-movie mt-2">
            <div v-for="index in 24" :key="index" class="box-movie">
              <span class="tag-víetsub">Tập 10 Vietsub</span>
              <span class="button-play"><i class="fa-solid fa-play"></i></span>
              <img
                class="image-movie"
                src="https://i.mpcdn.top/c/wG3aPK4/van-chi-vu.jpg?1694085506"
                alt=""
              />
              <div class="box-movie-title">Vân Chi Vũ</div>
            </div>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>
  
  <script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";
import { useRoute } from "vue-router";
import { onMounted, watch } from 'vue';
export default {
  setup(){
    let route = useRoute();
    let keySearch = route.params.slug.replace(/\+/g,' ');
    
    async function handleSearching(value) {
      
    }

    watch(()=>route.params.slug, (newSLug,oldSlug)=>{
      if(newSLug!=oldSlug){
        keySearch = newSLug.replace(/\+/g,' ');
        window.location.reload();
      }
    })
    onMounted(()=>{
    })
    return{
      keySearch,
    }
  },
  components: {
    CompMoviesTrend,
  },
};
</script>
  
  <style>
</style>