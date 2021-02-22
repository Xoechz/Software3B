import { httpClient } from './httpClient.js';
import { authHeader } from './auth.header.js';
import axios from 'axios';

const END_POINT = '/software';
// https://bezkoder.com/jwt-vue-vuex-authentication/#Authentication_service

class SoftwareService{
    getAllSoftware() {
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
}
export default new SoftwareService();

