<template>
  <div>
    <router-view></router-view>
    <v-snackbar v-model="message.show" timeout="2000" color="purple">
      {{ message.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      snackbar: false
    }
  },
  computed: {
    message: {
      get() {
        return this.$store.state.message
      },
      set() {
        this.$store.commit('message', '')
      }
    }
  }
}
</script>

<style>
@media only screen and (min-width: 600px) {
  .v-dialog {
    width: 50% !important;
    align-self: flex-start !important;
    margin-top: 80px !important;
    overflow: hidden;
  }
}

@media only screen and (min-width: 1000px) {
  .v-dialog {
    width: 30% !important;
  }
}
</style>
