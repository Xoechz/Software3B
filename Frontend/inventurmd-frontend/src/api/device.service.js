import { httpClient } from './httpClient.js';
import { authHeader } from './auth.header.js';
import axios from 'axios';

const END_POINT = '/device';
// https://bezkoder.com/jwt-vue-vuex-authentication/#Authentication_service

class DeviceService{
    getAllDevices() {
        console.log(authHeader());
        return httpClient
            .get(END_POINT, {
                headers: authHeader()
            })
            .then(response => {
                console.log(response);
                return response;
            }).catch(err => {
                console.log(err)
            });
       }
       deleteDevice(payload) {
           console.log(authHeader());
           console.log(payload.id);
           return httpClient
               .delete(END_POINT + "/" + payload.id, {
                   headers: authHeader()
               }).then(response =>{
                   console.log(response)
                   return response;
               }).catch(err => {
                   console.log((err))
               });
       }
       addDevice(payload){
           console.log(authHeader());
           return httpClient
               .post(END_POINT, {
                   headers: authHeader(),
                   body:{
                       "productName": payload.productName,
                       "type": payload.type,
                       "manufacturer": payload.manufacturer,
                       "version": payload.version,
                       "serialNumber": payload.serialNumber,
                       "inventoryNumber": payload.inventoryNumber,
                       "location": payload.location,
                       "warranty": payload.warranty,
                       "purchaseDate": payload.purchaseDate,
                       "firmware": payload.firmware
                   }
               }).then(response =>{
                   console.log(response)
                   return response;
               }).catch(err => {
                   console.log((err))
               });
       }
}
export default new DeviceService();

