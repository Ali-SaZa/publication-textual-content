import Vue from "vue";
import VueRouter from "vue-router";
// import signIn from "@/views/signIn";

Vue.use(VueRouter);
function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}
const routes = [
  {
    name: "home",
    path: "/",
    component: lazyLoad("homePage"),
  },
  {
    name: "signPage",
    path: "/login",
    component: lazyLoad("signIn"),
  },
  {
    name: "signPage",
    path: "/register",
    component: lazyLoad("registerUser"),
  },
  {
    name: "notFound",
    path: "*",
    component: lazyLoad("notFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  },
});

export default router;

// const routes = [
//   {
//     path: "/signin",
//     name: "signin",
//     component: () =>
//       import(/* webpackChunkName: "signin" */ "../views/signIn.vue"),
//   },
//   // {
//   //   name: "404",
//   //   path: "*",
//   //   component: PageNotFound,
//   // },
// ];
//
// const router = new createRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition;
//     } else {
//       window.scroll({ top: 0, left: 0, behavior: "smooth" });
//     }
//   },
// });

// router.beforeResolve((to, _, next) => {
// // If this isn't an initial page load.
// if (to.name) {
//     // Start the route progress bar.
//     store.commit("setLoading", true);
// }
// next();
// });

// router.beforeEach((to, from, next) => {
// if (to.fullPath.includes("/dashboard")) {
//     if (store.getters["auth/isAuth"]) {
//         next();
//     } else {
//         next("/login");
//     }
// } else if (to.fullPath === "/login" || to.fullPath === "/register") {
//     if (store.getters["auth/isAuth"]) {
//         next("/dashboard");
//     } else {
//         next();
//     }
// } else {
//     next();
// }
// });
