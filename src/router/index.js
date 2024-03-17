import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store/store";
import { computed } from "vue";
import { IS_AUTHENTICATED } from "@/action/actionTypes";
import {
  ALL_ROUTES,
  DefaultPrivate,
  LOGIN_VIEW_URL,
  PAGE_404_VIEW_URL,
  ROUTE_ROLES,
} from "@/constants";

const IsAuthenticated = computed(() => {
  return store.getters[IS_AUTHENTICATED];
});

let routes = ALL_ROUTES.map((dt) => {
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
          // let a = 1;
          // if (a == 1) {
          //   next();
          //   return;
          // }
          const menus = store.state.menu?.userAllowedMenu;
          console.log({ menus });
          const findRoute = ALL_ROUTES?.find(
            (dt) =>
              dt?.url !== "/" &&
              (dt?.view?.includes(to?.matched[0].path) ||
                dt?.create?.includes(to?.matched[0].path) ||
                dt?.update?.includes(to?.matched[0].path) ||
                dt?.delete?.includes(to?.matched[0].path) ||
                dt?.print?.includes(to?.matched[0].path))
          );

          const menuFind = menus?.find(
            (dt) =>
              dt?.menuUrl !== "/" &&
              (findRoute?.view?.includes(dt?.menuUrl) ||
                findRoute?.create?.includes(dt?.menuUrl) ||
                findRoute?.update?.includes(dt?.menuUrl) ||
                findRoute?.delete?.includes(dt?.menuUrl) ||
                findRoute?.print?.includes(dt?.menuUrl))
          );
          console.log({ menuFind });
          if (menuFind) {
            for (const item of menuFind?.accessMenu) {
              if (item?.accessTypeId === 1) {
                if (findRoute?.view?.includes(to?.matched[0].path)) {
                  next();
                }
              } else if (item?.accessTypeId === 3) {
                if (findRoute?.create?.includes(to?.matched[0].path)) {
                  next();
                }
              } else if (item?.accessTypeId === 2) {
                if (findRoute?.update?.includes(to?.matched[0].path)) {
                  next();
                }
              } else if (item?.accessTypeId === 4) {
                if (findRoute?.print?.includes(to?.matched[0].path)) {
                  next();
                }
              } else if (item?.accessTypeId === 5) {
                if (findRoute?.delete?.includes(to?.matched[0].path)) {
                  next();
                }
              }
            }
            if (DefaultPrivate.includes(to.path)) {
              next();
            } else {
              next(PAGE_404_VIEW_URL.url);
            }
          } else {
            if (DefaultPrivate.includes(to.path)) {
              next();
            } else {
              next(PAGE_404_VIEW_URL.url);
            }
          }
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
