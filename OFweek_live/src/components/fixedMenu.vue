<template>
  <div class="fixed-menu">
    <div class="praise" @click="likeHere" v-bind:class="{ praised: praiseInfo.status === 1 }">
      {{praiseInfo.num}}
    </div>
    <div class="apply" v-if="isAudience || isVisitor" v-on:click="clickApplyStudy">报名入读</div>
    <div class="apply-success" v-if="applySucCountdown > -1">
      <div class="apply-success-box">{{applySucCountdown}}秒后自动关闭</div>
    </div>
    <div class="share">
      <span class="iconfont icon-a"></span>
      <span class="text">分享</span>
      <ul>
        <li class="weichat">
          <div class="page-code">
            <qriously :value="pageUrl" :size="120"></qriously>
          </div>
        </li>
        <li class="weibo">
          <a target="_blank" v-bind:href="weibo"></a>
        </li>
        <li class="qzone">
          <a target="_blank" v-bind:href="qzone"></a>
        </li>
        <li class="qq">
          <a target="_blank" v-bind:href="qq"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .fixed-menu{ position: absolute; right: -120px; top: 0; width: 110px; text-align: center; font-size: 14px; line-height: 50px; background: #fff; }
  .praise{ height: 50px; padding-left: 35px; color: #f6a623; font-size: 16px; background: url(../assets/img/icon_praise1.png) 15px center no-repeat; cursor: pointer; }
  .praised{ background: url(../assets/img/icon_praise2.png) 15px center no-repeat; }
  .apply{ border-top: 1px solid #e3e3e3; cursor: pointer; }
  .apply-success{ position: fixed; left: 0; top: 0; z-index: 999; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); }
  .apply-success-box{ position: fixed; left: 50%; top: 50%; z-index: 1000; width: 393px; height: 80px; padding: 215px 0 0; margin: -147px 0 0 -196px; color: #4990e2; line-height: 20px; letter-spacing: 1px; background: url(http://live.ieduchina.com/static/web/modules/booth/static/img/apply_success.ffedb14.png) center no-repeat; }
  .share{ position: relative; height: 50px; border-top: 1px solid #e3e3e3; cursor: pointer; }
  .share .text, .icon-a{ vertical-align: middle; }
  .icon-a{ margin-right: 5px; font-size: 28px; color: #888; }
  .share ul{ position: absolute; left: 0; width: 100%; }
  .share li{ position: relative; width: 50px; height: 0; margin: 0 auto; transform: translate(0, 0); transition: all 0.4s; }
  .share a{ display: block; width: 100%; height: 100%; }
  .share:hover li{ height: 50px; }
  .share:hover .weichat{ transform: translate(0, 10px); background: url(../assets/img/icon_weichat.png) center no-repeat; }
  .share:hover .weibo{ transform: translate(0, 15px); background: url(../assets/img/icon_xinlang.png) center no-repeat; }
  .share:hover .qzone{ transform: translate(0, 20px); background: url(../assets/img/icon_Qzone.png) center no-repeat; }
  .share:hover .qq{ transform: translate(0, 25px); background: url(../assets/img/icon_QQ.png) center no-repeat; }
  .page-code{ overflow: hidden; position: absolute; left: -10px; top: 0; width: 0; height: 120px; background: #fff; box-shadow: 0 0 4px #999; transition: all 0.4s; }
  .weichat:hover .page-code{ left: -130px; width: 120px; }
</style>

<script>
import { mapGetters } from 'vuex'
import api from '../api'

export default {
  name: 'fixedMenu',
  data () {
    return {
      pageUrl: location.href,
      weibo: 'http://www.jiathis.com/send/?webid=tsina' + '&title=' + document.title + '&url=' + location.href,
      qzone: 'http://www.jiathis.com/send/?webid=qzone' + '&title=' + document.title + '&url=' + location.href,
      qq: 'http://www.jiathis.com/send/?webid=cqq' + '&title=' + document.title + '&url=' + location.href,
      applySucCountdown: -1,
      isApplyStudy: false
    }
  },
  computed: mapGetters({
    praiseInfo: 'praiseInfo',
    isAudience: 'isAudience',
    isVisitor: 'isVisitor',
    room: 'room',
    user: 'user'
  }),
  methods: {
    likeHere () {
      if (this.isVisitor) {
        window.showLoginDialog()
        return
      }
      if (this.praiseInfo.status === 0) {
        this.$store.dispatch('likeHere')
      }
    },
    clickApplyStudy () {
      if (this.isVisitor) {
        window.showLoginDialog()
        return
      }
      if (this.isApplyStudy) {
        this.$message('已报名')
        return
      }

      const roomId = this.room.roomId
      const userId = this.user.userId
      const self = this

      function updateCountdown () {
        const countdown = self.applySucCountdown
        if (countdown > -1) {
          setTimeout(() => {
            self.applySucCountdown = countdown - 1
            updateCountdown()
          }, 1000)
        }
      }

      api.applyStudy({
        roomId,
        userId,
        success (response) {
          if (response.data.code === 500) {
            self.isApplyStudy = true
            self.$message(response.data.message)
          } else {
            self.applySucCountdown = 3
            updateCountdown()
          }
        },
        error (response) {
          const message = response.data.message || '请求错误'

          self.$confirm(message, '提示', {
            confirmButtonText: '确定',
            type: 'error',
            customClass: 'w350',
            showCancelButton: false
          })
        }
      })
    }
  }
}
</script>
