<template>
  <div class="layout-header">
    <div class="layout-wrap clear">
      <div class="logo">
        <a target="_blank" v-bind:href="indexUrl"><img src="../assets/img/logo.png"></a>
      </div>
      <h1 class="live-title" v-html="room.name" v-bind:title="room.name"></h1>
      <div class="fr header-right">
        <div class="fl download-app">
          <!--element UI组件库中popover的显示与隐藏-->
          <el-popover
            ref="popover1"
            placement="bottom-start"
            width="320"
            v-model="popover1"
            trigger="hover">
            <div class="clear qr-code">
              <div class="code-img">
                <img src="../assets/img/app_code.png" alt="扫一扫下载APP">
              </div>
              <p class="txt">下载OFweek APP<br>直播体验更流畅</p>
            </div>
          </el-popover>
          <span class="download-app-txt" v-popover:popover1>APP下载</span>
        </div>
        <div class="fl username"><i class="iconfont icon-ren"></i> 欢迎您，
          <a class="name" target="_blank" v-bind:href="audienceBackUrl" v-bind:title="user.name" v-if="!isVisitor && !isRealLecturer">{{user.name || user.account}}</a>
          <a class="name" target="_blank" v-bind:href="lecturerBackUrl" v-bind:title="user.name" v-else-if="isRealLecturer">{{user.name || user.account}}</a>
          <span class="name" v-bind:title="user.name" v-else-if="isVisitor">{{user.name || user.account}}</span>
        </div>
        <div class="fl" v-if="isVisitor">
          <a class="header-login" href="javascript:" v-on:click="showLogin">登录</a>
          <a class="header-register" v-bind:href="registerUrl">注册</a>
        </div>
        <div class="fl logout" v-if="user.userType && !isVisitor">
          <span>｜</span><a v-bind:href="logoutUrl">退出</a>
        </div>
        <a v-bind:href="indexUrl" class="fr back-index">返回首页</a>
      </div>
    </div>
  </div>
</template>

<style>
  .layout-header{ height: 45px; border-bottom: 2px solid #ce0808; background-color: #fff; }
  .layout-header .layout-wrap{ margin-top: 0; }
  .logo{ float: left; margin-right: 5px; }
  .logo img{ height: 45px; }
  .live-title{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; float: left; width: 550px; padding: 15px 0 0; margin-left: 15px;
      font: normal 20px/26px "Microsoft Yahei"; }
  .header-right{ line-height: 45px; font-size: 12px; }
  .username .iconfont{ color: #909090; vertical-align: middle; }
  .username .name{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; max-width: 100px; vertical-align: middle; }
  .username span.name{ max-width: 55px; }
  .username a:link, .username a:visited{ color: red; text-decoration: none; }
  .username a:hover{ text-decoration: underline; }
  .header-login{ display: inline-block; width: 50px; height: 24px; margin-left: 10px; text-align: center; line-height: 24px; border-radius: 3px; text-decoration: none; }
  .header-login:link, .header-login:visited{ color: #fff; background-color: #e20000; }
  .header-login:hover{ opacity: .8; }
  .header-register{ margin-left: 5px; text-decoration: none; }
  .header-register:link, .header-register:visited{ color: #000; }
  .header-register:hover{ text-decoration: underline; }

  .logout span{ padding: 0 3px; }
  .logout a:link, .logout a:visited{ color: #333; vertical-align: middle; text-decoration: none; }
  .logout a:hover{ text-decoration: underline; }
  .back-index{ width: 145px; height: 32px; margin: 6px 0 0 15px; font: normal 16px/32px "Microsoft Yahei"; text-indent: 1em;
      background: url(../assets/img/sprite.png) -18px 0 no-repeat; }
  .back-index:link,.back-index:visited{ color: #fff; text-decoration: none; }
  .back-index:hover{ text-decoration: none; opacity: .75; }
  .download-app{ position: relative; margin-right: 10px; line-height: 45px; color: #666; }
  .download-app-txt{ display: block; padding: 0 0 0 20px; background: url(../assets/img/icon_download_app.png) left center no-repeat; cursor: pointer; }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      popover1: false,
      indexUrl: 'http://live.ofweek.com/',
      registerUrl: 'http://www.ofweek.com/user/ureg.do?regType=16&returnurl=' + location.href,
      logoutUrl: 'http://live.ofweek.com/logout',
      lecturerBackUrl: 'http://live.ofweek.com/room',
      audienceBackUrl: 'http://www.ofweek.com/usercenter/usercenter.do'
    }
  },
  computed: mapGetters([
    'room',
    'user',
    'isAudience',
    'isLecturer',
    'isVisitor',
    'isRealAudience',
    'isRealLecturer',
    'isRealService'
  ]),
  methods: {
    showLogin () {
      window.showLoginDialog()
    }
  }
}
</script>
