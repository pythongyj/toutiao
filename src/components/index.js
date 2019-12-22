import HomeAside from './home/homeAside.vue'
import HomeHeader from './home/homeHeader.vue'
import Bread from './bread'

export default {
  install (Vue) {
    Vue.component('home-aside', HomeAside)
    Vue.component('home-header', HomeHeader)
    Vue.component('bread', Bread)
  }
}
