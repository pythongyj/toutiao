import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

import Content from '../views/home/content'
import Publish from '../views/home/publish.vue'
import Articles from '../views/home/articles.vue'
import Comment from '../views/home/comment.vue'
import Material from '../views/home/material.vue'
import Fans from '../views/home/fans.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Content
      },
      {
        path: '/home/publish',
        component: Publish
      },
      {
        path: '/home/articles',
        component: Articles
      },
      {
        path: '/home/comment',
        component: Comment
      },
      {
        path: '/home/material',
        component: Material
      },
      {
        path: '/home/fans',
        component: Fans
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',

  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
