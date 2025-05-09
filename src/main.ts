import Vue from "vue";
import App from "./App.vue";
// router
import router from "@/router";

// antd
import initAntd from "@/antd";
// antv x6 shape register
import { registerShapeType } from "@/node";

Vue.config.productionTip = false;

initAntd();

registerShapeType();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
