<template>
  <v-app class="justify-center">
    <v-form class="mt-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" offset-md="4">
            <v-text-field
              label="E-mail"
              required
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              label="Password"
              required
              class="input-group--focused"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn class="mr-4" color="success" @click.prevent="login">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="isLoading"
              ></v-progress-circular>
              <span v-else>Login</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      isLoading: false
    }
  },
  methods: {
    login() {
      this.isLoading = !this.isLoading
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('access_token', res.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          this.$swal({
            text: err.response.data.message,
            icon: 'error',
            timer: 1200,
            showConfirmButton: false
          })
        })
        .finally(() => {
          this.isLoading = !this.isLoading
          this.email = ''
          this.password = ''
        })
    }
  }
}
</script>

<style></style>
