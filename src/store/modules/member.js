import {
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
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
    [GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT]: (state) => {
      let cloneMembers = state?.members?.slice(0);
      let options = [];
      if (cloneMembers?.length) {
        for (const item of cloneMembers) {
          options.push({
            value: item.memberId,
            label: item?.firstName,
            fullName: `${item?.firstName} ${item?.lastName}`,
            ...item,
          });
        }
      }
      return options;
    },
  },

  actions: {
    getMemberTypesRequest,
    saveMemberRequest,
    getMembersRequest,
    getMemberDetailRequest,
  },
};
