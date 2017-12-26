<template>
  <div class="ice-hd">
    <h2 class="ice-hd-title">{{title}}</h2>
  </div>
</template>

<style>
  .ice-hd{ position: relative; height: 40px; padding: 10px 0 0 10px; margin: 0 15px; font: normal 16px/30px "Microsoft Yahei"; border-bottom: 1px solid #e0e0e1; }
  .ice-hd-title{ float: left; font-size: 18px; font-weight: bold; color: #333; }
  .ice-hd-tab li{ float: left; margin-left: 30px; cursor: pointer; }
  .ice-hd-tab .current{ color: #27aec2; }
</style>

<script>
export default {
  name: 'columnHeader',
  props: ['title']
}
</script>
