<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          ><span>mọt phim / </span
          ><span class="mx-2" style="color: rgb(217, 216, 216)"
            >{{ movie.countryName }} /
          </span>
          <span>{{ movie.title }} / </span>
          <span v-if="movie.episode_Number === 1" class="mx-2">tập full</span>
          <span v-else class="mx-2">tập {{ paramEpisode }}</span>
        </span>
      </div>
      <div class="my-3">
        <iframe
          class="link-movie"
          :src="episode.link"
          frameborder="0"
          width="100%"
          height="551.25"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <div>
          <div class="box-server py-1 my-3">
            <p @click="getEpisode(paramEpisode,movie.id,item.linkServerId)" v-for="(item,index) in server" :key="index" class="server">
              <i class="fa-solid fa-circle-play"></i><span>{{ item.serverName }}</span>
            </p>
          </div>
          <div v-if="movie.episode_Number===1" class="watch-list-episodes">
            <a v-for="item in episodes" :key="item.id" class="item-episode active">Tập Full</a>
          </div>
          <div v-else class="watch-list-episodes">
            <router-link
            :to="{name:'client-watch-router',params:{slug:slug,episode:item.episode_Number}}"
            v-for="item in episodes" :key="item.id" class="item-episode" >
            Tập {{ item.episode_Number }}
          </router-link>
          </div>
        </div>
        <div class="watch-title">
          <p v-if="movie.episode_Number===1" class="title-1">{{ movie.title }} - Tập Full</p>
          <p v-else class="title-1">{{ movie.title }} - Tập {{ paramEpisode }}</p>
          <p class="title-2">{{ movie.name_Eng }} ({{ movie.year_Release }})</p>
        </div>
        <div class="description mt-2">
          <p class="text-2">
            {{ movie.description }}
          </p>
        </div>
        <div class="mt-4">
          <div
              class="fb-comments"
              :data-href="url_comment + slug"
              data-width="100%"
              data-numposts="10"
            ></div>
        </div>
        <div class="my-5">
          <p style="font-size: 14px">Tags:</p>
          <small style="color: #5f5f5f"
            >{{ movie.tags }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { movieservice } from "../../services/movieService";
import { episodeservice } from "../../services/episodeService";
export default {
  setup(){
    let route = useRoute();
    let slug = route.params.slug;
    let url_comment = import.meta.env.VITE_APP_URL_COMMENT_FB;
    let paramEpisode = ref(route.params.episode);
    let movieBySlug = ref({});
    let movie = ref({});
    let episode = ref({});
    let episodes = ref({});
    let server = ref({});

    async function getBySlug() {
      await movieservice().GetBySlug(slug, movieBySlug);
    }
    async function getMovie() {
      await movieservice().GetById(movieBySlug.value.id, movie);
    }
    async function getEpisode(number,movieId,serverId) {
      
      await episodeservice().GetByEpisodeNumber(number,movieId,serverId,episode);
    }
    async function getEpisodes(movieId) {
      await episodeservice().GetEpisodes(movieId,episodes);

    }
    async function getServer(number) {
      await episodeservice().GetServer(number,movie.value.id,server);
      
    }
    watch(
      () => route.params.episode,
      async (newEpisode, oldEpisode) => {
        if (newEpisode != oldEpisode) {
          window.location.reload();
        }
      }
    );
    onMounted(async () => {
      FB.XFBML.parse();
      await getBySlug();
      await getMovie();
      await getServer(paramEpisode.value)
      await getEpisode(paramEpisode.value,movie.value.id,server.value[0].linkServerId);
      await getEpisodes(movie.value.id)

    });
    return {
      slug,
      url_comment,
      movie,
      episode,
      episodes,
      paramEpisode,
      server,
      getEpisode,
    }
  }
};
</script>

<style>
</style>