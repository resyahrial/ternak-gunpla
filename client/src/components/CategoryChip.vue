<template>
  <v-col cols="12" sm="10" md="8" class="d-flex justify-center">
    <v-chip-group mandatory active-class="primary--text">
      <v-chip label @click="filter(0)">
        All
      </v-chip>
      <v-chip
        v-for="category in categories"
        :key="category.id"
        label
        @click="filter(category.id)"
      >
        {{ category.title }}
      </v-chip>
    </v-chip-group>
  </v-col>
</template>

<script>
export default {
  name: 'CategoryChip',
  props: ['categories'],
  methods: {
    filter(id) {
      this.$store.commit('filterProduct', id)
    }
  }
}
</script>

<style></style>
