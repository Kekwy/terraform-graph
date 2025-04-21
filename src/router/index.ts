import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from "@/views/WelcomeView.vue";
import HomeView from "@/views/HomeView.vue";
import TestView from "@/views/TestView.vue";
import homeRoutes from "@/router/home";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "welcome",
      path: '/',
      component: WelcomeView
    },
    {
      name: "home",
      path: '/home',
      redirect: '/home/application',
      component: HomeView,
      children: [...homeRoutes]
    },
    {
      name: "test",
      path: '/test',
      component: TestView
    }
  ]
});

export default router;