<template>
  <div class="movie-trend my-4 col-md-4">
    <div class="text-trend">
      <span>trending</span>
    </div>
    <div class="content-movie-trend mt-3">
      <div class="taps d-flex text-center">
        <div class="tap" :class="{'active':isActiveDay}" @click.prevent="getByDay">Ngày</div>
        <div class="tap" :class="{'active':isActiveWeek}" @click.prevent="getByWeek">Tuần</div>
        <div class="tap" :class="{'active':isActiveMonth}" @click.prevent="getByMonth">Tháng</div>
      </div>
      <div class="list-movie-trend mt-3">
        <div v-for="(item,index) in movies" :key="index">
          <div
            v-if="index % 2 === 0"
            class="item-trend d-flex align-items-center line"
          >
            <div class="item-index">
              <span>{{ index+1 }}</span>
            </div>
            <div class="box-item-trend">
              <span class="text-item">{{ item.title }}</span>
              <br />
              <small style="color: rgb(175, 175, 175)"
                ><i>{{ item.count }} lượt quan tâm</i></small
              >
            </div>
          </div>
          <div v-else class="item-trend d-flex align-items-center">
            <div class="item-index">
              <span>{{ index+1 }}</span>
            </div>
            <div class="box-item-trend">
              <span class="text-item">{{ item.title }}</span>
              <br />
              <small style="color: rgb(175, 175, 175)"
                ><i>{{ item.count }} lượt quan tâm</i></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {viewservice} from "../../services/viewService"
export default {
  setup(){
    let movies = ref({});
    let isActiveDay = ref(false);
    let isActiveMonth = ref(false);
    let isActiveWeek = ref(false);

    async function getByDay() {
      await viewservice().GetByDay(movies);
      isActiveDay.value = true;
      isActiveWeek.value = false;
      isActiveMonth.value = false;
    }
    async function getByMonth() {
      await viewservice().GetByMonth(movies);
      isActiveDay.value = false;
      isActiveWeek.value = false;
      isActiveMonth.value = true;
    }
    async function getByWeek() {
      await viewservice().GetByWeek(movies);
      isActiveDay.value = false;
      isActiveWeek.value = true;
      isActiveMonth.value = false;
    }
    onMounted(async ()=>{
      await getByDay();
    })
    return{
      movies,
      isActiveDay,
      isActiveWeek,
      isActiveMonth,
      getByDay,
      getByMonth,
      getByWeek
    }
  }
};
</script>

<style>
</style>