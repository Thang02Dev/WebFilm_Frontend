<template>
  <div class="app-category my-3">
    <div class="container">
      <div class="nav-page">
        <span class="nav-page-text">mọt phim / <span>phim trung quốc /</span></span>
        <span style="color: rgb(177, 177, 177)">vân chi vũ</span>
      </div>
      <div class="row m-0 mt-3">
        <div style="background-color: #181818" class="col-md-8">
          <div class="row mt-3">
            <div class="box-image-movie-info col-md-6">
              <div class="poi-image-info">
                <img
                  class="image"
                  src="https://i.mpcdn.top/c/wG3aPK4/van-chi-vu.jpg?1694258174"
                  alt=""
                />
                <div class="box-play">
                  <button>Xem phim</button>
                </div>
              </div>
            </div>
            <div class="col-md-6 px-2">
              <div class="title-movie-info">
                <span class="name-vn">vân chi vũ</span>
                <br />
                <small class="name-eng">My Journey to You (2023)</small>
              </div>
              <div class="detail-info mt-2">
                <div class="text-detail-info">
                  Trạng thái: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Sắp chiêu: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Đạo diễn: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Thời lượng: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Số tập: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Tình trạng: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Ngôn ngữ: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Năm sản xuất: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Quốc gia: <span class="text">sá</span>
                </div>
                <div class="text-detail-info">
                  Diễn viên: <span class="text">sá</span>
                </div>
              </div>
            </div>
          </div>
          <div class="list-episode mt-2">
            <span class="text">tập mới nhất: </span>
            <button class="btn-episode">Tập 1</button>
            <button class="btn-episode">Tập 1</button>
            <button class="btn-episode">Tập 1</button>
          </div>
          <div class="description mt-3">
            <span class="text-1">nội dung phim</span>
            <br />
            <br>
            <p class="text-2"
              >Vân Chi Vũ là câu chuyện của thích khách mong muốn tự do Vũ Vị
              Sam (Ngu Thư Hân thủ vai) phải thâm nhập hoàng cung hoàn thành
              nhiệm vụ. Trong chốn cung cấm đầy hiểm nguy, cô gặp tình yêu, tình
              bạn, tìm kiếm bản thân, kiên định hướng đi, và trưởng thành cùng
              với Tử Vũ - chàng điện hạ ương bướng (Trương Lăng Hách thủ
              vai).</p
            >
          </div>
          <div class="tags mt-3">
            <span class="tag-text">Tags</span>
            <button class="tag-button">abc</button>
            <button class="tag-button">abc</button>
          </div>
        </div>
        <comp-movies-trend />
      </div>
    </div>
  </div>
</template>
    
    <script>
import CompMoviesTrend from "../../components/client/compMoviesTrend.vue";

export default {
  components: {
    CompMoviesTrend,
  },
};
</script>
    
    <style>
</style>