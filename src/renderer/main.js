import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import Progress from 'vue-multiple-progress';

// Production Dev Tools
import { remote } from 'electron';

// remote.globalShortcut.register('CommandOrControl+Shift+K', () => {
//   remote.BrowserWindow.getFocusedWindow().webContents.openDevTools();
// });

window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll();
});
// End

// const VueInputMask = require('vue-inputmask').default
// Vue.use(VueInputMask)

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

Vue.use(Progress);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
