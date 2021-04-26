<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class=" text-h5 text-uppercase justify-center pt-2">
        <span class="primary--text font-weight-bold">Ternak Gunpla</span>
      </v-list-item>
      <v-divider class="mx-3 my-2" />
      <v-list>
        <v-list-item-group>
          <router-link
            class="text-decoration-none"
            v-for="(list, idx) in drawerList"
            :key="idx"
            :to="list.to"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ list.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ list.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat absolute color="transparent" height="50">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title color="primary">
        {{ pageTitle === 'Home' ? 'Dashboard' : pageTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <account></account>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import store from '../store'

export default {
  name: 'Home',
  data() {
    return {
      drawer: null,
      drawerList: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-toy-brick-outline',
          title: 'Product',
          to: '/products'
        }
      ]
    }
  },
  components: {
    Account: () => import('../components/Account')
  },
  computed: {
    pageTitle() {
      return store.state.pageTitle
    }
  },
  created() {
    this.$store
      .dispatch('fetchProducts')
      .then(res => {
        this.$store.commit('fetchProducts', res.data)
        return this.$store.dispatch('fetchCategories')
      })
      .then(res => {
        this.$store.commit('fetchCategories', res.data)
      })
      .catch(err => {
        this.$swal({
          text: err.response.data.message,
          icon: 'error',
          timer: 1200,
          showConfirmButton: false
        })
      })
  }
}
</script>
