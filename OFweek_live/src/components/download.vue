<template>
  <div class="download" v-if="download.length > 0">
    <columnHeader title="资料下载"></columnHeader>
    <div class="download-bd">
      <ul class="download-list">
        <li v-for="item in download">
          <a v-if="isVisitor" href="javascript:" v-on:click="visitorClick">
            <span v-html="item.name"></span>
          </a>
          <a v-else v-bind:href="item.url">
            <span v-html="item.name"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
  .download{ background-color: #fff; }
  .download-bd{ padding: 5px 20px 15px; }
  .download-list li{ margin: 10px 0 0; line-height: 1.5; vertical-align: top; }
  .download-list a{ display: block; padding-left: 30px; background: url('../assets/img/icon_download.png') left 0 no-repeat; }
  .download-list a:link, .download-list a:visited{ color: #4990E2; text-decoration: none; }
  .download-list a:hover{ text-decoration: underline; }
</style>
<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'download',
  components: {
    columnHeader
  },
  computed: mapGetters({
    isVisitor: 'isVisitor',
    download: 'download'
  }),
  methods: {
    visitorClick () {
      window.showLoginDialog()
    }
  }
}
</script>
