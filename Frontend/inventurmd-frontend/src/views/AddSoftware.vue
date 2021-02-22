<template>

  <div id="AddDevice">
    <p>Bitte geben Sie die Daten f&uuml;r eine neue Software ein</p>
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
          <label> Details </label>
        </td>
        <td>
          <input v-model="details" placeholder="Details">
        </td>
      </tr>
      <tr>
        <td>
          <label> Produktname </label>
        </td>
        <td>
          <input v-model="produktname" placeholder="Produktname">
        </td>
      </tr>
      <tr>
        <td>
          <label> Hardware </label>
        </td>
        <td>
          <input v-model="hardware" placeholder="Hardware">
        </td>
      </tr>

      <tr>
        <td colspan="2">
        <button v-on:click="ADDSOFTWARE" variant="primary"> Save Device and return to Home </button>
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
  name: 'AddSoftware',
  data() {
    return {
      hardware: '',
      produktname: '',
      details: '',
      art: '',
    }
  },
  components: {
    AgGridVue,
    NavBar,
    FooterBar
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    ADDSOFTWARE: async function (queryPath, picker) {
      this.$store.dispatch("/software/addSoftware", {
        name: this.produktname,
        type: this.art,
        details: this.details,
        hardware: this.hardware
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
    saveSoftware() {
      console.log("Added Device");
      //save the data from the input



      //after saving return to home screen
      this.$router.push({ name: 'Home' });
    },
    // Just to show something as an example
    onRowClicked() {
      console.log(this.getSelectedRows());
    }
  },
  beforeMount() {
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.role = "Administrator"; //Database query required
    this.showDevices();
    this.autoGroupColumnDef = {
      headerName: 'Model',
      field: 'model',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    };
  }
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