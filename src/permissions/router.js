import router from '../router'

router.beforeEach(function (to, from, next) {
  // 设置前置路由首位
  // if(){

  // }
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
