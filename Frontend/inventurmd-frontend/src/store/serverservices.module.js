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
        },
        deleteServerService({ commit }, payload) {
            return ServerServicesService.deleteServerService(payload).then(
                response => {
                    console.log(response);
                    return Promise.resolve(response);
                },
                error => {
                    console.log(error);
                    return Promise.reject(error);
                }
            );

        },
        addServerService({ commit }, payload) {
            return ServerServicesService.addServerService(payload).then(
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
