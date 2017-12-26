<template>
  <div class="ofweek-player">
    <div id="ofweekPlayer"></div>
    <!-- 浏览器无flash提示 -->
    <p class="no-flash" v-if="!hasFlash">
      <a target="_blank" href="https://get2.adobe.com/cn/flashplayer/">您还没有安装flash播放器,请点击这里安装</a>
    </p>
  </div>
</template>

<style>
  .ofweek-player{ position: absolute; left: 0; top: 0; }
  .ofweek-player object{ display: block; }
  .no-flash{ text-align: center; line-height: 448px; }
</style>

<script>
import swfobject from 'swfobject'

export default {
  name: 'ofweekPlayer',
  data () {
    return {
      hasFlash: true
    }
  },
  created () {
    const self = this
    const url = 'http://live.ofweek.com/static/web/swf/20171127092905/'
    swfobject.embedSWF(
      url + 'OFweekLive.swf',
      'ofweekPlayer',
      '790',
      '448',
      '11.1.0',
      url + 'swf/assets/swf/expressInstall.swf',
      {},
      {
        swliveconnect: 'true',
        allowScriptAccess: 'always',
        allowfullscreen: 'true',
        wmode: 'opaque'
      },
      {
        id: 'ofweekPlayer',
        name: 'ofweekPlayer'
      },
      function (data) {
        self.hasFlash = data.success
      }
    )
  }
}
</script>
