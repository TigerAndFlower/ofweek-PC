/**
 * Created by Administrator on 2017/7/11.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '../plugins/logger'
import user from './modules/user'
import room from './modules/room'
import mediaDevice from './modules/mediaDevice'
import chat from './modules/chat'
import vod from './modules/vod'
import ppt from './modules/ppt'
import live from './modules/live'
import teletext from './modules/teletext'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    room,
    mediaDevice,
    chat,
    vod,
    ppt,
    live,
    teletext
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
