<template>
  <div id="AddDevice">
    <nav-bar />
    <h1>ServerService hinzuf&uuml;gen</h1>
    <p>Bitte geben Sie die Daten f&uuml;r einen neuen ServerService ein</p>
    <table>
      <tr>
        <td>
          <label> Art </label>
        </td>
        <td>
          <input v-model="art" placeholder="Art">
        </td>
      </tr>
      <tr>
        <td>
          <label> Produktname </label>
        </td>
        <td>
          <input v-model="productname" placeholder="Produktname">
        </td>
      </tr>
      <tr>
        <td>
          <label> Version </label>
        </td>
        <td>
          <input v-model="version" placeholder="Version">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button v-on:click="ADDSERVERSERVICE" variant="primary"> Save Device and return to Home </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue"
import NavBar from '../components/NavBar'
import FooterBar from '../components/Footer'

export default {
  name: 'AddServerService',
  data() {
    return {
      art: '',
      version: '',
      productname: '',
    }
  },
  components: {
    AgGridVue,
    NavBar,
    FooterBar
  },
  methods: {
    ADDSERVERSERVICE: async function (queryPath, picker) {
      this.$store.dispatch("serverservice/addServerService", {
          type: "Fileserver",
          productName: "Samba",
          version: "3.1"
      }).then(
          response => {
            this.$router.push({ name: 'Home' });
            console.log(response);
          },
          error => {
            console.log(error);
            this.$router.push({ name: 'Home' });
          });
    },
    saveServerService() {
      //You have to call the adding-page
      console.log("Added Device");
      //save the data from the input



      //after saving return to home screen
      this.$router.push({ name: 'Home' });
    },
    // Just to show something as an example

  },

}
</script>

<style scoped>
#AddDevice{
  margin: auto;
}

td{
  margin: 50px;
  width: 30%;
}

tr{
  margin-bottom: 100px;
}

table{
  width: 100%;
  height: 100%;
}
</style>