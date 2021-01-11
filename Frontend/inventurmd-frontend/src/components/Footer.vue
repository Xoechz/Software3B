<template>
  <footer>
      <a href="../contact" style="float:left; margin-left:1em; margin-top:26px;">Kontakt</a>
      <a href="../legaldisclosure" style="float:left; margin-left:1em; margin-top:26px">Impressum</a>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style scoped>
  footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background-color: #007bff;
  }
  a, a:link, a:visited{
    color: rgba(0, 0, 0, 0.6);
  }
  a:hover, a:active{
    color:rgba(0, 0, 0, 0.9);;
    text-decoration: none;
  }
</style>