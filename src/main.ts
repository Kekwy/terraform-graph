import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// router
import router from "@/router";

// antd
import initAntd from "@/antd";

initAntd()


// antv x6 shape register
import {registerShapeType} from "@/node";

registerShapeType()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
