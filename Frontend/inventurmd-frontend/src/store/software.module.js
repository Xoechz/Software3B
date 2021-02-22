import SoftwareService from '../api/software.service';


export const software = {
    namespaced: true,
    actions: {
        getAllSoftware({ commit }) {
            return SoftwareService.getAllSoftware().then(
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
