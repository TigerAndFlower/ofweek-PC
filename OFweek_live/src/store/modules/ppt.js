/**
 * Created by Administrator on 2017/8/30.
 */
import api from '../../api'

const state = {
  pptList: [],
  pptId: '',
  pptPageIndex: 1
}

const getters = {
  pptList: state => state.pptList,
  pptId: state => state.pptId,
  pptPageIndex: state => state.pptPageIndex
}

const actions = {
  getAllPPT ({ commit }) {
    api.getAllPPT(data => {
      commit('setAllPPT', data)
    })
  },
  goToPPTPage ({ commit }, pageNumber) {
    api.goToPPTPage(pageNumber, () => {
      commit('setPPTPageIndex', pageNumber)
    })
  }
}

const mutations = {
  setAllPPT (state, allPPT) {
    state.pptList = Array.isArray(allPPT) ? allPPT : []
  },
  setPPTPageIndex (state, number) {
    state.pptPageIndex = number
  },
  setPPTId (state, id) {
    state.pptId = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
