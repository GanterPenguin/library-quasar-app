import Vuex from 'vuex';
import Vue from 'vue';
import { config } from 'vuex-module-decorators';

config.rawError = true;

Vue.use(Vuex);

export default new Vuex.Store({
  strict: !!process.env.DEV,
});
