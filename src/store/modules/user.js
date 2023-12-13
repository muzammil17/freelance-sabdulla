import {
  GET_JWT_TOKEN,
  GET_USER_DETAIL_GETTER,
  GET_USER_GROUPS_GETT,
  GET_USER_TOKEN,
  IS_AUTHENTICATED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_USER_GROUPS_MUT,
} from "@/action/actionTypes";
import {
  loginRequest,
  getUserGroupsRequest,
  getUserGroupByIdRequest,
  getAllAccessTypeRequest,
  saveUserGroupRequest,
} from "@/action";

export const userModule = {
  state: () => ({
    user: null,
    authenticated: false,
    userGroups: null,
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
    [LOGOUT_SUCCESS]: (state) => {
      state.user = null;
      state.authenticated = false;
    },
    [SET_USER_GROUPS_MUT]: (state, payload) => {
      state.userGroups = payload;
    },
  },

  getters: {
    [GET_USER_TOKEN]: (state) => {
      return state.user;
    },

    [IS_AUTHENTICATED]: (state) => {
      return state.authenticated;
    },
    [GET_USER_DETAIL_GETTER]: (state) => {
      return state.user;
    },
    [GET_JWT_TOKEN]: (state) => {
      return state.user?.token;
    },
    [GET_USER_GROUPS_GETT]: (state) => {
      let tempUserGrps = state?.userGroups?.map((item) => {
        return {
          ...item,
          userGroupStatus: item?.userGroupActive ? "Active" : "Inactive",
        };
      });
      console.log({ tempUserGrps: state?.userGroups });
      return tempUserGrps;
    },
  },

  actions: {
    saveUserGroupRequest,
    loginRequest,
    getUserGroupsRequest,
    getUserGroupByIdRequest,
    getAllAccessTypeRequest,
  },
};
