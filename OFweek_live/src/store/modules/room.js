/**
 * Created by Administrator on 2017/7/26.
 */
import Vue from 'vue'
import api from '../../api'

const state = {
  room: {},
  download: [],
  replayVideos: null,
  broadcast: [],
  contacts: {}
}

const getters = {
  room: state => state.room,
  download: state => state.download,
  replayVideos: state => state.replayVideos,
  broadcast: state => state.broadcast,
  contacts: satte => state.contacts
}

const actions = {
  getRoomInfo ({ commit }) {
    api.getRoomInfo(room => {
      commit('setRoomInfo', room)
    })
  },

  // 获取下载资料
  getDownload ({ commit }) {
    api.getDownload(data => {
      commit('setDownload', data)
    })
  },

  // 获取回放视频
  getReplayVideos ({ state, commit }) {
    api.getReplayVideos(data => {
      commit('setReplayVideos', data)
    })
  },

  // 获取房间联系人信息
  getContacts ({ commit }) {
    api.getContacts(data => {
      commit('setContacts', data)
    })
  }
}

const mutations = {
  setRoomInfo (state, room) {
    for (let key in room) {
      // state.room[key] = room[key]
      Vue.set(state.room, key, room[key])
    }
  },
  setDownload (state, download) {
    state.download = download
  },
  setReplayVideos (state, videos) {
    state.replayVideos = videos
  },
  addBroadcast (state, content) {
    state.broadcast.unshift(content)
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
