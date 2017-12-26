<template>
  <div class="live-count-down" v-show="liveType === ''">
    <img class="bg" v-if="room.reviewUrl" v-bind:src="room.reviewUrl">
    <img class="bg" src="../assets/img/replay_bg.png" v-else>

    <div class="shade">
      <div class="lcd-content">
        <p class="title" v-if="isOvertime || room.status === 2">直播即将开始</p>
        <div v-else>
          <p class="title">开播倒计时</p>
          <p class="time">
            <span>{{time.d.toString().charAt(0)}}</span>
            <span class="units-digit">{{time.d.toString().charAt(1)}}</span>
            <span>{{time.h.toString().charAt(0)}}</span>
            <span class="units-digit">{{time.h.toString().charAt(1)}}</span>
            <span>{{time.m.toString().charAt(0)}}</span>
            <span class="units-digit">{{time.m.toString().charAt(1)}}</span>
            <span>{{time.s.toString().charAt(0)}}</span>
            <span>{{time.s.toString().charAt(1)}}</span>
          </p>
          <p class="units">
            <span>天</span><span>时</span><span>分</span><span>秒</span>
          </p>
        </div>
        <div class="mt25" v-if="isAudience">
          <el-button class="lcd-button" type="primary" v-if="!user.registered && room.status === 0 && !isOvertime" v-on:click="bookLive">预约直播</el-button>
          <el-button class="lcd-button" type="primary" v-if="user.registered && room.status === 0 && !isOvertime" :disabled="true">已预约</el-button>
          <p class="mt20 pay-tips" v-if="room.isPay === 1 && !user.payStatus">该直播须付费才能观看，票价：¥{{room.fare}}，请点击
            <a href="javascript:" v-if="isVisitor" v-on:click="showLogin">立即购买</a>
            <a v-bind:href="payUrl" v-else>立即购买</a>
          </p>
        </div>
        <div class="mt35" v-if="isLecturer">
          <el-button class="lcd-button" type="primary" v-on:click="openMenu" :disabled="room.mode === 2 && !entryLiveTime">开始直播</el-button>
        </div>
      </div>
    </div>

    <el-dialog
            title="选择直播模式"
            :visible.sync="displayMenu"
            :modal-append-to-body=false
            custom-class="modal-live-menu"
            size="tiny">
            <liveMenu v-on:closeMenu="closeMenu" :open-mode="openMode"></liveMenu>
    </el-dialog>
  </div>
</template>

<style>
  .live-count-down{ position: absolute; left: 0; bottom: 0; z-index: 9; width: 100%; height: 100%; }
  .live-count-down .bg{ width: 100%; height: 100%; }
  .live-count-down .shade{ position: absolute; left: 0; top: 0; z-index: 1; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); }
  .lcd-content{ position: absolute; left: 0; top: 50%; z-index: 1; width: 100%; text-align: center; color: #fff; transform: translate(0, -50%); }
  .lcd-content .title{ font-size: 22px; }
  .lcd-content .time{ margin: 20px 0 0; font-size: 0; }
  .lcd-content .time span{ position: relative; display: inline-block; width: 50px; height: 60px; margin: 0 5px 0 0; font-size: 50px; line-height: 60px; 
      border-radius: 5px; background-color: rgba(255,255,255,0.35); }
  .lcd-content .time .units-digit{ margin-right: 25px; }
  .lcd-content .time span:after{ position: absolute; left: 0; top: 50%; width: 100%; height: 0; content: ''; border-top: 1px solid rgba(0,0,0,0.05); }
  .lcd-content .units{ margin: 10px 0 0; }
  .lcd-content .units span{ margin: 0 55px; font-size: 18px; }
  .lcd-button{ padding: 12px 30px; font-size: 20px; }
  .pay-tips a:link, .pay-tips a:visited{ color: #cc0000; text-decoration: none; }
  .pay-tips a:hover{ text-decoration: underline; }

  div.modal-live-menu{ width: 550px; border-radius: 4px; }
  div.modal-live-menu .el-dialog__header{ padding: 12px 20px; border-bottom: 1px solid #e9eaec; }
  div.modal-live-menu .el-dialog__title{ font-weight: normal; font-size: 16px; }
  div.modal-live-menu .el-dialog__headerbtn{ margin-top: 3px; }
  div.modal-live-menu .el-dialog__body{ padding: 10px 20px 0; }
</style>

<script>
import liveMenu from './liveMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'liveCountDown',
  data () {
    return {
      displayMenu: false,
      openMode: ''
    }
  },
  components: {
    liveMenu
  },
  computed: {
    time () {
      const t = (this.room.startTime - this.serverTime) / 1000
      let d = Math.floor(t / 3600 / 24) || 0
      let h = Math.floor((t / 3600) % 24) || 0
      let m = Math.floor((t / 60) % 60) || 0
      let s = Math.floor(t % 60) || 0

      d = d < 10 ? '0' + d : d
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return { d, h, m, s }
    },
    isOvertime () {
      return this.room.startTime < this.serverTime
    },
    entryLiveTime () {
      return (this.room.startTime - 15 * 60 * 1000) < this.serverTime
    },
    payUrl () {
      let url = 'http://live.ofweek.com/order/pay?source=PC'
      url += '&backUrl=' + location.href
      url += '&userId=' + this.user.userId
      url += '&roomId=' + this.room.roomId
      return url
    },
    ...mapGetters(['room', 'user', 'isAudience', 'isVisitor', 'isLecturer', 'serverTime', 'liveType'])
  },
  methods: {
    showLogin () {
      window.showLoginDialog()
    },
    bookLive () {
      if (this.isVisitor) {
        this.showLogin()
        return
      }
      this.$store.dispatch('bookLive')
    },
    openMenu () {
      this.displayMenu = true
      this.openMode = 1
    },
    closeMenu () {
      this.openMode = 1
      this.displayMenu = false
    }
  }
}
</script>
