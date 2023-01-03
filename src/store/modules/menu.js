import { GET_PRIVATE_MENU, GET_PUBLIC_MENU } from "@/action/actionTypes";
import { DASHBOARD_VIEW_URL, LOGIN_VIEW_URL } from "@/constants";

export const menuModule = {
  state: () => ({
    publicMenu: [{ label: "Login", icon: "login", url: LOGIN_VIEW_URL }],
    privateMenu: [
      { label: "Register Form", icon: "dashboard", url: DASHBOARD_VIEW_URL },
    ],
  }),
  mutations: {},

  getters: {
    [GET_PRIVATE_MENU]: (state) => {
      return state.privateMenu;
    },
    [GET_PUBLIC_MENU]: (state) => {
      return state.publicMenu;
    },
  },

  actions: {},
};
