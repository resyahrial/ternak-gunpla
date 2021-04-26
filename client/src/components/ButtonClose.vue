<template>
  <v-btn color="error" icon to="/" absolute class="btn-close">
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonClose'
}
</script>

<style>
.btn-close {
  z-index: 100;
  right: 5px;
  top: 5px;
}
</style>
