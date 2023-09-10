<template>
  <div class="movie-trend my-4 col-md-4">
    <div class="text-trend">
      <span>trending</span>
    </div>
    <div class="content-movie-trend mt-3">
      <div class="taps d-flex text-center">
        <div class="tap active">Ngày</div>
        <div class="tap">Tuần</div>
        <div class="tap">Tháng</div>
      </div>
      <div class="list-movie-trend mt-3">
        <div v-for="index in 10" :key="index">
          <div
            v-if="index % 2 === 0"
            class="item-trend d-flex align-items-center line"
          >
            <div class="item-index">
              <span>{{ index }}</span>
            </div>
            <div class="box-item-trend">
              <span class="text-item">Vân Chi Vũ</span>
              <br />
              <small style="color: rgb(175, 175, 175)"
                ><i>10 lượt quan tâm</i></small
              >
            </div>
          </div>
          <div v-else class="item-trend d-flex align-items-center">
            <div class="item-index">
              <span>{{ index }}</span>
            </div>
            <div class="box-item-trend">
              <span class="text-item">Vân Chi Vũ</span>
              <br />
              <small style="color: rgb(175, 175, 175)"
                ><i>10 lượt quan tâm</i></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>