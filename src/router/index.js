import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

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
    component: lazyLoad("signPage"),
  },
  {
    name: "registerPage",
    path: "/register",
    component: lazyLoad("registerPage"),
  },
  {
    name: "settingPage",
    path: "/settings",
    component: lazyLoad("settingPage"),
    meta: { needAuthentication: false },
  },
  {
    name: "newArticlePage",
    path: "/editor",
    component: lazyLoad("newArticlePage"),
    meta: { needAuthentication: false },
  },
  {
    path: "/article/:id",
    component: lazyLoad("articleDetailPage"),
  },
  {
    name: "notFound",
    path: "*",
    component: lazyLoad("notFound"),
    meta: { needAuthentication: false },
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

router.beforeEach(function (to, _, next) {
  if (to.meta.needAuthentication && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.needAuthentication && store.getters.isAuthenticated) {
    next(to);
  } else {
    next();
  }
});

export default router;
