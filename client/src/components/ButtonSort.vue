<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        Urutkan
        <v-icon
          class="ml-2"
          small
          v-text="
            `mdi-chevron-${attrs['aria-expanded'] === 'true' ? 'up' : 'down'}`
          "
        ></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title @click="sortProduct(item.name)">
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ButtonSort',
  data: () => ({
    items: [
      {
        name: 'Recently',
        text: 'Terbaru'
      },
      {
        name: 'Popular',
        text: 'Paling diminati'
      }
    ]
  }),
  methods: {
    sortProduct(item) {
      this.$store.commit('sortProduct', item)
    }
  }
}
</script>

<style></style>
