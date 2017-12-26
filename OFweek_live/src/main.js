// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/theme/index.css'
import '../node_modules/vue2-scrollbar/dist/style/vue2-scrollbar.css'
import './assets/font/iconfont.css'
import './assets/css/common.css'
import { formatDate } from './assets/js/common.js'

import Vue from 'vue'
import store from './store'
import App from './App'
import VueQriously from '../node_modules/vue-qriously/src/vue-qriously.js'
import {
    Button,
    Select,
    Option,
    Dialog,
    Tabs, TabPane,
    MessageBox,
    Input,
    Tooltip,
    Message,
    Popover,
    Carousel,
    Scrollbar,
    CarouselItem,
    Loading,
    Upload,
    Form,
    FormItem
} from 'element-ui'

Vue.use(VueQriously)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Carousel)
Vue.use(Scrollbar)
Vue.use(CarouselItem)
Vue.use(Loading.directive)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

Vue.config.productionTip = false

// 注册时间格式过滤器
Vue.filter('date', formatDate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: {
    App
  }
})
