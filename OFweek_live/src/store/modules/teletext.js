import api from '../../api'

const state = {
  teletext: []
}

const getters = {
  teletext: state => state.teletext
}

const actions = {
  getTeletext ({ commit }, { start, size, callback }) {
    api.getTeletext({ start, size }, data => {
      commit('addTeletexts', data)
      callback(data)
    })
  },
  issueTeletext ({ commit, getters }, { id, content }) {
    // api.issueTeletext({ id, content }, data => {
    //   // console.log(data)
    // })
    const options = {}
    if (id) {
      options.id = id
    }
    options.roomId = getters.room.roomId
    options.userId = getters.user.userId
    options.content = content
    api.issueTeletext(options, function (data) {
      // console.log(data)
    }, function (data) {
      // console.log(data)
    })
  },
  deleteTeletext ({ commit }, id) {
    api.deleteTeletext(id, data => {
      // console.log(data)
    })
  }
}

const mutations = {
  addTeletexts (state, teletexts) {
    state.teletext = state.teletext.concat(teletexts)
  },
  receiveTeletext (state, data) {
    let isExist = state.teletext.every((el, index) => {
      if (el.id === data.id) {
        state.teletext[index].content = data.content
        return false
      }
      return true
    })
    if (isExist) {
      state.teletext.push(data)
    }
  },
  deleteTeletext (state, id) {
    state.teletext.forEach((el, index) => {
      if (el.id === id) {
        state.teletext.splice(index, 1)
        return false
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
