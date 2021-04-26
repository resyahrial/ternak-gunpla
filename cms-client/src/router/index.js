import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/main/Dashboard.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/main/Products.vue'),
        children: [
          {
            path: '/',
            name: 'Products',
            component: () => import('../components/Table.vue'),
            props: {
              heads: [
                { text: 'ID', value: 'id' },
                { text: 'Title', value: 'title' },
                { text: 'Category', value: 'CategoryId' },
                { text: 'Price', value: 'price' },
                { text: 'Stock', value: 'stock' }
              ]
            }
          },
          {
            path: '/products/add',
            name: 'Add Product',
            component: () => import('../components/ProductForm.vue')
          },
          {
            path: '/products/:id/edit',
            name: 'Edit Product',
            component: () => import('../components/ProductForm.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticate = localStorage.role === 'admin'
  store.commit('changePageTitle', to.name)
  if (to.name !== 'Login' && !isAuthenticate) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticate) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
