/**
 * Created by Administrator on 2017/7/27.
 */
import api from '../../api'

const state = {
  camera: [],
  microphone: []
}

const getters = {
  camera: state => state.camera,
  microphone: state => state.microphone
}

const actions = {
  getMediaDevice ({ commit }) {
    api.getMediaDevice((camera, microphone) => {
      commit('setCamera', camera)
      commit('setMicrophone', microphone)
    })
  }
}

const mutations = {
  setCamera (state, camera) {
    state.camera = camera
  },
  setMicrophone (state, microphone) {
    state.microphone = microphone
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
