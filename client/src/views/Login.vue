<template>
  <v-overlay z-index="99">
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-card light style="margin-top: -150px;">
          <v-card-title>Login Form</v-card-title>
          <v-card-text>
            <v-text-field
              required
              v-model="email"
              label="E-mail"
              :rules="emailRules"
            ></v-text-field>

            <v-text-field
              required
              v-model="password"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text to="/">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="login">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="isLoading"
              ></v-progress-circular>
              <span v-else>Login</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    login() {
      this.$store.commit('isLoading')
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('UserId', res.data.id)
          this.$store.dispatch('fetchWhislist')
          this.$store.dispatch('fetchCarts')
          this.$store.commit('isLogin')
          this.$router.push('/')
          this.$store.commit(
            'message',
            `Selamat datang ${res.data.first_name}, senang bertemu denganmu lagi.`
          )
        })
        .catch(err => {
          this.$store.commit('message', err.response.data.message)
        })
        .finally(() => {
          this.email = ''
          this.password = ''
          this.$store.commit('isLoading')
        })
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>
.v-overlay__content {
  width: 100% !important;
  padding: 12px;
  margin-left: auto;
  margin-right: auto;
}
</style>
