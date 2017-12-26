<template>
  <div id="app" class="main-body" v-bind:style="{background: mainBg}">
    <!-- 页头 -->
    <layoutHeader></layoutHeader>

    <div class="layout-wrap">
      <div class="clear mt15">
        <div class="layout-l">
          <!-- 播放 -->
          <layoutPlayer></layoutPlayer>
          <!-- 分享 -->
          <shareBar></shareBar>
          <!-- 直播简介 -->
          <liveIntro class="mt10"></liveIntro>
          <!-- 图文直播 -->
          <teletext class="mt10"></teletext>
        </div>
        <div class="layout-r">
          <!-- 聊天 -->
          <chatRoom></chatRoom>
          <!-- 资料下载 -->
          <download class="mt15"></download>
        </div>
      </div>
    </div>

    <layoutFooter></layoutFooter>
  </div>
</template>

<script>
import api from './api/'
import layoutHeader from './components/header'
import layoutPlayer from './components/layoutPlayer'
import chatRoom from './components/chatRoom'
import liveIntro from './components/liveIntro'
import download from './components/download'
import shareBar from './components/shareBar'
import teletext from './components/teletext'
import layoutFooter from './components/common/footer'
import { mapGetters } from 'vuex'
import { getCookie } from './assets/js/common.js'

// 后端需要此字段
const clickFrom = getCookie('clickFrom')
if (clickFrom) {
  window.socketKey.clickFrom = clickFrom
}

export default {
  name: 'app',
  components: {
    layoutHeader,
    layoutPlayer,
    chatRoom,
    liveIntro,
    download,
    shareBar,
    teletext,
    layoutFooter
  },
  computed: {
    mainBg () {
      const url = this.room.backgroundUrl
      const color = this.room.backgroundColor || '#2c323e'
      return url
      ? 'url(' + url + ') center top no-repeat fixed ' + color
      : color || '#2c323e'
    },
    ...mapGetters([
      'user',
      'room',
      'isVisitor'
    ])
  },
  methods: {
    playSoundTips () {
      document.getElementById('soundTips').play()
    }
  },
  mounted () {
    this.$store.commit('setRoomInfo', {
      roomId: window.socketKey.roomId,
      mode: window.socketKey.mode,
      sessionId: window.socketKey.sessionId
    })

    if (window.socketKey.loginType === 2) {
      this.$store.commit('setUserInfo', {
        userType: 5
      })
    }

    // ofweekFlashPlayer 初始化完成
    window.ofweekLiveInitComplete = () => {
      window.socket = document.getElementById('ofweekPlayer')
      window.socket.connectSocket([80, 9081])
    }

    // socket 连接中
    window.serverConnecting = msg => {
      console.log(msg)
    }

    // socket 连接成功
    window.serverConnectSuccess = () => {
      window.socket.setLoginInfo(window.socketKey) // 设置socket连接信息
    }

    // socket 连接失败
    window.serverConnectFailed = msg => {
      console.log(msg)
    }

    // 服务端返回错误
    window.dataRequestError = msg => {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        type: 'error',
        customClass: 'w350',
        showCancelButton: false,
        callback () {
          if (msg === '黑名单用户') {
            location.href = 'http://live.ofweek.com/'
          }
        }
      })
    }

    // 设置socket连接信息成功
    window.loginInfoSetComplete = () => {
      api.onChangeRoomStatus(data => {
        this.$store.commit('setRoomInfo', { status: data.status })
      })
      api.onLive(data => {
        this.$store.commit('setLiveType', data.type)
        this.$store.commit('setPPTPageIndex', data.page)
        this.$store.commit('setPPTId', data.pptId)
        this.$store.commit('setSeek', data.seek)
        this.$store.commit('setDownStreamUrl', data.hlsDownstream)
      })
      api.onStartLiveCallback(data => {})
      api.onVodLive(data => {
        this.$store.commit('setLiveType', 'vod')
        this.$store.commit('setSeek', data.seek)
        this.$store.commit('setDownStreamUrl', data.vodName)
      })
      api.onStartVodLiveCallback(data => {})
      api.onLiveEnd(data => {
        this.$store.commit('resetLiveInfo')
      })
      api.onVodLiveEnd(data => {
        this.$store.commit('resetLiveInfo')
      })
      api.onNotFindStream(() => {
        this.$alert('没有直播流！', '提示', {
          type: 'warning',
          customClass: 'w350'
        })
        .then(() => {
          this.$store.commit('resetLiveInfo')
        })
        .catch(() => {
          this.$store.commit('resetLiveInfo')
        })
      })
      api.onPPTChangePage(data => {
        this.$store.commit('setPPTPageIndex', data.page)
      })
      api.onPublicChatMessage(data => {
        this.playSoundTips()
        const sender = {}
        sender.userId = 'publicSessions'
        this.$store.dispatch('receiveNewMessage', { sender, message: data })
      })
      api.onPrivateChatMessage(data => {
        this.playSoundTips()
        const sender = data.author
        const message = {}
        message.chatTime = data.chatTime
        message.type = 2
        message.content = data.content
        message.id = data.id
        message.roomId = data.roomId
        this.$store.dispatch('receiveNewMessage', { sender, message })
      })
      api.onChangePresentCount(data => {
        this.$store.commit('setPresentCount', data.count)
      })
      api.onChangeOnlineCount(data => {
        this.$store.commit('setOnlineCount', data.count)
      })
      api.onUserEntry(data => {
        this.$store.commit('addBroadcast', data.name + ' 进入')
        this.$store.commit('addOnlineUser', data)
        this.$store.commit('updateAdminUserOnlineStatus', {
          userId: data.userId,
          status: true
        })
      })
      api.onUserQuit(data => {
        this.$store.commit('deleteOnlineUser', data.userId)
        this.$store.commit('updateAdminUserOnlineStatus', {
          userId: data.userId,
          status: false
        })
      })
      api.onIssueTeletext(data => {
        this.$store.commit('receiveTeletext', data)
      })
      api.onDeleteTeletext(data => {
        this.$store.commit('deleteTeletext', data.id)
      })

      this.$store.dispatch('getUserInfo')
      this.$store.dispatch('getRoomInfo')
      this.$store.dispatch('getDownload')
      this.$store.dispatch('getMediaDevice')
      this.$store.dispatch('getAllPPT')
      this.$store.dispatch('getAllVOD')
      this.$store.dispatch('getOnlineUser', { start: 0, size: 10 })
      this.$store.dispatch('getAdminUser')
      this.$store.dispatch('getPublicChatMessages', { start: 0, size: 10 })
      this.$store.dispatch('getReplayVideos')
      this.$store.dispatch('getContacts')
      this.$store.dispatch('getTeletext', { start: 0, size: 10 })
    }
  },
  watch: {
    room: function (newRoom, oldRoom) {
      // 游客进入会员模式下自动弹出登录窗口且暂停直播
      // 关闭登录弹窗需要提示
      if (this.isVisitor && newRoom.watchMode === 1) {
        const cancel = () => {
          this.$confirm('关闭后将退出直播间，确定要退出吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass: 'w350'
          })
          .then(() => {
            location.href = 'http://live.ofweek.com/'
          })
          .catch(() => {
            window.showLoginDialog({
              title: '请登录后继续观看',
              cancel
            })
          })
        }
        setTimeout(() => {
          window.showLoginDialog({
            title: '请登录后继续观看',
            cancel
          })
          // 暂停直播
          api.playStateToggle('pause')
          // 暂定回顾
          const replayer = document.getElementById('rePlayer')
          if (replayer) {
            replayer.pause()
          }
        }, 180e3)
      }
    }
  }
}
</script>
