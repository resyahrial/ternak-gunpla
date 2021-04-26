<template>
  <div class="text-center">
    <v-bottom-sheet value="true" persistent>
      <v-card
        :class="{
          'rounded-tl-xl rounded-tr-xl': $vuetify.breakpoint.xs
        }"
        rounded="0"
      >
        <ButtonClose></ButtonClose>
        <v-img
          :src="product.imageUrl"
          position="top center"
          :aspect-ratio="4 / 3"
        ></v-img>
        <div class="pa-2">
          <v-card-title class="pa-0 mb-2">{{ product.name }}</v-card-title>
          <v-card-text
            class="pa-0 mb-0 d-flex justify-space-between align-center"
          >
            <div>
              <p class="mb-0">
                <span class="font-weight-medium">Terjual :</span>
                {{ product.sold }}
              </p>
              <p>
                <span class="font-weight-medium">Stok :</span>
                {{ product.stock }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-subtitle mb-0">
                {{ product.category }}
              </p>
              <p class="text-body-1 font-weight-bold">
                {{ product.price }}
              </p>
            </div>
          </v-card-text>

          <v-row v-if="isLogin">
            <v-col cols="6">
              <v-btn
                color="error"
                width="100%"
                :outlined="isWhislisted"
                @click="whislistAction"
              >
                <v-progress-circular
                  indeterminate
                  :color="isWhislisted ? 'error' : 'white'"
                  v-if="isLoading"
                ></v-progress-circular>
                <span v-else>
                  {{ isWhislisted ? 'Hapus daftar' : 'Sukai' }}
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="success" width="100%" @click="addToCart">
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="isLoading"
                ></v-progress-circular>
                <span v-else>+ Keranjang</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  components: {
    ButtonClose: () => import('../components/ButtonClose')
  },
  methods: {
    whislistAction() {
      if (this.isWhislisted) {
        this.$store.dispatch('deleteWhislist', this.action[0].id)
      } else {
        this.$store.dispatch('createWhislist', this.product.id)
      }
    },
    addToCart() {
      const filteredCarts = this.carts.filter(
        cart => cart.ProductId === this.product.id
      )

      if (filteredCarts.length === 0) {
        this.$store.dispatch('createCart', this.product.id)
      } else {
        this.$store.dispatch('updateCart', {
          id: filteredCarts[0].id,
          quantity: filteredCarts[0].quantity + 1
        })
      }
    }
  },
  computed: {
    product() {
      return this.$store.getters.products.filter(
        product => product.id === +this.$route.params.id
      )[0]
    },
    isLogin() {
      return this.$store.state.isLogin
    },
    action() {
      if (!this.product.UserProducts) {
        return false
      }

      return this.product.UserProducts.filter(
        user => user.UserId === +localStorage.UserId && user.type === 'Whislist'
      )
    },
    isWhislisted() {
      return this.action.length !== 0
    },
    carts() {
      return this.$store.state.carts
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style></style>
