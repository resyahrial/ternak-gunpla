<template>
  <v-menu offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn min-width="0" text v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-btn @click="logout">
      <v-list class="pl-4 pr-10" flat nav>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list>
    </v-btn>
  </v-menu>
</template>

<script>
export default {
  name: 'Account',
  methods: {
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('role')
      this.$router.push('Login')
    }
  }
}
</script>

<style></style>
