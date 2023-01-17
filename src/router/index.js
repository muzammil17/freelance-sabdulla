import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import MemberView from "../views/MemberView.vue";
import MemberListView from "../views/MemberListView.vue";
import MemberDetailView from "@/views/MemberDetail.vue";
import DashboardEmpty from "@/views/DashboardEmpty.vue";
import ProgramsView from "@/views/program-views/ProgramsView.vue";
import ProgramDetailView from "@/views/program-views/ProgramsDetailView.vue";

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
  VIEW_PROGRAMS_URL,
  VIEW_PROGRAM_Detail_URL,
} from "@/constants";

const IsAuthenticated = computed(() => {
  return store.getters[IS_AUTHENTICATED];
});

const routes = [
  {
    path: "/",
    name: "Home",
    component: DashboardEmpty,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: LOGIN_VIEW_URL.url,
    name: LOGIN_VIEW_URL.title,
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (IsAuthenticated.value) next("/");
      else {
        next();
      }
    },
  },
  {
    path: VIEW_PROGRAMS_URL.url,
    name: VIEW_PROGRAMS_URL.title,
    component: ProgramsView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: VIEW_PROGRAM_Detail_URL.url,
    name: VIEW_PROGRAM_Detail_URL.title,
    component: ProgramDetailView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: DASHBOARD_VIEW_URL.url,
    name: DASHBOARD_VIEW_URL.title,
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: VIEW_MEMBERS_LIST_URL.url,
    name: VIEW_MEMBERS_LIST_URL.title,
    component: MemberListView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: VIEW_MEMBER_DETAIL_URL.url,
    name: VIEW_MEMBER_DETAIL_URL.title,
    component: MemberDetailView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: MEMBER_VIEW_URL.url,
    name: MEMBER_VIEW_URL.title,
    component: MemberView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: EDIT_MEMBER_URL.url,
    name: EDIT_MEMBER_URL.title,
    component: MemberView,

    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
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
