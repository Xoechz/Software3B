<template>
  <div id="AddItemDiv">
    <nav-bar />
    <div class="mainContent">
      <h1>Add Item</h1>

      <label id="mail">E-Mail: {{email}}</label><br /><label id="role">Rolle: {{role}}</label>

      <p> Welches Item wollen Sie hinzufuegen?</p>
      <div id="SelectAddItem">
        <table style="text-align: center">
          <tr>
            <td>
              <button v-on:click="pushDeviceRoute" variant="primary"> Device </button>
            </td>
          </tr>
          <tr>
            <td>
              <button v-on:click="pushServerServiceRoute" variant="primary"> ServerService </button>
            </td>
          </tr>
          <tr>
            <td>
              <button v-on:click="pushSoftwareRoute" variant="primary"> Software </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <footer-bar />
  </div>
</template>

<script>

import { AgGridVue } from "ag-grid-vue"
import NavBar from '../components/NavBar'
import FooterBar from '../components/Footer'

export default {
  name: 'AddItem',
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
    // for further functionalities (z.B edit or delete)
    getSelectedRows() {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => node.type + ' ' + node.productName).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    },
    getData: async function (queryPath, picker) {
      if (true) {
        this.$store.dispatch(queryPath).then(
            response => {
              if (picker == 1) {
                console.log(response.data.devices[0]);
                this.rowData = response.data.devices;
              }
              else if (picker == 2) {
                console.log(response.data.software[0]);
                this.rowData = response.data.software;
              }
              else if (picker == 3) {
                console.log(response.data.serverServices[0]);
                this.rowData = response.data.serverServices;
              }
              else {
                //Add query for email
              }

            },
            error => {
              console.log(error);
            });
      }
    },
     pushDeviceRoute(){
       this.$router.push({ name: 'AddDevice' });
     },
    pushServerServiceRoute(){
      this.$router.push({ name: 'AddServerService' });
    },
    pushSoftwareRoute(){
      this.$router.push({ name: 'AddSoftware' });
    },
    addItem() {
      console.log("Add Item");
      this.$router.push({ name: 'AddItem' });
      //You have to call the adding-page
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
#SelectAddItem{
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