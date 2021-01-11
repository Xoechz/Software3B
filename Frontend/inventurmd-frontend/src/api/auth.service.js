import {httpClient} from './httpClient.js';

const END_POINT = '/user/login';

class AuthService{
    login(user){
        return httpClient
            .post(END_POINT, { email: user.email, password: user.password })
            .then(response => {
                if (response.data.session.sessionToken) {
                    // creating new user object for localStorage in order to avoid saving the password to the client
                    var responseUser = { email: user.email, sessionToken: response.data.session.sessionToken }
                    localStorage.setItem('user', JSON.stringify(responseUser));
                }
                
                return responseUser;  
            })
    }
    logout() {
        localStorage.removeItem('user');
    }
}
export default new AuthService();