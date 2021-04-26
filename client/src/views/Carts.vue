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
        <v-card-title>Carts</v-card-title>
        <v-card-subtitle class="pt-1"
          >{{ carts.length }} produk</v-card-subtitle
        >
        <div style="max-height: 400px; overflow: auto;">
          <CardList
            v-for="product in carts"
            :key="product.id"
            :item="product"
            :isCart="true"
          ></CardList>
        </div>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'Carts',
  components: {
    CardList: () => import('../components/CardList'),
    ButtonClose: () => import('../components/ButtonClose')
  },
  methods: {
    onClickOutside() {
      this.$router.push('/')
    }
  },
  computed: {
    carts() {
      return this.$store.getters.carts
    }
  }
}
</script>
