<template>
  <div class="chat-room">
    <div class="cr-hd">
      <h2>互动区</h2>
      <div class="fr">
        <i class="iconfont icon-renqi"></i>
        <span class="viewer-count">{{viewerCount.presentCount}}</span>
      </div>
    </div>
    <div class="cr-bd">
      <div class="cr-chat">
        <div class="cr-chat-log">
          <div id="chatLogWrap" class="cr-chat-log-wrap">
            <!--用户聊天的内容区-->
            <scrollBar classes="chat-scroll-bar" ref="scrollBar" :speed="60" :onMaxScroll="handleMaxScroll">
              <ul class="public-chat">
                <li class="chat-icon-loading" v-show="loading" v-loading="loading"></li>
                <li class="chat-message" v-for="item in sortedMessages" v-bind:id="'msg' + item.id">
                  <div class="clear">
                    <!--四个span判定说话的人的身份,显示对应的头像图标-->
                    <span class="avatar" v-if="item.author.tmpUserType === 3">
                      <img src="../assets/img/tx_lecturer.png" alt="">
                    </span>
                    <span class="avatar" v-else-if="item.author.tmpUserType === 4">
                      <img src="../assets/img/tx_service.png" alt="">
                    </span>
                    <span class="avatar" v-else-if="item.author.tmpUserType === 1">
                      <img src="../assets/img/tx_online.png" alt="">
                    </span>
                    <!--用户名和时间-->
                    <span class="name">{{item.author.name}}</span>
                    <span class="time">{{item.chatTime | date}}</span>
                  </div>
                  <!--用户说话的具体内容-->
                  <div class="content" v-html="faceToHTML(item.content)" v-on:mousedown="banDragImage"></div>
                </li>
              </ul>
            </scrollBar>
          </div>
        </div>
        <!--用户聊天的发送框-->
        <div class="chat-input">
          <div class="chat-input-hd">
            <p class="chat-visitor-tips" v-if="isVisitor"><a href="javascript:" v-on:click="showLogin">登录</a>发评论，参与主播互动</p>
            <el-input
                    type="textarea"
                    resize="none"
                    :disabled="isVisitor"
                    :placeholder="isVisitor ? '' : '请输入内容'"
                    v-on:keydown.native.enter.prevent="send"
                    v-model="content">
            </el-input>
          </div>
          <!--下面的笑脸按钮-->
          <div class="clear chat-input-fd">
            <div class="face" v-on:click="displayFace = !displayFace">
              <span class="iconfont icon-biaoqing"></span>
              <ul class="clear" v-if="!isVisitor" v-show="displayFace">
                <li v-for="(value, key) in face" v-on:click="selectFace(key)">
                  <img :src="faceUrl + value + '.gif'">
                </li>
              </ul>
            </div>
            <!--下面的发送按钮-->
            <el-button class="fr chat-send" size="small" type="primary" :disabled="isVisitor" v-on:click="send">发送</el-button>
          </div>
        </div>
      </div>

      <!-- 新消息提醒 -->
      <audio id="soundTips" src="../assets/sound/messages.mp3"></audio>
    </div>
  </div>
</template>

