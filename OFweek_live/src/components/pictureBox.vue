<template>
  <div class="picture-box" v-show="liveType === ''">
    <el-carousel indicator-position="none" height="378px">
      <el-carousel-item v-for="item in pictures" :key="item">
        <div class="picture-box-item">
          <img v-bind:src="item.url">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
  .picture-box{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: #fff; }
  .picture-box-item{ position: relative; width: 100%; height: 100%; }
  .picture-box-item img{ position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 100%; max-height: 100%; }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'pictureBox',
  computed: mapGetters({
    pictures: 'pictures',
    liveType: 'liveType'
  })
}
</script>
