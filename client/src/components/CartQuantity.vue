<template>
  <v-card flat>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-btn color="error" icon @click="reduce">
          <v-progress-circular
            indeterminate
            color="white"
            v-if="isLoading"
          ></v-progress-circular>
          <v-icon v-else>mdi-minus</v-icon>
        </v-btn>
        <div
          class="d-flex justify-center align-center bordered font-weight-bold"
          style="width: 35px"
        >
          {{ quantity }}
        </div>
        <v-btn
          color="success"
          icon
          @click.prevent="add"
          :disabled="quantity >= remainStock"
        >
          <v-progress-circular
            indeterminate
            color="white"
            v-if="isLoading"
          ></v-progress-circular>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CardQuantity',
  props: ['quantity', 'itemId', 'remainStock'],
  data() {
    return {
      toggle_exclusive: undefined
    }
  },
  methods: {
    add() {
      this.$store.dispatch('updateCart', {
        id: this.itemId,
        quantity: this.quantity + 1
      })
    },
    reduce() {
      if (this.quantity === 1) {
        this.$store.dispatch('deleteCart', this.itemId)
      } else {
        this.$store.dispatch('updateCart', {
          id: this.itemId,
          quantity: this.quantity - 1
        })
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style></style>
