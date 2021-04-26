import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
      },
      {
        path: '/product/:id',
        name: 'Detail',
        component: () => import('../views/Detail')
      },
      {
        path: '/whislist',
        name: 'Whislist',
        component: () => import('../views/Whislist')
      },
      {
        path: '/carts',
        name: 'Carts',
        component: () => import('../views/Carts')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = store.state.isLogin
  if (['Login', 'Register'].includes(to.name) && isLogin) {
    next({ name: 'Home' })
  } else if (!['Login', 'Home', 'Register'].includes(to.name) && !isLogin) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
