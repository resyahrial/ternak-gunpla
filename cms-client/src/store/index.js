import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageTitle: 'Dashboard',
    products: [],
    selectedProduct: [],
    categories: []
  },
  mutations: {
    changePageTitle(state, payload) {
      state.pageTitle = payload
    },
    fetchProducts(state, payload) {
      state.products = payload
    },
    fetchCategories(state, payload) {
      state.categories = payload
    },
    selectedProduct(state, payload) {
      state.selectedProduct =
        payload === ''
          ? ''
          : state.products.filter(product => product.id === +payload)[0]
    }
  },
  actions: {
    login(context, payload) {
      return axios.post('/login', payload)
    },
    fetchProducts() {
      return axios.get('/products', {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    fetchCategories() {
      return axios.get('/categories', {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    addProduct(context, payload) {
      return axios.post('/products', payload.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.access_token
        }
      })
    },
    editProduct(context, payload) {
      return axios.put(`/products/${payload.id}`, payload.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.access_token
        }
      })
    },
    deleteProduct(context, payload) {
      return axios.delete(`/products/${payload}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  },
  getters: {
    categories: state => {
      const container = state.categories.map(cat => {
        return {
          text: cat.title,
          value: cat.id
        }
      })
      return container
    },
    products: state => {
      const container = state.products.map(prod => {
        return {
          id: prod.id,
          title: prod.title,
          CategoryId: prod.Category.title,
          price: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(prod.price),
          stock: new Intl.NumberFormat('id-ID', {}).format(prod.stock)
        }
      })
      return container
    },
    selectedProduct: state => {
      const { title, price, stock, CategoryId } = state.selectedProduct
      return {
        title,
        price,
        stock,
        CategoryId,
        image_url: state.selectedProduct.image_url
      }
    }
  },
  modules: {}
})

export default store
