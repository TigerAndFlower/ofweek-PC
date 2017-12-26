<template>
  <div class="layout-player">
    <ofweekPlayer></ofweekPlayer>
    <startLive v-if="isLecturer && isOpen"></startLive>
    <pptLive v-if="isOpen && !isNeedPay"></pptLive>
    <liveCountDown v-if="isOpen"></liveCountDown>
    <liveReplay v-if="room.status === 4 && !isNeedPay"></liveReplay>
    <live-pay v-if="room.status !== 0 && isNeedPay"></live-pay>
  </div>
</template>

<style>
  .layout-player{ position: relative; width: 790px; height: 448px; background-color: #fff; }
</style>

<script>
import { mapGetters } from 'vuex'
import ofweekPlayer from './ofweekPlayer'
import pptLive from './pptLive'
import startLive from './startLive'
import liveCountDown from './liveCountDown'
import liveReplay from './liveReplay'
import livePay from './livePay'

export default {
  name: 'layoutPlayer',
  data () {
    return {
      hsaFlash: true
    }
  },
  components: {
    ofweekPlayer,
    pptLive,
    startLive,
    liveCountDown,
    liveReplay,
    livePay
  },
  computed: {
    // 房间状态为预告中 或者 进行中 status房间状态(0:待举办,2:进行中,4:结束)
    isOpen () {
      return this.room.status === 0 || this.room.status === 2
    },
//    isPay是否付费 0:否 1：是
//    payStatus该用户是否已支付，true已支付，false未支付
    isNeedPay () {
      return this.isAudience && this.room.isPay === 1 && !this.user.payStatus
    },
    ...mapGetters({
      room: 'room',
      user: 'user',
      isLecturer: 'isLecturer',
      isAudience: 'isAudience'
    })
  }
}
</script>
