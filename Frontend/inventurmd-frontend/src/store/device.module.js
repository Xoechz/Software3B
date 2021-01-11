import DeviceService from '../api/device.service';


export const device = {
  namespaced: true,
  actions: {
      getAllDevices({ commit }) {
          return DeviceService.getAllDevices().then(
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
