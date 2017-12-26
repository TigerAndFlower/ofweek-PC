<template>
  <div class="school-photo" v-if="schoolPhotos.length > 0">
    <columnHeader title="校园风采 Photos"></columnHeader>
    <div class="sp-bd">
      <div class="sp-img">
        <el-carousel height="200px" v-bind:interval="5000">
          <el-carousel-item v-for="item in schoolPhotos" :key="item">
            <img v-bind:src="item.img">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<style>
  .school-photo{ text-align: center; }
  .sp-img{ overflow: hidden; padding: 15px; }
  .sp-img img{ max-width: 100%; height: 100%; }
  .sp-bd .el-carousel__indicators{ width: 90%; }
  .sp-bd .el-carousel__button { width: 8px; background-color: rgba(255, 255, 255, 1); }
</style>

<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'schoolPhoto',
  components: {
    columnHeader
  },
  computed: {
    schoolPhotos () {
      return this.schoolInfo.imgs || []
    },
    ...mapGetters({
      schoolInfo: 'schoolInfo'
    })
  }
}
</script>
