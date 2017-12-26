<template>
  <div class="live-pay">
    <img class="bg" v-if="room.reviewUrl" v-bind:src="room.reviewUrl">
    <img class="bg" src="../assets/img/replay_bg.png" v-else>
    <div class="shade">
      <div class="content">
        <p class="mt20">本场直播为付费直播，请购买后观看。</p>
        <p>（已购买用户直接登录观看）</p>
        <p class="mt10">票价：¥{{room.fare}}</p>
        <div class="mt10">
          <a class="btn btn-login" href="javascript:" v-if="isVisitor" v-on:click="showLogin">登录</a>
          <a class="btn btn-pay" v-if="isVisitor" href="javascript:" v-on:click="showLogin">立即购买</a>
          <a class="btn btn-pay" v-else v-bind:href="payUrl">立即购买</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .live-pay{ position: absolute; left: 0; top: 0; z-index: 9; width: 100%; height: 100%; background-color: #999; }
  .live-pay .bg{ width: 100%; height: 100%; }
  .live-pay .shade{ position: absolute; left: 0; top: 0; z-index: 1; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }
  .live-pay .content{ position: absolute; left: 0; top:50%; width: 100%; text-align: center; color: #fff; transform: translate(0, -50%); }
  .live-pay .btn{ display: inline-block; width: 108px; height: 30px; margin: 0 10px; text-align: center; line-height: 30px; text-decoration: none; border-radius: 5px; }
  .live-pay .btn-login:link, .live-pay .btn-login:visited{ color: #333; background-color: #E0E0E0; }
  .live-pay .btn-pay:link, .live-pay .btn-pay:visited{ color: #fff; background-color: #CC0000; }
  .live-pay .btn:hover{ background-color: #bd0202; }
</style>
  
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'livePay',
  computed: {
    payUrl () {
      let url = 'http://live.ofweek.com/order/pay?source=PC'
      url += '&backUrl=' + location.href
      url += '&userId=' + this.user.userId
      url += '&roomId=' + this.room.roomId
      return url
    },
    ...mapGetters([
      'room',
      'user',
      'isVisitor'
    ])
  },
  methods: {
    showLogin () {
      window.showLoginDialog()
    }
  }
}
</script>

