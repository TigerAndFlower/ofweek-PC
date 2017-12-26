/**
 * Created by Administrator on 2017/9/27.
 */
const listener = {}

// 房间状态改变
listener.onChangeRoomStatus = function (cb) {
  window.onChangeRoomStatus = cb
  window.socket.addServerNotice('1300', 'onChangeRoomStatus')
}

// 直播开始
listener.onLive = function (cb) {
  window.onLive = cb
  window.socket.addServerNotice('1800', 'onLive')
}

// 开启直播回调
listener.onStartLiveCallback = function (cb) {
  window.onStartLiveCallback = cb
  window.socket.addServerNotice('0800', 'onStartLiveCallback')
}

// vod直播开始
listener.onVodLive = function (cb) {
  window.onVodLive = cb
  window.socket.addServerNotice('1820', 'onVodLive')
}

// 开启vod直播回调
listener.onStartVodLiveCallback = function (cb) {
  window.onStartVodLiveCallback = cb
  window.socket.addServerNotice('0820', 'onStartVodLiveCallback')
}

// 直播结束
listener.onLiveEnd = function (cb) {
  window.onLiveEnd = cb
  window.socket.addServerNotice('1801', 'onLiveEnd')
}

// vod直播结束
listener.onVodLiveEnd = function (cb) {
  window.onVodLiveEnd = cb
  window.socket.addServerNotice('1821', 'onVodLiveEnd')
}

// 没有直播流
listener.onNotFindStream = function (cb) {
  window.liveStreamNotFind = cb
}

// ppt翻页
listener.onPPTChangePage = function (cb) {
  window.onPPTChangePage = cb
  window.socket.addServerNotice('1810', 'onPPTChangePage')
}

// 群聊消息通知
listener.onPublicChatMessage = function (cb) {
  window.onPublicChatMessage = cb
  window.socket.addServerNotice('1200', 'onPublicChatMessage')
}

// 私聊消息通知
listener.onPrivateChatMessage = function (cb) {
  window.onPrivateChatMessage = cb
  window.socket.addServerNotice('1210', 'onPrivateChatMessage')
}

// 分配客服
listener.onAssignService = function (cb) {
  window.onAssignService = cb
  window.socket.addServerNotice('1211', 'onAssignService')
}

// 人气数变化
listener.onChangePresentCount = function (cb) {
  window.onChangePresentCount = cb
  window.socket.addServerNotice('1001', 'onChangePresentCount')
}

// 在线人数变化
listener.onChangeOnlineCount = function (cb) {
  window.onChangeOnlineCount = cb
  window.socket.addServerNotice('1002', 'onChangeOnlineCount')
}

// 用户进入房间通知
listener.onUserEntry = function (cb) {
  window.onUserEntry = cb
  window.socket.addServerNotice('1100', 'onUserEntry')
}

// 用户退出房间通知
listener.onUserQuit = function (cb) {
  window.onUserQuit = cb
  window.socket.addServerNotice('1101', 'onUserQuit')
}

// 图文发布/修改通知
listener.onIssueTeletext = function (cb) {
  window.onIssueTeletext = cb
  window.socket.addServerNotice('1341', 'onIssueTeletext')
}

// 图文删除通知
listener.onDeleteTeletext = function (cb) {
  window.onDeleteTeletext = cb
  window.socket.addServerNotice('1342', 'onDeleteTeletext')
}

export default listener
