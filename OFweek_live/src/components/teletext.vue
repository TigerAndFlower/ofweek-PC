<template>
  <div class="teletext">
    <columnHeader :title="currentTitle"></columnHeader>
    <teletext-editor class="editor-teletext" v-if="isLecturer || isService" :message="message" :messageId="messageId"></teletext-editor>
    <div class="teletext-bd">
      <teletext-message
          v-for="item in sortedTeletextMessages"
          v-on:reedit="handleReedit(item)"
          :message="item"
          :key="item.id">
      </teletext-message>
      <p v-if="teletext.length === 0" class="no-teletext">暂无图文消息，精彩内容敬请期待！</p>
      <p class="teletext-no-more" v-if="isNoMore">全部加载完毕，敬请期待更多内容...</p>
      <div class="teletext-load-icon" v-else v-loading="displayLoadIcon"></div>
    </div>
  </div>
</template>

<style>
  .teletext{ background-color: #fff; }
  .editor-teletext{ padding: 20px 15px 10px; }
  .teletext-bd{ margin: 20px 15px 0; }
  .teletext-bd img{ max-width: 100%; }
  .editor-teletext .ql-container{ height: 250px; }
  .teletext-load-icon{ height: 40px; }
  .teletext-load-icon .el-loading-spinner .circular{ width: 28px; height: 28px; }
  .no-teletext{ padding: 50px 0 30px; text-align: center; color: #999; }
  .teletext-no-more{ height: 40px; text-align: center; line-height: 40px; }
</style>

<script>
import columnHeader from './columnHeader'
import teletextEditor from './teletextEditor'
import teletextMessage from './teletextMessage'
import { mapGetters } from 'vuex'

export default {
  name: 'teletext',
  data () {
    return {
      displayLoadIcon: false,
      asyncLoadFlag: true,
      isNoMore: false,
      message: '',
      messageId: ''
    }
  },
  components: {
    columnHeader,
    teletextEditor,
    teletextMessage
  },
  computed: {
    sortedTeletextMessages () {
      return this.teletext.slice().sort((a, b) => b.createDate - a.createDate)
    },
    currentTitle () {
      switch (this.room.status) {
        case 0:
          return '直播预告'
        case 2:
          return '直播进行中'
        case 4:
          return '直播回顾'
      }
    },
    ...mapGetters([
      'room',
      'teletext',
      'isLecturer',
      'isService'
    ])
  },
  methods: {
    handleReedit (data) {
      this.message = data.content
      this.messageId = data.id
    },
    asyncLoadTeletext () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.body.scrollHeight
      const windowHeight = document.documentElement.clientHeight
      if (height - scrollTop - windowHeight < 100 && this.asyncLoadFlag && !this.isNoMore && this.teletext.length > 0) {
        this.asyncLoadFlag = false
        this.displayLoadIcon = true
        setTimeout(() => {
          const self = this
          this.$store.dispatch('getTeletext', {
            start: this.teletext.length,
            size: 10,
            callback (data) {
              self.asyncLoadFlag = true
              self.displayLoadIcon = false
              self.isNoMore = data.length < 10
            }
          })
        }, 600)
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.asyncLoadTeletext)
    })
  }
}
</script>
