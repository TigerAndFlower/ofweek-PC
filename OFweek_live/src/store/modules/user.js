/**
 * Created by Administrator on 2017/7/13.
 */
import Vue from 'vue'
import api from '../../api'

const state = {
  user: {
    /*
     account
     company
     employee
     job
     name
     sex
     userId
     userType
    */
  },
  viewerCount: {
    onlineCount: 0,
    presentCount: 0
  }
}

const getters = {
  user: state => state.user,
  viewerCount: state => state.viewerCount,
  isAudience: state => !state.user.employee,
  isAdmin: state => state.user.userType === 2,
  isLecturer: state => state.user.userType === 3 && state.user.employee,
  isService: state => state.user.userType === 4 && state.user.employee,
  isVisitor: state => state.user.userType === 5,
  isRealAudience: state => state.user.userType === 1,
  isRealLecturer: state => state.user.userType === 3,
  isRealService: state => state.user.userType === 4,
  serverTime: state => state.user.timestamp || ''
}

const actions = {
  getUserInfo ({ state, commit }) {
    api.getUserInfo((data, a, b, c) => {
      // c 是服务器的时间戳
      // 将它保存在 user 里面是因为接口是 flash 处理后提供的
      // socket 消息里的时间戳只在此接口有返回给 js
      data.user.timestamp = parseInt(c, 10)
      setInterval(() => {
        commit('updateServerTime', state.user.timestamp + 1000)
      }, 1000)

      commit('setUserInfo', data.user)
      commit('setOnlineCount', data.onlineCount)
      commit('setPresentCount', data.presentCount)
    })
  },
  bookLive ({ commit }) {
    api.bookLive(data => {
      commit('setUserInfo', { registered: true })
    })
  }
}

const mutations = {
  setUserInfo (state, user) {
    for (let key in user) {
      Vue.set(state.user, key, user[key])
    }
  },
  setOnlineCount (state, onlineCount) {
    state.viewerCount.onlineCount = onlineCount
  },
  setPresentCount (state, presentCount) {
    state.viewerCount.presentCount = presentCount
  },
  updateServerTime (state, timestamp) {
    state.user.timestamp = timestamp
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
