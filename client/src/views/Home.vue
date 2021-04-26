<template>
  <v-app>
    <Navbar></Navbar>

    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col class="mt-3 mb-4" cols="12">
            <v-row class="align-center">
              <v-col cols="6" md="2">
                <ButtonSort></ButtonSort>
              </v-col>
              <v-col cols="6" md="2" order-md="3">
                <v-text-field
                  label="Search"
                  append-icon="mdi-magnify"
                  v-model="keyword"
                ></v-text-field>
              </v-col>
              <CategoryChip :categories="categories"></CategoryChip>
            </v-row>
          </v-col>

          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            xs="6"
            sm="4"
            md="3"
          >
            <router-link
              :to="`/product/${product.id}`"
              class="text-decoration-none"
            >
              <Card :product="product"></Card>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      keyword: ''
    }
  },
  components: {
    Navbar: () => import('../components/Navbar'),
    Card: () => import('../components/Card'),
    CategoryChip: () => import('../components/CategoryChip'),
    ButtonSort: () => import('../components/ButtonSort')
  },
  methods: {
    search(keyword) {
      this.keyword = keyword
    }
  },
  computed: {
    products() {
      let products = this.$store.getters.products
      if (this.keyword !== '') {
        products = products.filter(product =>
          product.name.toLowerCase().includes(this.keyword.toLowerCase())
        )
      }
      return products
    },
    categories() {
      return this.$store.state.categories
    }
  },
  created() {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')

    if (this.$store.state.isLogin) {
      this.$store.dispatch('fetchWhislist')
      this.$store.dispatch('fetchCarts')
    }
  }
}
</script>
