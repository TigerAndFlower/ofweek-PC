/**
 * Created by Administrator on 2017/9/25.
 */
import api from '../../api'

const state = {
  liveType: '',
  seek: '',
  downStreamUrl: ''
}

const getters = {
  liveType: state => state.liveType,
  seek: state => state.seek,
  downStreamUrl: state => state.downStreamUrl
}

const actions = {
  startLive ({ commit }, options) {
    api.startLive(options)
  }
}

const mutations = {
  setLiveType (state, type) {
    state.liveType = type
  },
  setSeek (state, seek) {
    state.seek = seek
  },
  setDownStreamUrl (state, url) {
    state.downStreamUrl = url
  },
  resetLiveInfo (state) {
    state.liveType = ''
    state.pptPageNumber = ''
    state.pptId = ''
    state.seek = ''
    state.downStreamUrl = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
