/**
 * Created by Administrator on 2017/7/7.
 */
import axios from 'axios'
import listener from './listener'

const api = { ...listener }

function loadScript (url, callback) {
  let head = document.getElementsByTagName('head')[0]
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  script.onload = script.onreadystatechange = function () {
    if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
      callback && callback()
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null
      if (head && script.parentNode) {
        head.removeChild(script)
      }
    }
  }
  head.insertBefore(script, head.firstChild)
}

// 获取用户信息
api.getUserInfo = function (cb) {
  window.loginCallBack = cb
  window.socket.sendRequest('0100', window.socketKey, 'loginCallBack')
}

// 房间信息
api.getRoomInfo = function (cb) {
  window.roomInfoCallBack = cb
  window.socket.sendRequest('0300', {}, 'roomInfoCallBack')
}

// 下载资料
api.getDownload = function (cb) {
  window.downloadCallBack = cb
  window.socket.sendRequest('0310', {}, 'downloadCallBack')
}

// 预约/登记 直播
api.bookLive = function (cb) {
  window.bookLiveCallBack = cb
  window.socket.sendRequest('0105', {}, 'bookLiveCallBack')
}

// 获取多媒体设备
api.getMediaDevice = function (cb) {
  window.mediaDeviceListBack = cb
  window.socket.getMediaDeviceList()
}

// 获取ppt列表
api.getAllPPT = function (cb) {
  window.allPPT = cb
  window.socket.sendRequest('0320', {}, 'allPPT')
}

// 获取ppt详请
api.getPPTDetail = function (id, cb) {
  window.pptDetail = cb
  window.socket.sendRequest('0321', { id: id }, 'pptDetail')
}

// 操作ppt翻页
api.goToPPTPage = function (number, cb) {
  window.goToPPTPage = cb
  window.socket.sendRequest('0810', { page: number }, 'goToPPTPage')
}

// 获取点播视频列表
api.getAllVOD = function (cb) {
  window.allVOD = cb
  window.socket.sendRequest('0330', {}, 'allVOD')
}

// 开启直播
api.startLive = function (option, cb) {
  option = JSON.stringify(option)
  window.socket.startLive(option)
}

// 结束直播
api.endLive = function (cb) {
  window.liveHasStop = cb
  window.socket.endLive()
}

// 房间置开始
api.setupRoomActivityStatus = function (cb) {
  window.setupRoomActivityStatus = cb
  window.socket.sendRequest('0302', {}, 'setupRoomActivityStatus')
}

// 房间置结束
api.setupRoomEndStatus = function (cb) {
  window.setupRoomEndStatus = cb
  window.socket.sendRequest('0303', {}, 'setupRoomEndStatus')
}

// 发送公聊消息
api.sendPublicChatMessage = function ({content}, cb) {
  window.sendPublicChatCallBack = cb
  window.socket.sendRequest('0202', {content}, 'sendPublicChatCallBack')
}

/*
* 分页获取公聊历史记录
*
* @param {object} section 请求参数
* @param {number} section.start 起始偏移位置(从0开始)
* @param {number} section.size 取多少条记录，范围[1-50]
* @param {function} cb 请求回调
* */
api.getPublicChatMessages = function (section, cb) {
  window.publicChatMessages = cb
  window.socket.sendRequest('0201', section, 'publicChatMessages')
}

/*
 * 分页获取在线用户列表
 * 当传入的参数为{start: 0, size: 0}时，获取所有在线用户
 *
 * @param {object} section 请求参数
 * @param {number} section.start 起始偏移位置(从0开始)
 * @param {number} section.size 取多少条记录，范围[1-50]
 * @param {function} cb 请求回调
 * */
api.getOnlineUser = function (section, cb) {
  window.onlineUser = cb
  window.socket.sendRequest('0120', section, 'onlineUser')
}

// 获取房间管理员列表
api.getAdminUser = function (cb) {
  window.adminUser = cb
  window.socket.sendRequest('0301', {}, 'adminUser')
}

// 获取房间回顾视频
api.getReplayVideos = function (cb) {
  window.replayVideos = cb
  window.socket.sendRequest('0331', {}, 'replayVideos')
}

// 获取房间联系人信息
api.getContacts = function (cb) {
  window.contacts = cb
  window.socket.sendRequest('0304', {}, 'contacts')
}

// 获取图文列表
api.getTeletext = function ({ start, size }, cb) {
  window.teletext = cb
  window.socket.sendRequest('0340', { start, size }, 'teletext')
}

// socket接口 发布/修改图文消息
// api.issueTeletext = function ({ id, content }, cb) {
//   const option = {}
//   option.content = content
//   if (id) {
//     option.id = id
//   }
//   window.issueTeletext = cb
//   window.socket.sendRequest('0341', option, 'issueTeletext')
// }

/**
 * http接口 发布/修改图文消息
 * @param {number} options.id 图文id，当修改图文消息时需要
 * @param {number|string} options.userId 用户id
 * @param {number|string} options.roomId 房间id
 * @param {string} options.content 图文内容
 * @param {function} options.success 成功回调
 * @param {function} options.error 失败回调
*/
api.issueTeletext = function (options, success, error) {
  axios.post('/api/room/publishRichText', options)
  .then(success)
  .catch(error)
}

// 删除图文信息
api.deleteTeletext = function (id, cb) {
  window.deleteTeletext = cb
  window.socket.sendRequest('0342', { id }, 'deleteTeletext')
}

// 是否启用摄像头/麦克风
api.isEnableWebcamMic = function (cb) {
  window.flashPrivateSetBack = cb
  return window.socket.getCamMicMuted() === '1'
}

// 加载登录弹窗
api.loadLoginPopup = function () {
  loadScript('http://live.ieduchina.com/static/web/static/popup/login/login.js')
}

/**
 * 暂停/播放
 * @param {string} type 'pause' || 'resume'
 */
api.playStateToggle = function (type) {
  window.socket.playStateToggle(type)
}

export default api
