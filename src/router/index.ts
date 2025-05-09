import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView.vue";
import homeRoutes from "@/router/home";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "/",
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      redirect: "/home/application",
      component: HomeView,
      children: [...homeRoutes],
    },
  ],
});

export default router;
