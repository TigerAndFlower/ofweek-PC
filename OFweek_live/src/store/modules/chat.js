/**
 * Created by Administrator on 2017/8/22.
 */
import Vue from 'vue'
import api from '../../api'

const state = {
  currentSessionID: 'publicSessions',
  publicSessions: {
    publicSessions: {
      userId: 'publicSessions',
      name: '群聊',
      unreadCount: 0,
      speakContent: '',
      messages: []
    }
  },
  privateSessions: {
    /*
     userId: {
     userId,
     userType,
     account,
     name,
     sex,
     unreadCount,
     speakContent,
     messages: []
     }
     */
  },
  onlineUsers: {
    /*
    userId: {
      userId,
      userType,
      account,
      name,
      sex,
      unreadCount,
      speakContent,
      messages: []
    }
    */
  },
  adminUsers: {
    /*
     userId: {
       userId,
       userType,
       account,
       name,
       sex,
       company,
       unreadCount,
       speakContent,
       messages: []
     }
     */
  }
}

const getters = {
  publicSessions: state => state.publicSessions,
  privateSessions: state => state.privateSessions,
  onlineUsers: state => state.onlineUsers,
  adminUsers: state => state.adminUsers,
  currentSessionID: state => state.currentSessionID,
  currentSessionMessages: state => {
    const id = state.currentSessionID
    return getSessions(state, id).messages || []
  },
  currentSpeakContent: state => {
    const id = state.currentSessionID
    return getSessions(state, id).speakContent
  }
}

const actions = {
  getOnlineUser ({ commit, state }, section) {
    api.getOnlineUser(section, data => {
      data.forEach(el => {
        commit('addOnlineUser', el)
      })
    })
  },
  getAdminUser ({ commit, state }) {
    api.getAdminUser(data => {
      data.forEach(el => {
        commit('addAdminUser', el)
      })
    })
  },
  getPublicChatMessages ({ commit, state }, section) {
    api.getPublicChatMessages(section, data => {
      commit('addHistoryMessages', {sessionId: 'publicSessions', messages: data})
    })
  },
  getPrivateChatMessages ({ commit, state }) {
    api.getPrivateChatMessages(data => {
      data.msgList.forEach(el => {
        commit('addPrivateSessions', {user: el.user, messages: el.msgs})
      })
    })
  },
  sendPublicChatMessage ({ commit, state }, { content }) {
    commit('updateSpeakContent', '')
    api.sendPublicChatMessage({content}, data => {
      const sessionId = 'publicSessions'
      commit('addMessage', { sessionId, message: data })
    })
  },
  sendPrivateChatMessage ({ commit, state }, { content, sendTo }) {
    commit('updateSpeakContent', '')
    api.sendPrivateChatMessage({content, sendTo}, data => {
      const message = {}
      message.chatTime = new Date(data.createDate).getTime()
      message.type = data.type
      message.content = data.content
      message.id = data.id
      message.roomId = data.roomId
      sendTo.forEach(el => {
        commit('addMessage', {sessionId: el, message})
      })
    })
  },
  receiveNewMessage ({ commit, state }, { sender, message }) {
    // 如果接收的消息是私聊且 state.privateSessions 中没有这个会话
    // 先在 state.privateSessions 中创建一个会话，再添加这条消息
    if (sender.userId !== 'publicSessions' && !state.privateSessions[sender.userId]) {
      commit('addPrivateSessions', { user: sender, messages: [] })
    }

    if (state.currentSessionID !== sender.userId) {
      const thisSession = getSessions(state, sender.userId)
      const count = thisSession.unreadCount + 1
      commit('updateUnreadCount', { sessionId: sender.userId, number: count })
    }

    commit('addMessage', { sessionId: sender.userId, message })
  }
}

const mutations = {
  addOnlineUser (state, user) {
    createSessions(state.onlineUsers, user)
  },
  deleteOnlineUser (state, userId) {
    Vue.delete(state.onlineUsers, userId)
  },
  addAdminUser (state, user) {
    createSessions(state.adminUsers, user)
  },
  addPrivateSessions (state, { user, messages }) {
    createSessions(state.privateSessions, user, messages)
  },
  switchCurrentSessionID (state, id) {
    state.currentSessionID = id
  },
  updateSpeakContent (state, value) {
    const id = state.currentSessionID
    const currentSession = getSessions(state, id)
    currentSession.speakContent = value
  },

  // getSessions 会查到 state.publicSessions 或者 state.privateSessions，
  // 所以这里会更新它们的子对象中的 unreadCount 字段。
  // 尽管在拿到 onlineUsers、adminUsers 这两个列表的时候也添加了 unreadCount 字段，
  // 但这个字段几乎无用，因为根本不会更新和访问它。
  // 所以，在视图里通过循环渲染的 onlineUsers、adminUsers 列表中无法使用自身的 item.unreadCount，
  // 只能通过判断 state.privateSessions 中有没有当前会话(sessions)，如果有就访问它的 unreadCount。
  // 在视图里可以看到，adminUsers 列表是这么处理的，而 onlineUsers 根本不需要这么字段
  // 另外我们的业务设定上说明了主播/客服端的“对话中”列表里是所有与自己有私聊记录的用户，
  // 它循环的是 privateSessions，当然就能直接使用 item.unreadCount。群聊也是如此
  updateUnreadCount (state, { sessionId, number }) {
    const thisSession = getSessions(state, sessionId)
    thisSession.unreadCount = number
  },
  addMessage (state, { sessionId, message }) {
    const session = getSessions(state, sessionId)
    session.messages.push(message)
  },
  addHistoryMessages (state, { sessionId, messages }) {
    const session = getSessions(state, sessionId)
    session.messages = session.messages.concat(messages)
  },
  updateAdminUserOnlineStatus (state, { userId, status }) {
    if (state.adminUsers[userId]) {
      state.adminUsers[userId].isOnline = status
    }
  }
}

function createSessions (state, user, messages) {
  messages = messages || []
  Vue.set(state, user.userId, {
    userId: user.userId,
    userType: user.userType,
    account: user.account,
    name: user.name,
    sex: user.sex,
    company: user.company,
    avatar: user.logoUrl,
    isOnline: user.isOnline,
    unreadCount: 0,
    speakContent: '',
    messages
  })
}

function getSessions (state, id) {
  return state.publicSessions[id] || state.privateSessions[id]
}

export default {
  state,
  getters,
  actions,
  mutations
}
