<template>
  <v-container class="py-12" fluid tag="section">
    <v-row>
      <v-col v-for="(stat, idx) in stats" :key="idx" cols="12" md="6" lg="3">
        <v-card class="d-flex px-4" outlined>
          <v-list-item-avatar
            class="mt-n4 mb-8"
            tile
            size="80"
            :color="stat.color"
          >
            <v-icon large>{{ stat.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-right">
            <v-list-item-subtitle class="text-body-1">
              {{ stat.name }}
            </v-list-item-subtitle>
            <v-list-item-title class="text-h4">
              {{ stat.count }}
            </v-list-item-title>
          </v-list-item-content>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => {
    return {
      stats: [
        {
          name: 'Categories',
          icon: 'mdi-shape-outline',
          color: 'primary',
          count: 0
        },
        {
          name: 'Products',
          icon: 'mdi-toy-brick-outline',
          color: 'red lighten-1',
          count: 0
        }
      ]
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    products() {
      return this.$store.state.products
    }
  },
  created() {
    this.stats[0].count = this.categories.length
    this.stats[1].count = this.products.length
  }
}
</script>
