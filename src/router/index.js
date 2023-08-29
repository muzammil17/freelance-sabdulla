import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store/store";
import { computed } from "vue";
import {
  GET_USER_ALLOWED_MENUS_GETT,
  IS_AUTHENTICATED,
} from "@/action/actionTypes";
import { ALL_ROUTES, LOGIN_VIEW_URL, ROUTE_ROLES } from "@/constants";

const IsAuthenticated = computed(() => {
  return store.getters[IS_AUTHENTICATED];
});
const getUserAllowedMenusGetter = computed(() => {
  return store.getters[GET_USER_ALLOWED_MENUS_GETT];
});

// let routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: DashboardEmpty,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: LOGIN_VIEW_URL.url,
//     name: LOGIN_VIEW_URL.title,
//     component: LoginView,
//     beforeEnter: (to, from, next) => {
//       if (IsAuthenticated.value) next("/");
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_PROGRAMS_URL.url,
//     name: VIEW_PROGRAMS_URL.title,
//     component: ProgramsView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_PROGRAM_Detail_URL.url,
//     name: VIEW_PROGRAM_Detail_URL.title,
//     component: ProgramDetailView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: DASHBOARD_VIEW_URL.url,
//     name: DASHBOARD_VIEW_URL.title,
//     component: HomeView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_CART_LIST_URL.url,
//     name: VIEW_CART_LIST_URL.title,
//     component: CartView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_ALL_PROGRAMS_DISPLAY_URL.url,
//     name: VIEW_ALL_PROGRAMS_DISPLAY_URL.title,
//     component: AllProgramView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_UPDATE_PROGRAM_URL.url,
//     name: VIEW_UPDATE_PROGRAM_URL.title,
//     component: CreateProgramView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },
//   {
//     path: VIEW_CREATE_PROGRAM_URL.url,
//     name: VIEW_CREATE_PROGRAM_URL.title,
//     component: CreateProgramView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_MEMBERS_LIST_URL.url,
//     name: VIEW_MEMBERS_LIST_URL.title,
//     component: MemberListView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: VIEW_MEMBER_DETAIL_URL.url,
//     name: VIEW_MEMBER_DETAIL_URL.title,
//     component: MemberDetailView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: MEMBER_VIEW_URL.url,
//     name: MEMBER_VIEW_URL.title,
//     component: MemberView,
//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: EDIT_MEMBER_URL.url,
//     name: EDIT_MEMBER_URL.title,
//     component: EditMemberView,

//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },
//   {
//     path: ALL_VISITOR_URL.url,
//     name: ALL_VISITOR_URL.title,
//     component: AllVisitors,

//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },
//   {
//     path: CREATE_ENTRY_VISITOR_URL.url,
//     name: CREATE_ENTRY_VISITOR_URL.title,
//     component: AddVisitor,

//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },

//   {
//     path: ALL_COLLECTION_URL.url,
//     name: ALL_COLLECTION_URL.title,
//     component: AllCollection,

//     beforeEnter: (to, from, next) => {
//       if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
//       else {
//         next();
//       }
//     },
//   },
// ];

let routes = ALL_ROUTES.map((dt) => {
  console.log({
    IsAuthenticated: IsAuthenticated.value,
    getUserAllowedMenusGetter: getUserAllowedMenusGetter.value,
  });
  if (dt?.auth === ROUTE_ROLES.AUTH) {
    return {
      path: dt?.url,
      name: dt?.title,
      component: dt?.component,
      beforeEnter: (to, from, next) => {
        if (IsAuthenticated.value) next("/");
        else {
          next();
        }
      },
    };
  } else if (dt?.auth === ROUTE_ROLES.PRIVATE) {
    return {
      path: dt?.url,
      name: dt?.title,
      component: dt?.component,
      beforeEnter: (to, from, next) => {
        if (!IsAuthenticated.value) next(LOGIN_VIEW_URL.url);
        else {
          next();
        }
      },
    };
  } else {
    return {
      path: dt?.url,
      name: dt?.title,
      component: dt?.component,
      ...(dt?.meta
        ? {
            meta: {
              requiresAuth: false,
            },
          }
        : {}),
      beforeEnter: (to, from, next) => {
        if (IsAuthenticated.value) next("/");
        else {
          next();
        }
      },
    };
  }
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
