import ServerServicesService from '../api/serverservices.service';


export const serverservice = {
    namespaced: true,
    actions: {
        getAllServerServices({ commit }) {
            return ServerServicesService.getAllServerServices().then(
                response => {
                    console.log(response);
                    return Promise.resolve(response);
                },
                error => {
                    console.log(error);
                    return Promise.reject(error);
                }
            );
        }
    }
};
