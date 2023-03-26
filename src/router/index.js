import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import MemberView from "../views/MemberView.vue";
import EditMemberView from "../views/EditMemberView.vue";
import MemberListView from "../views/MemberListView.vue";
import MemberDetailView from "@/views/MemberDetail.vue";
import DashboardEmpty from "@/views/DashboardEmpty.vue";
import ProgramsView from "@/views/program-views/ProgramsView.vue";
import ProgramDetailView from "@/views/program-views/ProgramsDetailView.vue";
import AllProgramView from "@/views/program-views/AllProgramView.vue";
import CreateProgramView from "@/views/program-views/CreateProgramView.vue";
import AddVisitor from "@/views/visitor-views/LoginVisitor.vue";
import AllVisitors from "@/views/visitor-views/AllVisitorsView.vue";

import CartView from "@/views/CartView.vue";
import { store } from "@/store/store";
import { computed } from "vue";
import { IS_AUTHENTICATED } from "@/action/actionTypes";
import {
  ALL_VISITOR_URL,
  CREATE_ENTRY_VISITOR_URL,
  DASHBOARD_VIEW_URL,
  EDIT_MEMBER_URL,
  LOGIN_VIEW_URL,
  MEMBER_VIEW_URL,
  VIEW_ALL_PROGRAMS_DISPLAY_URL,
  VIEW_CART_LIST_URL,
  VIEW_CREATE_PROGRAM_URL,
  VIEW_MEMBERS_LIST_URL,
  VIEW_MEMBER_DETAIL_URL,
  VIEW_PROGRAMS_URL,
  VIEW_PROGRAM_Detail_URL,
  VIEW_UPDATE_PROGRAM_URL,
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
    path: VIEW_CART_LIST_URL.url,
    name: VIEW_CART_LIST_URL.title,
    component: CartView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },

  {
    path: VIEW_ALL_PROGRAMS_DISPLAY_URL.url,
    name: VIEW_ALL_PROGRAMS_DISPLAY_URL.title,
    component: AllProgramView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },

  {
    path: VIEW_UPDATE_PROGRAM_URL.url,
    name: VIEW_UPDATE_PROGRAM_URL.title,
    component: CreateProgramView,
    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: VIEW_CREATE_PROGRAM_URL.url,
    name: VIEW_CREATE_PROGRAM_URL.title,
    component: CreateProgramView,
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
    component: EditMemberView,

    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: ALL_VISITOR_URL.url,
    name: ALL_VISITOR_URL.title,
    component: AllVisitors,

    beforeEnter: (to, from, next) => {
      if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
      else {
        next();
      }
    },
  },
  {
    path: CREATE_ENTRY_VISITOR_URL.url,
    name: CREATE_ENTRY_VISITOR_URL.title,
    component: AddVisitor,

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
