<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body{ height: 100%;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100%; position:relative;
}

/* .mainContent is used for adding a padding to the content above the footer to avoid an overflow 
*  it is used on every view in some form
*/
.mainContent{
    padding-bottom: 85px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
