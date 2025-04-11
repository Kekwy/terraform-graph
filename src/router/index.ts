import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from "@/views/WelcomeView.vue";
import HomeView from "@/views/HomeView.vue";

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
        }
    ]
});

export default router;