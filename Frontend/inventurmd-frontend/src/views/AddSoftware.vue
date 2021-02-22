<template>

  <div id="AddDevice">
    <p>Bitte geben Sie die Daten f&uuml;r eine neue Software ein</p>
    <table>
      <tr>
        <td>
          <label> Art </label>
        </td>
        <td>
          <input v-model="message" placeholder="Art">
        </td>
      </tr>
      <tr>
        <td>
          <label> Details </label>
        </td>
        <td>
          <input v-model="message" placeholder="Details">
        </td>
      </tr>
      <tr>
        <td>
          <label> Produktname </label>
        </td>
        <td>
          <input v-model="message" placeholder="Produktname">
        </td>
      </tr>
      <tr>
        <td>
          <label> Hardware </label>
        </td>
        <td>
          <input v-model="message" placeholder="Hardware">
        </td>
      </tr>

      <tr>
        <td colspan="2">
          <button v-on:click="saveSoftware" variant="primary"> Save Device and return to Home </button>
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
  name: 'AddDevice',
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridApi: null,
      columnApi: null,
      autoGroupColumnDef: null
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