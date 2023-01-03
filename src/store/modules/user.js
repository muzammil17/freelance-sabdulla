import {
  GET_USER_TOKEN,
  IS_AUTHENTICATED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "@/action/actionTypes";
import { loginRequest } from "@/action";

export const userModule = {
  state: () => ({
    user: null,
    authenticated: false,
  }),
  mutations: {
    [LOGIN_SUCCESS]: (state, payload) => {
      state.user = payload;
      state.authenticated = true;
    },
    [LOGOUT_SUCCESS]: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },

  getters: {
    [GET_USER_TOKEN]: (state) => {
      return state.user;
    },

    [IS_AUTHENTICATED]: (state) => {
      return state.authenticated;
    },
  },

  actions: { loginRequest },
};
