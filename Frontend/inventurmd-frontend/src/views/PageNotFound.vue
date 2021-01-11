
<template>
  <div class="pagenotfound">
    <nav-bar />
    <div class="mainContent">
      <b-jumbotron header="404" lead="Page not found">
        <p>
        </p>
      </b-jumbotron>
    </div>
    <footer-bar />
  </div>
</template>

<script>
    import NavBar from '../components/NavBar'
    import FooterBar from '../components/Footer' 

    export default {
    
        components: {
            NavBar,
            FooterBar
        },

}
</script>

<style scoped>
    h1 {
        margin-top: .5em; 
    }
    dt {
        margin-top: 1em;
    }
</style>