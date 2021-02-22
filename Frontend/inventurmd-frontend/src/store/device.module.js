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

    },
      deleteDevice({ commit }, payload) {
          return DeviceService.deleteDevice(payload).then(
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
      addDevice({ commit }, payload) {
          return DeviceService.addDevice(payload).then(
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
