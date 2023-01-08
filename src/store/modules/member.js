import {
  GET_MEMBERS_LIST_GETT,
  GET_MEMBER_TYPES,
  SET_MEMBERS_LIST_MUT,
  SET_MEMBER_TYPES,
} from "@/action/actionTypes";

import {
  getMemberTypesRequest,
  saveMemberRequest,
  getMembersRequest,
  getMemberDetailRequest,
} from "@/action";

export const memberModule = {
  state: () => ({
    memberTypes: null,
    members: null,
  }),
  mutations: {
    [SET_MEMBER_TYPES]: (state, payload) => {
      state.memberTypes = payload;
    },
    [SET_MEMBERS_LIST_MUT]: (state, payload) => {
      state.members = payload;
    },
  },

  getters: {
    [GET_MEMBER_TYPES]: (state) => {
      return state.memberTypes;
    },
    [GET_MEMBERS_LIST_GETT]: (state) => {
      return state.members;
    },
  },

  actions: {
    getMemberTypesRequest,
    saveMemberRequest,
    getMembersRequest,
    getMemberDetailRequest,
  },
};
