const homeRoutes = [
  {
    path: "application",
    name: "Application",
    component: () => import("@/views/ApplicationView.vue"),
    meta: { title: "应用" },
  },
  // 其他子路由...
];

export default homeRoutes;
