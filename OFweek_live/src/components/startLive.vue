<template>
  <div class="start-live">

    <div class="fr end-button">
      <el-button
              type="primary"
              size="small"
              v-show="liveType"
              v-on:click="endLive">
        结束直播
      </el-button>
    </div>

    <div class="fr">
      <el-button
              type="primary"
              size="small"
              v-show="liveType"
              v-on:click="switchLive">
        切换直播
      </el-button>
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
  .start-live{ position: absolute; right: 10px; top: 10px; z-index: 100; }
  div.modal-live-menu{ width: 550px; margin: 0; border-radius: 4px; }
  div.modal-live-menu .el-dialog__header{ padding: 12px 20px; border-bottom: 1px solid #e9eaec; }
  div.modal-live-menu .el-dialog__title{ font-weight: normal; font-size: 16px; }
  div.modal-live-menu .el-dialog__headerbtn{ margin-top: 3px; }
  div.modal-live-menu .el-dialog__body{ padding: 10px 20px 0; }
  .end-button{ margin-left: 10px; }
  .end-button .el-button--primary{ border-color: #555; background-color: #555; }
  .end-button .el-button--primary:hover{ border-color: #666; background-color: #666; }
</style>

<script>
import liveMenu from './liveMenu'
import api from '../api'
import { mapGetters } from 'vuex'

export default {
  name: 'startLive',
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
    // 开启直播按钮需要在直播开始前15分钟之后才显示
    isShowStart () {
      return this.serverTime > this.room.startTime - 15 * 60 * 1000
    },
    ...mapGetters({
      liveType: 'liveType',
      room: 'room',
      serverTime: 'serverTime'
    })
  },
  methods: {
    openMenu () {
      this.displayMenu = true
      this.openMode = 1
    },
    closeMenu () {
      this.openMode = 1
      this.displayMenu = false
    },
    endLive () {
      this.$confirm('确定结束本次直播?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'w350'
      })
      .then(() => {
        api.endLive(() => {
          // 预览模式结束直播不会收到socket通知
          if (this.room.mode === 1) {
            this.$store.commit('resetLiveInfo')
          }
        })
      })
      .catch(() => {
        // console.log('')
      })
    },
    switchLive () {
      this.displayMenu = true
      this.openMode = 2
    }
  }
}
</script>
