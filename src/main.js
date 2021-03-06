import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/commen/axios'

import './permissions/router'

import Components from './components'
Vue.prototype.$axios = axios

Vue.use(Components)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
