<template>
  <v-app-bar app>
    <v-container class="d-flex align-center px-0">
      <v-toolbar-title>Ternak Gunpla</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLogin">
        <v-btn icon width="40" height="40" to="/whislist">
          <v-badge
            overlap
            dot
            left
            color="red"
            :value="whislist.length === 0 ? false : true"
          >
            <v-icon>mdi-heart</v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon width="40" height="40" to="/carts">
          <v-badge
            overlap
            dot
            left
            color="red"
            :value="carts.length === 0 ? false : true"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon width="40" height="40" v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <div v-if="!isLogin">
            <router-link to="/login" class="text-decoration-none">
              <v-list-item>
                <v-list-item-title>Masuk</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/register" class="text-decoration-none">
              <v-list-item>
                <v-list-item-title>Daftar</v-list-item-title>
              </v-list-item>
            </router-link>
          </div>
          <v-list-item @click="logout" v-else>
            <v-list-item-title>Keluar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.clear()
      this.$store.commit('isLogin')
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    whislist() {
      return this.$store.state.whislist
    },
    carts() {
      return this.$store.state.carts
    }
  }
}
</script>

<style scoped>
.v-toolbar__title {
  font-family: 'Grand Hotel', 'Roboto', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 2rem;
}
</style>
