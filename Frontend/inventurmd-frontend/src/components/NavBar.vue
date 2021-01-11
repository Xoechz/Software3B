<template>
  <div>
  <b-navbar fixed="top" toggleable="lg" type="light" variant="primary">
    <b-navbar-brand href="/"><b-img id="logo" :src="require('../assets/InventurMD_logo.svg')" fluid alt="Fluid image"></b-img>Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Gerät</b-nav-item>
        <b-nav-item href="#">Software</b-nav-item>
        <b-nav-item href="#">Serverdienst</b-nav-item>
        <b-nav-item href="#">Benutzer</b-nav-item>
        <b-nav-item href="#">Rollen</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" right>
          <b-button variant="dark" class="my-2 my-sm-0" @click="logout()">
            <b-spinner v-show="loading" id="loadingSpinner" small type="grow"></b-spinner>
            Abmelden
            </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'NavBar',
  data(){
    return {
      loading: false,
    };
  },
  methods: {
      logout: async function() {
        this.loading = true;
          this.$store.dispatch('auth/logout').then(
            () => {
              this.loading = false;
              this.$router.push('/login');
            },
            error => {
              this.loading = false;
              // this.message =
              //   (error.response && error.response.data) ||
              //   error.message ||
              //   error.toString();
            }
          );
        }
  }
}
</script>

<style scoped>
#logo{
 width: 3em;
 margin-right: .5em;
}
</style>