<template>
  <div class="player-box" v-show="liveType === ''">
    <video
        id="player"
        width="672"
        height="378"
        controls
        loop
        v-bind:autoplay="autoplay"
        v-bind:src="currentUrl"
        v-on:ended="ended">
    </video>
  </div>
</template>

<style>
  .player-box{ position: relative; z-index: 3; width: 672px; height: 378px; }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'player',
  data () {
    return {
      autoplay: true,
      psvIndex: 0
    }
  },
  computed: {
    currentUrl () {
      const list = this.psvList[this.psvIndex]
      return list ? list.mp4Url : ''
    },
    ...mapGetters({
      liveType: 'liveType',
      psvList: 'psvList'
    })
  },
  methods: {
    // 播放结束时触发
    ended () {
      this.next()
    },
    // 播放下一个视频
    next () {
      const videoCount = this.psvList.length
      this.psvIndex = this.psvIndex < (videoCount - 1) ? this.psvIndex + 1 : 0
    },
    // 播放
    play () {
      document.getElementById('player').play()
    },
    // 暂停
    pause () {
      document.getElementById('player').pause()
    }
  },
  watch: {
    // 用户进入正在直播的房间，不会触发此 watch，需到 mounted 中处理
    liveType: function (a, b) {
      if (a) {
        this.pause()
      } else {
        this.play()
      }
    }
  },
  mounted () {
    // 用户进入正在直播的房间，需要将自动播放设置为 false
    // 不使用 this.pause() 的原因是：此时还没有得到视频地址，video 还未播放 无法调用其 pause 方法
    this.autoplay = !this.liveType
  }
}
</script>
