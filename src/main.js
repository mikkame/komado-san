import Vue from 'vue'
import App from './App.vue'

import 'photon/dist/css/photon.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
