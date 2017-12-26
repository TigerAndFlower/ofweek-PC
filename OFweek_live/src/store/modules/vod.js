/**
 * Created by Administrator on 2017/9/26.
 */
import api from '../../api'

const state = {
  vodList: []
}

const getters = {
  vodList: state => state.vodList
}

const actions = {
  getAllVOD ({ commit }) {
    api.getAllVOD(data => {
      commit('setAllVOD', data)
    })
  }
}

const mutations = {
  setAllVOD (state, allVOD) {
    state.vodList = Array.isArray(allVOD) ? allVOD : []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
