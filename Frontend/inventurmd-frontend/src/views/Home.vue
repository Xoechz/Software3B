<template>
    <div id="homeDiv">
        <nav-bar />
        <div class="mainContent">
            <h1>HOME</h1>

            <label id="mail">E-Mail: {{email}}</label><br /><label id="role">Rolle: {{role}}</label>


            <div>
                <b-dropdown id="dropdown-aria" text="Ansicht Waehlen" variant="primary" class="m-2">
                    <b-dropdown-item-button v-on:click="showDevices()">Devices</b-dropdown-item-button>
                    <b-dropdown-item-button v-on:click="showSoftware()">Software</b-dropdown-item-button>
                    <b-dropdown-item-button v-on:click="showServerServices()">Server Services</b-dropdown-item-button>
                </b-dropdown>
            </div>
            <div class="centerTables" style="width: 100%;" domLayout='autoHeight'>
                <ag-grid-vue style="width: 100%; height: 20em; align-self: center; font-size: 12px; margin-left: 2px; margin-right: 2px; " domLayout='autoHeight'
                             class="ag-theme-balham"
                             :columnDefs="columnDefs"
                             :rowData="rowData"
                             rowSelection="single"
                             @grid-ready="onGridReady"
                             @rowClicked="onRowClicked">
                </ag-grid-vue>
            </div>
            <div>
                <b-button v-on:click="addItem()" variant="primary">Hinzufuegen</b-button>
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
        name: 'App',
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
                const selectedDataStringPresentation = selectedData.map(node => node.type + ' ' + node.productName + ' ' + node._id).join(', ');
                var del = confirm(`Delete node: ${selectedDataStringPresentation}`);
                  if(del === true){
                    this.deleteItem("device/deleteDevice", selectedData.map(node => node._id));
                    this.showDevices();
                    //this.deleteItem("software/deleteSoftware", selectedData.map(node => node._id));
                    //this.deleteItem("serverservice/deleteServerService", selectedData.map(node => node._id));
                    //only delete device works right now, the routes and requests are for the other 2 are defined but not used yet
                  }
            },
            getData: async function (queryPath, picker) {
              this.$store.dispatch(queryPath).then(
                  response => {
                    if (picker === 1) {
                      console.log(response.data.devices[0]);
                      this.rowData = response.data.devices;
                    } else if (picker === 2) {
                      console.log(response.data.software[0]);
                      this.rowData = response.data.software;
                    } else if (picker === 3) {
                      console.log(response.data.serverServices[0]);
                      this.rowData = response.data.serverServices;
                    } else {
                      //Add query for email
                    }

                  },
                  error => {
                    console.log(error);
                  });
            },
          deleteItem: async function (queryPath, id) {
              console.log(id);
            this.$store.dispatch(queryPath, {id: id}).then(
                response => {

                    console.log(response);

                },
                error => {
                  console.log(error);
                });
          },
            showDevices() {
                this.rowData = null;
                this.columnDefs = [
                    { headerName: 'ID', field: '_id', sortable: true, filter: true },
                    { headerName: 'Inventar Nummer', field: 'inventoryNumber', sortable: true, filter: true },
                    { headerName: 'Art', field: 'type', sortable: true, filter: true },
                    { headerName: 'Produktname', field: 'productName', sortable: true, filter: true },
                    { headerName: 'Hersteller', field: 'manufacturer', sortable: true, filter: true },
                    { headerName: 'Firmware', field: 'firmware', sortable: true, filter: true },
                    { headerName: 'Standort', field: 'location', sortable: true, filter: true },
                    { headerName: 'Kaufdatum', field: 'purchaseDate', sortable: true, filter: true },
                    { headerName: 'Garantie', field: 'warranty', sortable: true, filter: true },
                    { headerName: 'Seriennummer', field: 'serialNumber', sortable: true, filter: true },
                    { headerName: 'Version', field: 'version', sortable: true, filter: true }
                ];
                this.getData('device/getAllDevices', 1);
            },
            showSoftware() {
                console.log("ShowSoftware");
                this.rowData = null;
                this.columnDefs = [
                  { headerName: 'ID', field: '_id', sortable: true, filter: true },
                    { headerName: 'Details', field: 'details', sortable: true, filter: true },
                    { headerName: 'Art', field: 'type', sortable: true, filter: true },
                    { headerName: 'Produktname', field: 'name', sortable: true, filter: true },
                    { headerName: 'Hardware', field: 'hardware', sortable: true, filter: true }
                ];
                this.getData('software/getAllSoftware', 2);
            },
            showServerServices() {
                console.log("ShowServerServices");
                this.rowData = null;
                this.columnDefs = [
                  { headerName: 'ID', field: '_id', sortable: true, filter: true },
                    { headerName: 'Art', field: 'type', sortable: true, filter: true },
                    { headerName: 'Produktname', field: 'productName', sortable: true, filter: true },
                    { headerName: 'Version', field: 'version', sortable: true, filter: true }
                ];
               this.getData('serverservice/getAllServerServices', 3);
            },
          addItem() {
            //You have to call the adding-page
            console.log("Add Item")
            this.$router.push({ name: 'AddItem' });
          },
            // Just to show something as an example
            onRowClicked() {
                console.log(this.getSelectedRows());
            },
          getContextMenuItems(params) {
              console.log("here");
            var result = [
              {
                name: 'Alert ' + params.value,
                action: function () {
                  window.alert('Alerting about ' + params.value);
                },
                cssClasses: ['redFont', 'bold'],
              },
              {
                name: 'Always Disabled',
                disabled: true,
                tooltip:
                    'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
              }
            ];
            return result;
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
<style lang="scss" scoped>
    @import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
    @import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
    h1 {
        margin-top: 2.5em;
    }
    .centerTables {
        display: flex;
        justify-content: center;
    }
</style>