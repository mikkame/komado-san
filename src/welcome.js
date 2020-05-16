import Vue from 'vue'
import Welcome from './Welcome.vue'

import 'photon/dist/css/photon.css'
import './assets/style.css'
import './assets/moveable.css'
Vue.config.productionTip = false

new Vue({
    render: h => h(Welcome),
}).$mount('#app')
