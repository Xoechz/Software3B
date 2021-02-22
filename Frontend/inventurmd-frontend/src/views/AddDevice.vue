<template>

  <div id="AddDeviceDiv">
    <nav-bar />
    <div class="mainContent">
      <h1>Ger&auml;t hinzuf&uuml;gen</h1>

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
                    <input type="date" v-model="kaufdatum" placeholder="2021-02-22">
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
                    <button v-on:click="ADDDEVICE" variant="primary"> Save Device and return to Home </button>
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
      email: 'david@dreib.at',
      role: 'administrator',
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

    ADDDEVICE: async function (queryPath, picker) {
      this.$store.dispatch("/device/addDevice", {
        productName: "Ulli",
        type: "Switch",
        manufacturer: "Cisco",
        version: "1150",
        serialNumber: "AT9938383745",
        inventoryNumber: "123",
        location: "HLA",
        warranty: "2020-12-31T00:00:00.000Z",
        purchaseDate: "2005-04-06T00:00:00.000Z",
        firmware: "Ulli OS"

/*
        productName: this.produktname.toString(),
        type: this.art.toString(),
        manufacturer: this.hersteller.toString(),
        version: this.version.toString(),
        serialNumber: this.seriennummer.toString(),
        inventoryNumber: this.inventarnummer.toString(),
        location: this.standort.toString(),
        warranty: this.garantie.toString(),
        purchaseDate: this.kaufdatum.toString(),
        firmware: this.firmware.toString() */
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
    printData(){
      //only for test purposes;
      this.inventarnummer = "modified";
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