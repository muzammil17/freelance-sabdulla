import { GET_MEMBER_TYPES, SET_MEMBER_TYPES } from "@/action/actionTypes";

import { getMemberTypesRequest, saveMemberRequest } from "@/action";

export const memberModule = {
  state: () => ({
    memberTypes: null,
  }),
  mutations: {
    [SET_MEMBER_TYPES]: (state, payload) => {
      state.memberTypes = payload;
    },
  },

  getters: {
    [GET_MEMBER_TYPES]: (state) => {
      return state.memberTypes;
    },
  },

  actions: { getMemberTypesRequest, saveMemberRequest },
};
