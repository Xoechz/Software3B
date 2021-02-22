<template>

  <div id="AddDeviceDiv">
    <nav-bar />
    <div class="mainContent">
      <h1>HOME</h1>

      <label id="mail">E-Mail: {{email}}</label><br /><label id="role">Rolle: {{role}}</label>
        <div id="AddDevice">
          <p>Bitte geben Sie die Daten f&uuml;r ein neues Ger&auml;t ein</p>
              <table>
                <tr>
                  <td>
                    <label> Inventarnummer </label>
                  </td>
                  <td>
                    <input v-model="inventarnummer" placeholder="Inventarnummer">
                  </td>
                </tr>
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
                    <input v-model="produktname" placeholder="Produktname">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Hersteller </label>
                  </td>
                  <td>
                    <input v-model="hersteller" placeholder="Herrsteller">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Firmware </label>
                  </td>
                  <td>
                    <input v-model="firmware" placeholder="Firmware">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Standort </label>
                  </td>
                  <td>
                    <input v-model="standort" placeholder="Standort">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Kaufdatum </label>
                  </td>
                  <td>
                    <input v-model="kaufdatum" placeholder="Kaufdatum">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Garantie </label>
                  </td>
                  <td>
                    <input v-model="garantie" placeholder="Garantie">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label> Seriennummer </label>
                  </td>
                  <td>
                    <input v-model="seriennummer" placeholder="Seriennummer">
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
                    <button v-on:click="saveDevice" variant="primary"> Save Device and return to Home </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    Inventarnummer: {{inventarnummer}}
                  </td>
                  <td colspan="2">
                    <button v-on:click="printData" variant="primary"> printData </button>
                  </td>
                </tr>
              </table>
           </div>
            </div>
    </div>
    <!-- <footer-bar /> -->

</template>

<script>
import { AgGridVue } from "ag-grid-vue"
import NavBar from '../components/NavBar'
import FooterBar from '../components/Footer'

export default {
  name: 'AddDevice',
  data() {
    return {
      version: '',
      seriennummer: '',
      standort: '',
      garantie: '',
      kaufdatum: '',
      firmware: '',
      hersteller: '',
      produktname: '',
      inventarnummer: '',
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

    saveDevice() {
      //You have to call the adding-page
      console.log("Added Device");
      //save the data from the input



      //after saving return to home screen
      this.$router.push({ name: 'Home' });
    },
    printData(){
      data.inventarnummer = "modified";

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