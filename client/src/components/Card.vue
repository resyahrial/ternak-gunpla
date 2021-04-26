<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      :src="product.imageUrl"
      aspect-ratio="1"
      position="center top"
    ></v-img>

    <v-card-subtitle class="text-no-wrap pa-2 pb-0 grey--text text--darken-4">
      {{ product.name }}
    </v-card-subtitle>

    <v-card-text class="d-flex justify-space-between align-center pa-2">
      <div class="grey--text text--darken-1">
        {{ product.price }}
      </div>

      <div class="d-flex align-center grey--text text--darken-1">
        <v-icon class="mr-1" color="red" small>mdi-heart</v-icon>
        {{ whislisted }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  computed: {
    whislisted() {
      return this.product.UserProducts.filter(user => user.type === 'Whislist')
        .length
    }
  }
}
</script>

<style></style>
