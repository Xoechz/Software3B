<template>

  <div id="AddDeviceDiv">
    <nav-bar />
    <div class="mainContent">
      <h1>HOME</h1>

      <label id="mail">E-Mail: {{email}}</label><br /><label id="role">Rolle: {{role}}</label>



    </div>
    <footer-bar />
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

    addItem() {
      //You have to call the adding-page
      console.log("Add Item")
      this.$router.push({ name: 'AddItem' });
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

</style>