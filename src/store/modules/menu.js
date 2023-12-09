import {
  GET_PRIVATE_MENU,
  GET_PUBLIC_MENU,
  GET_USER_ALLOWED_MENUS_GETT,
  SET_USER_PRIVATE_MENU,
} from "@/action/actionTypes";
import {
  LOGIN_VIEW_URL,
  MEMBER_VIEW_URL,
  VIEW_MEMBERS_LIST_URL,
} from "@/constants";
import { getUserAllowedMenusRequest, getAllMenusRequest } from "@/action";

export const menuModule = {
  state: () => ({
    publicMenu: [{ label: "Login", icon: "login", url: LOGIN_VIEW_URL.url }],
    privateMenu: [
      { label: "Members", icon: "menu", url: VIEW_MEMBERS_LIST_URL.url },

      { label: "Membership form", icon: "dashboard", url: MEMBER_VIEW_URL.url },
    ],

    userAllowedMenu: null,
  }),
  mutations: {
    [SET_USER_PRIVATE_MENU]: (state, payload) => {
      state.userAllowedMenu = payload;
    },
  },

  getters: {
    [GET_PRIVATE_MENU]: (state) => {
      return state.privateMenu;
    },
    [GET_PUBLIC_MENU]: (state) => {
      return state.publicMenu;
    },
    [GET_USER_ALLOWED_MENUS_GETT]: (state) => {
      return state.userAllowedMenu;
    },
  },

  actions: { getUserAllowedMenusRequest, getAllMenusRequest },
};
