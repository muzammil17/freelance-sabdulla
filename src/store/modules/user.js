import { GET_USER_TOKEN, LOGIN_SUCCESS } from "@/action/actionTypes";

export const userModule = {
  state: () => ({
    user: null,
  }),
  mutations: {
    [LOGIN_SUCCESS]: (state, payload) => {
      state.user = payload;
    },
  },

  getters: {
    [GET_USER_TOKEN]: (state) => {
      return state.user;
    },
  },

  actions: {},
};
