import Vue from 'vue'
import App from './App.vue'

import 'photon/dist/css/photon.css'
import './assets/style.css'
import './assets/moveable.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
