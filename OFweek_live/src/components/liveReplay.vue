<template>
  <div class="replay" v-if="replayVideos">
    <div class="replay-no-videos" v-if="replayVideos.length === 0">
      <p class="text">直播已结束，敬请期待直播回顾！</p>
      <img v-if="room.reviewUrl" v-bind:src="room.reviewUrl">
      <img v-else src="../assets/img/replay_bg.png">
    </div>
    <div v-else>
      <div class="replay-cover" v-on:click="play" v-show="playStatus === 'end'">
        <img class="icon" src="../assets/img/icon_play.png">
        <img class="picture" v-if="room.reviewUrl" v-bind:src="room.reviewUrl">
        <img class="picture" v-else src="../assets/img/replay_bg.png">
      </div>
      <video
          id="rePlayer"
          width="790"
          height="448"
          controls
          v-bind:autoplay="false"
          v-bind:src="getVideoUrl"
          v-on:ended="ended">
      </video>
    </div>
  </div>
</template>

<style>
  .replay{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
  .replay-no-videos{ position: relative; width: 100%; height: 100%; }
  .replay-no-videos p{ position: relative; z-index: 3; }
  .replay-no-videos img{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
  .replay-no-videos .text{ font-size: 20px; line-height: 448px; color: #fff; text-align: center; text-shadow: 1px 1px 3px #333; }
  .replay-cover{ position: absolute; left: 0; top: 0; z-index: 9; width: 100%; height: 100%; cursor: pointer; }
  .replay-cover .icon{ position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 65px; }
  .replay-cover .picture{ width: 100%; height: 100%; }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'replay',
  data () {
    return {
      videoIndex: 0,
      playStatus: 'end' // playing | end | pause
    }
  },
  computed: {
    getVideoUrl () {
      return this.replayVideos.length > 0
        ? this.replayVideos[this.videoIndex].bPlayUrl
        : ''
    },
    ...mapGetters({
      room: 'room',
      replayVideos: 'replayVideos'
    })
  },
  methods: {
    play () {
      document.getElementById('rePlayer').play()
      this.playStatus = 'playing'
    },
    next () {
      const len = this.replayVideos.length
      const index = this.videoIndex
      this.videoIndex = index + 1 < len
        ? index + 1
        : 0
      // 立即播放会报错
      setTimeout(() => {
        this.play()
      }, 100)
    },
    ended () {
      this.next()
      this.playing = 'end'
    }
  }
}
</script>
