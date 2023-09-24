<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text"
          ><span>mọt phim / </span
          ><span class="mx-2" style="color: rgb(217, 216, 216)"
            >phim trung quốc /
          </span>
          <span>vân chi vũ / </span>
          <span class="mx-2">tập 1</span>
        </span>
      </div>
      <div class="my-3">
        <iframe
          class="link-movie"
          src="https://hd1080.opstream2.com/share/7b6ad2297d3beb569ddf3ee1ce22ffa8"
          frameborder="0"
          width="100%"
          height="551.25"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <div>
          <div class="box-server py-1 my-3">
            <p class="server active">
              <i class="fa-solid fa-circle-play"></i><span>Vietsub #1</span>
            </p>
            <p class="server">
              <i class="fa-solid fa-circle-play"></i><span>Vietsub #2</span>
            </p>
          </div>
          <div class="watch-list-episodes">
            <a v-for="item in 20" :key="item" class="item-episode">Tập 12</a>
          </div>
        </div>
        <div class="watch-title">
          <p class="title-1">Vân Chi Vũ - Tập 1</p>
          <p class="title-2">My Journey to You (2023)</p>
        </div>
        <div class="description mt-2">
          <p class="text-2">
            Vân Chi Vũ là câu chuyện của thích khách mong muốn tự do Vũ Vị Sam
            (Ngu Thư Hân thủ vai) phải thâm nhập hoàng cung hoàn thành nhiệm vụ.
            Trong chốn cung cấm đầy hiểm nguy, cô gặp tình yêu, tình bạn, tìm
            kiếm bản thân, kiên định hướng đi, và trưởng thành cùng với Tử Vũ -
            chàng điện hạ ương bướng (Trương Lăng Hách thủ vai).
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
            >xem phim Vân Chi Vũ tập 1, Phim Vân Chi Vũ tập 1 Vietsub, Vân Chi
            Vũ ep 1 full hd, download phim Vân Chi Vũ tập 1, xem online Vân Chi
            Vũ tập 1 netflix, wetv, vieon, phim keeng, youtube, phimmoi, bilutv,
            biphim, hdvip, hayghe, motphim, tvhay, zingtv, fptplay, phim1080,
            luotphim, fimfast, dongphim, dongphym, fullphim, phephim,
            vtvgiaitri, preview Vân Chi Vũ tập 1 thuyết minh, Vân Chi Vũ tập 1
            lồng tiếng</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  setup(){
    let route = useRoute();
    let slug = route.params.slug;
    let url_comment = import.meta.env.VITE_APP_URL_COMMENT_FB;
    onMounted(async () => {
      FB.XFBML.parse();
    });
    return {
      slug,
      url_comment,
    }
  }
};
</script>

<style>
</style>