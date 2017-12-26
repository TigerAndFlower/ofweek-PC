<template>
  <div class="school-intro">
    <columnHeader title="学校简介 School Profile"></columnHeader>
    <div class="si-bd">
      <div class="clear si-bd-hd">
        <h3 class="si-name" v-html="schoolInfo.title"></h3>
        <a target="_blank" v-bind:href="schoolInfo.url" class="si-detail">>>学校详请 Details</a>
      </div>
      <div class="" v-html="schoolInfo.description"></div>
    </div>
  </div>
</template>

<style>
  .school-intro{ background-color: #fff; }
  .si-bd{ padding: 15px 30px; }
  .si-bd-hd{ margin: 0 0 20px; }
  .si-name{ float: left; font: normal 14px/1.5 "Microsoft Yahei"; }
  .si-detail{ float: right; }
  .si-detail:link, .si-detail:visited{ color: #27aec2; text-decoration: none; }
  .si-detail:hover{ text-decoration: underline; }
</style>

<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'schoolIntro',
  components: {
    columnHeader
  },
  computed: mapGetters({
    schoolInfo: 'schoolInfo'
  })
}
</script>
