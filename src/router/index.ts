import Vue from 'vue'
import Router from 'vue-router'
import HomeView from "@/views/HomeView.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            name: "home",
            path: '/',
            component: HomeView
        },
    ]
});

export default router;