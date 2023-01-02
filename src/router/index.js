import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import { store } from "@/store/store";
import { computed } from "vue";
import { IS_AUTHENTICATED } from "@/action/actionTypes";

const IsAuthenticated = computed(() => {
  return store.getters[IS_AUTHENTICATED];
});

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
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
    path: "/dashboard",
    name: "Dashboard",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next("/login");
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
