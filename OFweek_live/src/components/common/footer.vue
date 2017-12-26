<template>
  <div class="layout-footer">
    <div class="layout-wrap">
      <div class="foot-wrap">
        <p class="footer-links">
          <a target="_blank" href="http://live.ofweek.com/index/help">直播指南</a> -
          <a target="_blank" href="http://www.ofweek.com/about/company.html">关于我们</a> -
          <a target="_blank" href="http://live.ofweek.com/index/contact">联系我们</a>
        </p>
        <p class="copyright">copyright © OFweek.com 网站所有图片、文字未经许可不得拷贝<br>
            备案号：<a target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/">粤ICP备06087881号-1</a></p>
      </div>
    </div>
  </div>
</template>

<style>
  .layout-footer{ margin: 20px 0 0; text-align: center; background: #fff; }
  .foot-wrap { display: inline-block; }
  .footer-links { padding: 26px 0 0; }
  .copyright,.footer-links { float: left; line-height: 24px; }
  .copyright { padding: 26px 120px 26px 50px; color: #666; background: url(http://live.ofweek.com/static/web/img/110.gif) 100% no-repeat; }
  .fixed-tools { position: fixed; right: 0; top: 50%; width: 50px; margin-top: -80px; }
  .layout-footer a:link, .layout-footer a:visited{ color: #333; text-decoration: none; }
  .layout-footer a:hover{ color: #cc0000; text-decoration: underline; }
</style>

<script>
export default {
  name: 'layoutFooter'
}
</script>

