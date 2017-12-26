<template>
  <div class="ppt-live" v-show="liveType === 'ppt_live'" v-bind:class="{ 'full-screen-ppt': isFullScreen }">
    <div class="active-ppt" v-bind:class="{ 'full-screen-active-ppt': isFullScreen }">
      <img v-bind:src="currentPPTUrl">
      <span class="iconfont icon-close close-full-screen" v-if="isFullScreen" v-on:click="zoomOut"></span>
      <div v-if="!isLecturer" class="viewer-console">
        <div class="fr">
          <span title="全屏" class="iconfont icon-suofang_fang fr" v-if="!isFullScreen" v-on:click="zoomIn"></span>
          <span title="缩小" class="iconfont icon-suofang_suo fr" v-else v-on:click="zoomOut"></span>
        </div>
      </div>
    </div>
    <div class="handle-ppt" v-bind:class="{ 'full-screen-handle-ppt': isFullScreen }" v-if="isLecturer">
      <div class="all-ppt">
        <div class="all-ppt-wrap">
          <ul>
            <li v-for="(item, index) in pages" v-on:click="goToPage(item.page)" v-bind:class="{active: index === pptPageIndex - 1}">
              <img v-bind:src="prefix + item.url">
            </li>
          </ul>
        </div>
      </div>
      <span title="全屏" class="iconfont icon-suofang_fang" v-if="!isFullScreen" v-on:click="zoomIn"></span>
      <span title="缩小" class="iconfont icon-suofang_suo fr" v-else v-on:click="zoomOut"></span>
    </div>
  </div>
</template>

<style>
  .ppt-live{ overflow: hidden; position: absolute; left: 0; top: 0; z-index: 9; width: 100%; height: 100%; background-color: #fff; }
  .full-screen-ppt{ position: fixed; z-index: 1000; }
  .active-ppt{ position: relative; width: 100%; height: 100%; text-align: center; transition: all 0.4s; }
  .active-ppt img{ height: 100%; }
  .full-screen-active-ppt{ position: fixed; left: 0; top: 0; z-index: 999; background-color: rgba(0,0,0,0.8); }
  .full-screen-active-ppt img{ position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); height: auto; max-width: 100%; max-height: 100%; }
  .close-full-screen{ position: absolute; right: 0; top: 0; width: 75px; text-align:center; font-size: 50px; color: #fff; cursor: pointer; }
  .viewer-console{ position: absolute; left: 0; bottom: -35px; width: 100%; height: 35px; background: rgba(0,0,0,0.5); transition: all 0.4s; }
  .active-ppt:hover .viewer-console{ bottom: 0; }
  .icon-suofang_fang, .icon-suofang_suo{ width: 35px; height: 35px; line-height: 35px; text-align: center; color: #fff; font-size: 20px; cursor: pointer; }
  .icon-suofang_fang:hover, .icon-suofang_suo:hover{ color: #e8e8e8; }
  .handle-ppt{ position: absolute; left: 0; bottom: -100px; width: 100%; height: 100px; background: rgba(0,0,0,0.5); transition: all 0.4s; }
  .handle-ppt .icon-suofang_fang, .handle-ppt .icon-suofang_suo{ position: absolute; right: 0; top: 10px; }
  .full-screen-handle-ppt{ position: fixed; z-index: 9999; }
  .ppt-live:hover .handle-ppt{ bottom: 0; }
  .all-ppt{ overflow-x: auto; width: 580px; margin: 15px auto 0; white-space: nowrap; }
  .all-ppt li{ display: inline-block; width: 80px; height: 60px; margin-right: 15px; border: 2px solid transparent; cursor: pointer; }
  .all-ppt li.active{ border-color: #27aec2; }
  .all-ppt img{ width: 100%; height: 100%; }
</style>

<script>
import api from '../api'
import { mapGetters } from 'vuex'

export default {
  name: 'pptLive',
  data () {
    return {
      pages: [],
      prefix: '',
      isFullScreen: false
    }
  },
  computed: {
    currentPPTUrl () {
      return this.pages.length > 0
          ? this.prefix + this.pages[this.pptPageIndex - 1].url
          : ''
    },
    ...mapGetters({
      isLecturer: 'isLecturer',
      liveType: 'liveType',
      pptId: 'pptId',
      pptPageIndex: 'pptPageIndex'
    })
  },
  methods: {
    goToPage (pageIndex) {
      this.$store.dispatch('goToPPTPage', pageIndex)
    },
    zoomIn () {
      this.isFullScreen = true
    },
    zoomOut () {
      this.isFullScreen = false
    }
  },
  watch: {
    // 用户进入正在直播的房间，不会触发 liveType 和 pptId 的 watch，需到 mounted 中处理
    liveType: function (newType, oldType) {
      // 开启 PPT 后，立即将 全屏设置 和 PPT页码 重置
      if (newType === 'ppt_live') {
        this.isFullScreen = false
        this.$store.commit('setPPTPageIndex', 1)
      }
    },
    pptId: function (newId, oldId) {
      api.getPPTDetail(newId, data => {
        this.pages = data.pages || []
        this.prefix = data.prefix || ''
        this.$store.commit('setPPTPageIndex', 1)
      })
    }
  },
  mounted () {
    // 用户进入正在直播 PPT 的房间，请求播放中的 PPT 相关信息
    const type = this.liveType
    const pptId = this.pptId
    if (type === 'ppt_live') {
      api.getPPTDetail(pptId, data => {
        this.pages = data.pages || []
        this.prefix = data.prefix || ''
        this.$store.commit('setPPTPageIndex', this.pptPageIndex)
      })
    }
  }
}
</script>