<style>
  .chat-room{ width: 390px; background: #fff; }
  .cr-hd{ height: 42px; padding: 0 10px; line-height: 42px; border-bottom: 1px solid #dfdfdf; }
  .cr-hd h2{ float: left; font: normal 16px/42px "Microsoft Yahei"; }
  .cr-bd{ overflow: hidden; position: relative; width: 100%; font: normal 12px/1.5 "Microsoft Yahei"; }
  .icon-renqi{ font-size: 22px; color: #f5813c; vertical-align: middle; }
  .viewer-count{ vertical-align: middle; }
  .cr-chat{ padding: 5px 10px; }
  .cr-chat-log{ height: 492px; }
  .cr-chat-log-wrap{ width: 370px; height: 100%; }
  .cr-chat-log-wrap ul{ width: 100%; }
  .cr-chat-log li{ position: relative; margin: 0 15px 10px 0; }
  .cr-chat-log li:after{ display: block; visibility: hidden; height: 0; content: "x"; clear: both; }
  .cr-chat-log li{ *zoom: 1; }
  .chat-log-time{ text-align: center; color: #bababa; }
  .chat-join-inform{ text-align: center; color: #9a9a9a; }
  .chat-photo{ position: absolute; left: 0; top: 0; width: 32px; height: 32px; border-radius: 50%;
    background: url(../assets/img/chat_photo2.png) center no-repeat #eee; }
  .chat-content{ float: left; min-height: 18px; padding: 8px 10px; margin-left: 42px; word-break: break-word; font: normal 12px/1.5 "Microsoft Yahei";
    border-radius: 4px; background-color: #efefef; }
  .chat-my-message .chat-photo{ left: auto; right: 0; top: 0; background: url(../assets/img/chat_photo1.png) center no-repeat #eee; }
  .chat-my-message .chat-content{ float: right; margin-left: auto; margin-right: 42px; color: #fff; background-color: #7DABB1; }
  .public-chat{ line-height: 24px; }
  .public-chat li{ padding: 10px 0 0; border-top: 1px solid #e0e0e1; }
  .public-chat .avatar{ float: left; margin-right: 5px; }
  .public-chat .name{ float: left; color: #0078b6; }
  .public-chat .time{ float: right; color: #999; }
  .public-chat .content{ margin-left: 30px; }
  .cr-chat-log .chat-icon-loading{ padding-top: 10px; margin-bottom: 0; border: 0; }
  .chat-icon-loading div{ position: static; margin: 0; }
  .chat-icon-loading .el-loading-spinner .circular{ width: 20px; height: 20px; }

  /* 聊天输入 */
  .chat-input{ margin: 5px 0 0; }
  .chat-input-hd{ position: relative; height: 53px; }
  .chat-visitor-tips{ position: absolute; left: 10px; top: 10px; }
  .chat-visitor-tips a:link, .chat-visitor-tips a:visited{ color: #cc0000; }
  .chat-input-hd .el-textarea__inner{ height: 53px; padding: 5px 10px; font-size: 12px; }
  .chat-input-hd .el-textarea__inner:focus{ border-color: #0078b6; }
  .chat-input-fd{ padding: 10px 0; }
  .face{ position: relative; float: left; width: 24px; height: 24px; margin-top: 4px; cursor: pointer; }
  .chat-input-fd .icon-biaoqing{ position: absolute; left: 0; top: 0; font-size: 24px; line-height: 1; color: #0078b6; }
  .face ul{ position: absolute; left: 0; bottom: 25px; width: 180px; border-left: 1px solid #d4d4d4; border-top: 1px solid #d4d4d4; }
  .face li{ float: left; width: 29px; height: 29px; text-align: center; border-right: 1px solid #d4d4d4; border-bottom: 1px solid #d4d4d4; background: #fff;}
  .face img{ margin-top: 3px; }

  /* 滚动条 */
  .chat-scroll-bar{ width: 380px; height: 492px; }
</style>

<script>
import { mapGetters } from 'vuex'
import scrollBar from 'vue2-scrollbar'

export default {
  name: 'chatRoom',
  data () {
    return {
      loading: false,
      // 表情
      faceUrl: 'http://live.ofweek.com/static/web/wap/live/assets/',
      displayFace: false,
      face: {
        '[调皮]': 'smile',
        '[憨笑]': 'biggrin',
        '[呲牙]': 'lol',
        '[偷笑]': 'titter',
        '[大兵]': 'db',
        '[色]': 'se',
        '[惊恐]': 'jk',
        '[疑问]': 'yiw',
        '[晕]': 'yun',
        '[惊讶]': 'shocked',
        '[再见]': 'zj',
        '[玫瑰]': 'mg',
        '[抱拳]': 'bq',
        '[握手]': 'handshake',
        '[OK]': 'hd',
        '[强]': 'qiang',
        '[胜利]': 'victory',
        '[咖啡]': 'kf'
      },
      faceRegExp: /(\[调皮\]|\[憨笑\]|\[呲牙\]|\[偷笑\]|\[大兵\]|\[色\]|\[惊恐\]|\[疑问\]|\[晕\]|\[惊讶\]|\[再见\]|\[玫瑰\]|\[抱拳\]|\[握手\]|\[OK\]|\[强\]|\[胜利\]|\[咖啡\])/g
    }
  },
  computed: {
    // 因为我们 v-model 绑定的是 Vuex 的 state 中的数据，所以 v-model 的双向绑定特性会直接修改state中的数据
    // 由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误
    // 因此我们需要使用一个带有 setter 的双向绑定计算属性
    content: {
      get () {
        return this.currentSpeakContent
      },
      set (value) {
        this.$store.commit('updateSpeakContent', value)
      }
    },
    // 消息列表排序
    // sort方法（在原数组上排序）会不经过 mutation 函数去修改 state，这在Vuex的严格模式中是不允许的
    // 因此我们需要使用slice函数生成一个消息数组的副本，在这个副本上排序并返回
    sortedMessages () {
      return this.currentSessionMessages.slice().sort((a, b) => a.chatTime - b.chatTime)
    },
    isPublicChat () {
      return this.currentSessionID === 'publicSessions'
    },
    ...mapGetters([
      'room',
      'user',
      'isAudience',
      'isAdmin',
      'isLecturer',
      'isService',
      'isVisitor',
      'viewerCount',
      'publicSessions',
      'privateSessions',
      'onlineUsers',
      'adminUsers',
      'currentSessionID',
      'currentSessionMessages',
      'currentSpeakContent'
    ])
  },
  methods: {
    showLogin () {
      window.showLoginDialog()
    },
    switchSessions (user, userType) {
      this.$store.commit('switchCurrentSessionID', user.userId)
      if (!this.isPublicChat && !this.privateSessions[user.userId]) {
        this.$store.commit('addPrivateSessions', { user, message: [] })
      }

      // 点击房间的主播/客服添加问候语
      if (userType === 3 || userType === 4) {
        this.handleClickAdminUser(user.userId)
      }

      this.$store.commit('updateUnreadCount', { sessionId: user.userId, number: 0 })
    },
    handleClickAdminUser (sessionId) {
      if (this.currentSessionMessages.length === 0) {
        const message = {}
        message.chatTime = 1
        message.type = 2
        message.content = this.isVisitor
            ? '请问有什么可以帮到您？'
            : this.user.name + '家长，请问有什么可以帮到您？'
        this.$store.commit('addMessage', { sessionId, message })
      }
    },
    faceToHTML (value) {
      if (!value) return ''
      const url = this.faceUrl
      const face = this.face
      value = value.replace(this.faceRegExp, function (word) {
        return '<img src="' + url + face[word] + '.gif" />'
      })
      return value
    },
    selectFace (face) {
      this.content += face
      document.querySelector('.chat-input-hd textarea').focus()
    },
    send () {
      const content = this.currentSpeakContent

      // 游客需要登录
      if (this.isVisitor) {
        this.showLogin()
        return
      }

      // 预览模式不能发送
      if (this.room.mode === 1) {
        return
      }

      if (!content) {
        return
      }

      if (this.isPublicChat) {
        this.$store.dispatch('sendPublicChatMessage', {content})
      } else {
        this.$store.dispatch('sendPrivateChatMessage', { content, sendTo: [this.currentSessionID] })
      }
    },

    // 滚动条到顶端的时候需要加载历史记录
    // 做延迟处理是为了更好的交互，使加载数据显得不那么生硬
    handleMaxScroll (direction) {
      if (direction.top && this.isPublicChat) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          const start = this.currentSessionMessages.length
          this.$store.dispatch('getPublicChatMessages', { start, size: 10 })
        }, 1000)
      }
    },

    /**
     * 在 Y 轴上滚动 scroll-bar
     *
     * @param {string} elementId 元素选择器，接收包裹所有聊天消息的UL，或者是具体某条消息的LI。
          如果不传第二个参数 position，那么 elementId 必须是具体某条消息的LI
          如果传了第二个参数 position，那么 elementId 必须是包裹所有聊天消息的UL
     * @param {string=} position 值为'top'|'bottom'
     *
    */
    scrollTo (elementId, position) {
      setTimeout(() => {
        let y = 0

        switch (position) {
          case 'top':
            y = 0
            break
          case 'bottom':
            y = document.querySelector(elementId).offsetHeight
            break
          default:
            y = document.querySelector(elementId).offsetTop
        }
        this.$refs.scrollBar.scrollToY(y)
      }, 300)
    },

    // 禁止拖动表情图片
    banDragImage (e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }
  },
  watch: {
    sortedMessages: function (newArr, oldArr) {
      if (newArr.length === 0) {
        return
      }
      const newArrFirstItem = newArr[0]
      const newArrLastItem = newArr[newArr.length - 1]
      const oldArrFirstItem = oldArr[0]
      const oldArrLastItem = oldArr[oldArr.length - 1]
      const isMyNewMsg = isMyNewMessage(newArrLastItem, this.user.userId, this.isPublicChat)

      // 如果新旧数组的第一项不相等 并且 最后一项相等，说明添加了历史消息
      // 滚动条位置应该在旧数组的第一项
      if (newArrFirstItem !== oldArrFirstItem && newArrLastItem === oldArrLastItem) {
        this.scrollTo('#msg' + oldArrFirstItem.id)
      }

      // 如果新旧数组的第一项相等 并且 最后一项不相等，说明添加了新的聊天消息
      // 如果新消息是自己发送的，则滚动条应滚动到最下面
      // 如果新消息不是自己发送的，并且滚动条位置在指定区间内（靠下方）时，滚动到最下面
      if (newArrFirstItem === oldArrFirstItem && newArrLastItem !== oldArrLastItem) {
        const ulHeight = document.querySelector('#chatLogWrap ul').offsetHeight
        const top = this.$refs.scrollBar.top
        if (isMyNewMsg) {
          this.scrollTo('#chatLogWrap ul', 'bottom')
        } else if (!isMyNewMsg && (ulHeight - top < 450)) {
          this.scrollTo('#chatLogWrap ul', 'bottom')
        }
      }

      // 如果新旧数组的第一项不相等 并且 最后一项不相等，说明切换了聊天会话
      // 滚动条滚动到最下面
      if (newArrFirstItem !== oldArrFirstItem && newArrLastItem !== oldArrLastItem) {
        this.scrollTo('#chatLogWrap ul', 'bottom')
      }
    }
  },
  mounted () {
    // 鼠标点击任何地方都隐藏表情
    document.body.addEventListener('click', (e) => {
      if (e.target.className.indexOf('icon-biaoqing') < 0) {
        this.displayFace = false
      }
    })
  },
  components: {
    scrollBar
  }
}

// 判断新消息是否自己发送的
function isMyNewMessage (message, userId, isPublicSessions) {
  return isPublicSessions
      ? message.author.userId === userId
      : message.type === 1
}
</script>
