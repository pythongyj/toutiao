import HomeAside from './home/homeAside.vue'
import HomeHeader from './home/homeHeader.vue'

export default {
  install (Vue) {
    Vue.component('home-aside', HomeAside)
    Vue.component('home-header', HomeHeader)
  }
}
