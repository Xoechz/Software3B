import {httpClient} from './httpClient.js';
import { authHeader } from './auth.header.js';

export async function authCheckToken() {
  return new Promise((result, reject) => {
    httpClient
    .get("/user/tokenValid", {
      headers: authHeader()
    })
    .then(response => {
      result(true);
    })
    .catch(err =>{
      // delete the user if the session is no longer available
      localStorage.removeItem('user');
      result(false);
    })
  })
  }
  