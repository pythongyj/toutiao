import HomeAside from './home/homeAside.vue'
import HomeHeader from './home/homeHeader.vue'
import Bread from './bread'
import publishImg from './publish'
import tabsImg from './publish/tabsimg.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('home-aside', HomeAside)
    Vue.component('home-header', HomeHeader)
    Vue.component('bread', Bread)
    Vue.component('quill-editor', quillEditor)
    Vue.component('publish-img', publishImg)
    Vue.component('tabs-img', tabsImg)
  }
}
