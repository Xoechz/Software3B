<template>
  <div class="login">
    <b-img id="logo" :src="require('../assets/InventurMD_logo.svg')" fluid alt="Fluid image"></b-img>
    <h1>Login</h1>
    <b-container id="inputContainer">
        <label> E-Mail: </label>
        <b-form-input v-model="user.email" id="emailInput" type="email" autofocus="true" size="md" required="true"></b-form-input>
        <label> Passwort: </label>
        <b-form-input v-model="user.password" id="passwordInput" type="password" required="true"></b-form-input>
        <b-button id="submitButton" variant="outline-primary" type="submit" size="lg" @click="login()" style="margin-top:0">
          <b-spinner v-show="loading" id="loadingSpinner" small type="grow"></b-spinner>
          Anmelden
        </b-button>
        <b-alert show v-if="message" variant="danger">{{message}}</b-alert>
  </b-container>
  </div>
</template>

<script>
import User from '../models/user';

export default {
    name: 'Login',
    data(){
      return {
        user: new User('', ''),
        loading: false,
        successful: false,
        message: ''
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
  },
    created() {
      if (this.loggedIn) {
        this.$router.push('/');
      }
  },
    methods: {
        login: async function() {
          if (this.user.email && this.user.password) {
            this.loading = true;
            this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.loading = false;
                this.$router.push('/');
              },
              error => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
            );
          }
        }
    }
}
</script>

<style scoped>
* {
  margin-top: 1em;
}
img{
  width: 10em;
}
label {
  font-size: 1.2em;
}
#logo {
  margin-top: 3em;
}
#inputContainer {
  margin-top: 0.5em;
}
#passwordInput {
  margin-bottom: 2em;
}
#submitButton {
  margin-bottom: 1em;
}
#loadingSpinner{
  margin-top: 0;
  margin-bottom: 0.2em;
}
</style>