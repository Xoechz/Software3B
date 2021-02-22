import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module';
import { device } from './device.module';
import { software } from './software.module';
import { serverservice } from './serverservices.module';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
        auth,
        device,
      software,
      serverservice

  }
})
