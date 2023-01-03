import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import { store } from "@/store/store";
import { computed } from "vue";
import { IS_AUTHENTICATED } from "@/action/actionTypes";
import { DASHBOARD_VIEW_URL, LOGIN_VIEW_URL } from "@/constants";

const IsAuthenticated = computed(() => {
  return store.getters[IS_AUTHENTICATED];
});

const routes = [
  {
    path: "/",
    redirect: LOGIN_VIEW_URL,
  },
  {
    path: LOGIN_VIEW_URL,
    name: "Login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (IsAuthenticated.value) next("/dashboard");
      else {
        next();
      }
    },
  },
  {
    path: DASHBOARD_VIEW_URL,
    name: "Dashboard",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL);
      else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
