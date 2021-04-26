<template>
  <v-data-table
    :headers="heads"
    :items="items"
    :single-select="true"
    v-model="selected"
    show-select
  ></v-data-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    heads: Array
  },
  data() {
    return {
      selected: []
    }
  },
  methods: {
    itemKeys(item) {
      return Object.keys(item).filter(key => key !== 'id')
    },
    editLink(id) {
      return `/products/${id}/edit`
    },
    deleteProduct(id) {
      this.$swal({
        title: 'Are you sure',
        text: 'You will delete this product',
        icon: 'warning',
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch('deleteProduct', id)
            .then(() => {
              return this.$store.dispatch('fetchProducts')
            })
            .then(res => {
              this.$store.commit('fetchProducts', res.data)
              this.$swal({
                text: 'Product deleted succesfully',
                icon: 'success',
                timer: 1200,
                showConfirmButton: false
              })
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
      })
    }
  },
  computed: {
    items() {
      return this.$store.getters.products
    }
  },
  watch: {
    selected(newVal, oldVal) {
      const passedValue = newVal.length !== 0 ? newVal[0].id : ''
      this.$store.commit('selectedProduct', passedValue)
      this.$emit('selectedId', passedValue)
    }
  }
}
</script>

<style></style>
