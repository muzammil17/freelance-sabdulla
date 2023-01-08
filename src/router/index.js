import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import MemberView from "../views/MemberView.vue";
import MemberListView from "../views/MemberListView.vue";
import MemberDetailView from "@/views/MemberDetail.vue";

import { store } from "@/store/store";
import { computed } from "vue";
import { IS_AUTHENTICATED } from "@/action/actionTypes";
import {
  DASHBOARD_VIEW_URL,
  EDIT_MEMBER_URL,
  LOGIN_VIEW_URL,
  MEMBER_VIEW_URL,
  VIEW_MEMBERS_LIST_URL,
  VIEW_MEMBER_DETAIL_URL,
} from "@/constants";

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
  {
    path: VIEW_MEMBERS_LIST_URL,
    name: "MembersList",
    component: MemberListView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL);
      else {
        next();
      }
    },
  },
  {
    path: VIEW_MEMBER_DETAIL_URL,
    name: "MemberDetail",
    component: MemberDetailView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL);
      else {
        next();
      }
    },
  },
  {
    path: MEMBER_VIEW_URL,
    name: "Membership",
    component: MemberView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL);
      else {
        next();
      }
    },
  },
  {
    path: EDIT_MEMBER_URL,
    name: "Edit Membership",
    component: MemberView,
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
