import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// router
import router from "@/router";

// antd
import initAntd from "@/antd";

initAntd()

// antv x6 node
import {registerAwsNodeTypes} from "@/utils/node_util";

registerAwsNodeTypes()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
