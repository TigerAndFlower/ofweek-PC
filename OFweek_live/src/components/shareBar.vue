<template>
  <div class="share-bar">
    <!-- 微信二维码 -->
    <el-popover
      ref="popover1"
      placement="bottom-start"
      width="150"
      v-model="popover1"
      trigger="hover">
      <div class="qr-code">
        <qriously :value="pageUrl" :size="135"></qriously>
      </div>
    </el-popover>
    <!-- APP下载二维码 -->
    <el-popover
      ref="popover2"
      placement="bottom-start"
      width="320"
      v-model="popover2"
      trigger="hover">
      <div class="clear qr-code">
        <div class="code-img">
          <img src="../assets/img/app_code.png" alt="扫一扫下载APP">
        </div>
        <p class="txt">下载OFweek APP<br>直播体验更流畅</p>
      </div>
    </el-popover>
    <!-- 手机观看二维码 -->
    <el-popover
      ref="popover3"
      placement="bottom-start"
      width="320"
      v-model="popover3"
      trigger="hover">
      <div class="qr-code">
        <div class="code-img" id="codePhone">
          <qriously :value="pageUrl" :size="135"></qriously>
        </div>
        <p class="txt">扫一扫<br>随时看行业直播</p>
      </div>
    </el-popover>

    <div class="fl share-other"><i class="iconfont icon-a"></i>分享至
      <div class="share-btn">
        <a href="javascript:" class="iconfont icon-weichat" title="微信" v-popover:popover1></a><!--
        --><a v-bind:href="weibo" target="_blank" class="iconfont icon-xinlang" title="微博"></a><!--
        --><a v-bind:href="qzone" target="_blank" class="iconfont icon-Qzone" title="QQ空间"></a><!--
        --><a v-bind:href="qq" target="_blank" class="iconfont icon-QQ" title="QQ"></a>
      </div>
    </div>
    <span class="share-fence">|</span>
    <div class="fl share-download-app" v-popover:popover2>APP观看</div>
    <span class="share-fence">|</span>
    <div class="fl share-mobile-watch" v-popover:popover3>手机观看</div>
  </div>
</template>

<style>
  .share-bar{ height: 40px; padding: 0 15px; line-height: 40px; color: #fff; background-color: #3a3a3a; }
  .share-fence{ float: left; padding: 0 1em; line-height: 38px; color: #bcbcbc; }
  .share-other .icon-a{ position: absolute; left: 0; font-size: 24px; color: #c00; }
  .share-btn{ overflow: hidden; position: relative; display: inline-block; width: 0; height: 39px; vertical-align: top; line-height: 39px; transition: all 0.4s; }
  .share-other:hover .share-btn{ width: 132px; }
  .share-btn a{ margin-left: 5px; font-size: 28px; vertical-align: middle; text-decoration: none; }
  .share-btn .icon-weichat{ color: #8cc81b; }
  .share-btn .icon-xinlang{ color: #f56366; }
  .share-btn .icon-Qzone{ color: #f5be40; }
  .share-btn .icon-QQ{ color: #68a5e2; }
  
  .share-download-app{ background: url(../assets/img/icon_app.png) left center no-repeat; }
  .share-mobile-watch{ background: url(../assets/img/icon_phone.png) left center no-repeat; }
  .share-other, .share-download-app, .share-mobile-watch{ position: relative; padding: 0 0 0 2em; cursor: pointer; }
  .qr-code{ text-align: center; }
  .qr-code canvas{ margin: 0 auto; }
  .qr-code .code-img{ float: left; width: 135px; height: 135px; }
  .qr-code .txt{ float: right; width: 170px; margin: 40px 0 0; text-align: center; font: normal 18px/26px "Microsoft YaHei"; color: #cc0000; }
</style>

<script>
export default {
  name: 'shareBar',
  data () {
    return {
      pageUrl: location.href,
      weibo: 'http://www.jiathis.com/send/?webid=tsina' + '&title=' + document.title + '&url=' + location.href,
      qzone: 'http://www.jiathis.com/send/?webid=qzone' + '&title=' + document.title + '&url=' + location.href,
      qq: 'http://www.jiathis.com/send/?webid=cqq' + '&title=' + document.title + '&url=' + location.href,
      popover1: false,
      popover2: false,
      popover3: false
    }
  }
}
</script>
