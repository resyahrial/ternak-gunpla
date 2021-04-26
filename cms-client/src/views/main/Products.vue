<template>
  <v-container>
    <div v-if="isRoot">
      <router-link class="text-decoration-none" to="/products/add">
        <v-btn class="mb-4 mr-2" color="success">
          Add
        </v-btn>
      </router-link>
      <v-btn
        class="mb-4 mr-2"
        color="warning"
        @click="editProduct"
        :disabled="!selectedId"
      >
        Edit
      </v-btn>
      <v-btn
        class="mb-4 mr-2"
        color="error"
        @click="deleteProduct"
        :disabled="!selectedId"
      >
        Delete
      </v-btn>
    </div>
    <router-link class="text-decoration-none" to="/products" v-else>
      <v-btn class="mb-4 mr-2" color="error">
        Back
      </v-btn>
    </router-link>
    <router-view @selectedId="setId"></router-view>
  </v-container>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      selectedId: ''
    }
  },
  methods: {
    setId(id) {
      this.selectedId = id
    },
    editProduct() {
      this.$router.push(`/products/${this.selectedId}/edit`)
      this.selectedId = ''
    },
    deleteProduct() {
      const id = this.selectedId
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
      this.selectedId = ''
    }
  },
  computed: {
    isRoot() {
      return this.$route.path === '/products'
    }
  }
}
</script>
