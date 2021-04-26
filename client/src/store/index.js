import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    filterProduct: 0,
    sortProduct: 'default',
    categories: [],
    isLogin: !!localStorage.access_token,
    whislist: [],
    carts: [],
    message: {
      show: false,
      text: ''
    },
    isLoading: false
  },
  mutations: {
    products(state, payload) {
      state.products = payload
    },
    filterProduct(state, payload) {
      state.filterProduct = payload
    },
    sortProduct(state, payload) {
      state.sortProduct = payload
    },
    categories(state, payload) {
      state.categories = payload
    },
    isLogin(state) {
      state.isLogin = !!localStorage.access_token
    },
    whislist(state, payload) {
      state.whislist = payload
    },
    carts(state, payload) {
      state.carts = payload
    },
    message(state, payload) {
      state.message.show = !state.message.show
      state.message.text = payload
    },
    isLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    fetchProducts({ commit }) {
      axios
        .get('/products')
        .then(res => commit('products', res.data))
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    fetchCategories({ commit }) {
      axios
        .get('/categories')
        .then(res => commit('categories', res.data))
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    login(_, payload) {
      return axios.post('/login', payload)
    },
    register(_, payload) {
      return axios.post('/register', payload)
    },
    createWhislist({ dispatch, commit }, payload) {
      commit('isLoading')
      axios
        .post(`/whislists/${payload}`, null, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(() => {
          commit('isLoading')
          commit('message', 'Berhasil menambahkan produk ke Whislist')
          dispatch('fetchProducts')
          dispatch('fetchWhislist')
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    deleteWhislist({ dispatch, commit }, payload) {
      commit('isLoading')
      axios
        .delete(`/whislists/${payload}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(() => {
          commit('isLoading')
          commit('message', 'Berhasil menghapus produk dari whislist')
          dispatch('fetchProducts')
          dispatch('fetchWhislist')
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    fetchWhislist({ commit }) {
      axios
        .get('/whislists', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(res => {
          commit('whislist', res.data)
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    fetchCarts({ commit }) {
      axios
        .get('/carts', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(res => {
          commit('carts', res.data)
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    createCart({ dispatch, commit }, payload) {
      commit('isLoading')
      axios
        .post(`/carts/${payload}`, null, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(() => {
          commit('isLoading')
          commit('message', 'Berhasil menambahkan produk ke keranjang')
          dispatch('fetchCarts')
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    updateCart({ dispatch, commit }, payload) {
      commit('isLoading')
      axios
        .patch(
          `/carts/${payload.id}/quantity`,
          {
            quantity: payload.quantity
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(() => {
          commit('isLoading')
          dispatch('fetchCarts')
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    },
    deleteCart({ dispatch, commit }, payload) {
      commit('isLoading')
      axios
        .delete(`/carts/${payload}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(() => {
          commit('isLoading')
          commit('message', 'Berhasil menghapus produk dari whislist')
          dispatch('fetchCarts')
        })
        .catch(err => {
          commit('message', err.response.data.message)
        })
    }
  },
  getters: {
    products(state) {
      // prepare data
      let container = state.products.map(product => {
        return {
          id: product.id,
          title: product.title,
          name: product.title.split(' - ')[1],
          imageUrl: product.image_url,
          price: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(product.price),
          UserProducts: product.UserProducts,
          CategoryId: product.CategoryId,
          category: product.Category.title,
          sold: product.sold,
          stock: product.stock
        }
      })

      // filter
      container = container.filter(product => {
        if (state.filterProduct === 0) {
          return true
        } else {
          return product.CategoryId === state.filterProduct
        }
      })

      // sort
      if (state.sortProduct !== 'default') {
        if (state.sortProduct === 'Recently') {
          container = container.sort((a, b) => b.createdAt - a.createdAt)
        } else {
          container = container.sort((a, b) => {
            return (
              b.UserProducts.filter(user => user.type === 'Whislist').length -
              a.UserProducts.filter(user => user.type === 'Whislist').length
            )
          })
        }
      }

      return container
    },
    whislist(state) {
      return state.whislist.map(item => {
        return {
          id: item.id,
          title: item.Product.title,
          imageUrl: item.Product.image_url,
          price: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(item.Product.price),
          stock: item.Product.stock,
          ProductId: item.ProductId
        }
      })
    },
    carts(state) {
      return state.carts.map(item => {
        return {
          id: item.id,
          title: item.Product.title,
          imageUrl: item.Product.image_url,
          price: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(item.Product.price),
          stock: item.Product.stock,
          quantity: item.quantity
        }
      })
    }
  },
  modules: {}
})
