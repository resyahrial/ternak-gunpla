<template>
  <v-row class="pa-3" no-gutters>
    <v-col cols="3">
      <v-img
        :src="item.imageUrl"
        class="rounded-lg"
        aspect-ratio="1"
        position="top center"
      ></v-img>
    </v-col>
    <v-col cols="9" class="pl-2 d-flex flex-column justify-space-between">
      <div>
        <p class="text-truncate font-weight-medium mb-0">
          {{ item.title }}
        </p>
        <p class="text-caption mb-0">
          {{ item.price }} <span>(Stok : {{ item.stock }})</span>
        </p>
      </div>
      <div class="d-flex flex-row-reverse align-center" v-if="isCart">
        <CardQuantity
          :quantity="item.quantity"
          :itemId="item.id"
          :remainStock="item.stock"
        ></CardQuantity>
      </div>
      <div class="d-flex flex-row-reverse align-center" v-else>
        <v-btn
          icon
          color="success"
          class="ml-2"
          width="30"
          height="30"
          @click="addToCart"
        >
          <v-progress-circular
            indeterminate
            color="success"
            v-if="isLoading"
          ></v-progress-circular>
          <v-icon v-else>mdi-cart-plus</v-icon>
        </v-btn>
        <v-btn
          icon
          color="error"
          width="30"
          height="30"
          @click="deleteWhislist"
        >
          <v-progress-circular
            indeterminate
            color="error"
            v-if="isLoading"
          ></v-progress-circular>
          <v-icon v-else>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CardList',
  props: ['item', 'isCart'],
  components: {
    CardQuantity: () => import('./CartQuantity')
  },
  methods: {
    deleteWhislist() {
      this.$store.dispatch('deleteWhislist', this.item.id)
    },
    addToCart() {
      const filteredCarts = this.carts.filter(
        cart => cart.ProductId === this.item.ProductId
      )

      if (filteredCarts.length === 0) {
        this.$store.dispatch('createCart', this.item.ProductId)
      } else {
        this.$store.dispatch('updateCart', {
          id: filteredCarts[0].id,
          quantity: filteredCarts[0].quantity + 1
        })
      }
    }
  },
  computed: {
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
