import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from "@/views/WelcomeView.vue";
import HomeView from "@/views/HomeView.vue";
import TestView from "@/views/TestView.vue";

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
            component: HomeView
        },
        {
            name: "test",
            path: '/test',
            component: TestView
        }
    ]
});

export default router;