<template>
  <div class="videos" v-if="videos.length > 0">
    <columnHeader title="精彩视频 Videos"></columnHeader>
    <div class="videos-bd">
      <ul class="videos-list">
        <li v-for="item in videos" v-on:click="selectVideo(item.url)" v-bind:title="item.name">
          <img class="videos-preview" v-if="item.bCoverPage" v-bind:src="item.bCoverPage">
          <img class="videos-icon-play" src="../assets/img/icon_play.png">
          <p class="title" v-html="item.name"></p>
        </li>
      </ul>
    </div>
    <el-dialog title="精彩视频" :visible.sync="isDisplayDialog" :modal="false" v-on:open="open" v-on:close="close">
      <video
              id="videosPlayer"
              width="470"
              height="280"
              autoplay="true"
              controls
              loop
              v-bind:src="playUrl">
      </video>
    </el-dialog>
  </div>
</template>
<style>
  .videos{ background-color: #fff; }
  .videos-bd{ padding: 5px 20px 15px; }
  .videos-list li{ overflow: hidden; position: relative; width: 270px; height: 150px; margin: 10px 0 0; background: #000; cursor: pointer; }
  .videos-preview{ position: absolute; width: 100%; height: 100%; }
  .videos-icon-play{ position: absolute; left: 50%; top: 50%; z-index: 9; width: 50px; height: 50px; margin: -25px 0 0 -25px; }
  .videos-list .title{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: absolute; left: 0; bottom: 0;
      width: 94%; height: 35px; padding: 0 3%; line-height: 35px; color: #fff; background-color: rgba(0,0,0,0.5); }
  .videos video{ display: block; }
  .videos .el-dialog{ width: 510px; }
  .videos .el-dialog__body{ padding: 10px 20px 10px; }
</style>
<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'videos',
  data () {
    return {
      playUrl: '',
      isDisplayDialog: false
    }
  },
  components: {
    columnHeader
  },
  computed: mapGetters({
    isVisitor: 'isVisitor',
    videos: 'videos'
  }),
  methods: {
    visitorClick () {
      alert('请登录')
    },
    selectVideo (url) {
      this.playUrl = url
      this.isDisplayDialog = true
    },
    open () {
      // console.log('open')
    },
    close () {
      this.playUrl = ''
    }
  }
}
</script>
