import {
  GET_MEMBERS_DETAIL_GETT,
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
  GET_MEMBERS_LIST_GETT,
  GET_MEMBER_PAYMENTS_GETT,
  GET_MEMBER_PROGRAMS_GETT,
  GET_MEMBER_TYPES,
  SET_MEMBERS_DETAIL_MUT,
  SET_MEMBERS_LIST_MUT,
  SET_MEMBER_PAYMENTS_MUT,
  SET_MEMBER_PROGRAMS_MUT,
  SET_MEMBER_TYPES,
} from "@/action/actionTypes";

import {
  getMemberTypesRequest,
  saveMemberRequest,
  getMembersRequest,
  getMemberDetailRequest,
  getMemberProgramsRequest,
  getMemberPaymentsRequest,
} from "@/action";
import moment from "moment";

export const memberModule = {
  state: () => ({
    memberTypes: null,
    members: null,
    memberDetail: null,
    memberProgs: null,
    memberPayments: null,
  }),
  mutations: {
    [SET_MEMBER_TYPES]: (state, payload) => {
      state.memberTypes = payload;
    },

    [SET_MEMBERS_LIST_MUT]: (state, payload) => {
      state.members = payload;
    },

    [SET_MEMBERS_DETAIL_MUT]: (state, payload) => {
      state.memberDetail = payload;
    },

    [SET_MEMBER_PROGRAMS_MUT]: (state, payload) => {
      state.memberProgs = payload;
    },

    [SET_MEMBER_PAYMENTS_MUT]: (state, payload) => {
      state.memberPayments = payload;
    },
  },

  getters: {
    [GET_MEMBER_PAYMENTS_GETT]: (state) => {
      let memberPaymts = [];
      if (state?.memberPayments?.length) {
        for (const item of state?.memberPayments) {
          memberPaymts.push({
            ...item,
            receiptDate: moment(item?.receiptDate).format("ll"),
            chequeDate: moment(item?.chequeDate).format("ll"),
            isCancelled: item?.isCancelled ? "Yes" : "No",
          });
        }
      }
      return memberPaymts;
    },

    [GET_MEMBER_PROGRAMS_GETT]: (state) => {
      let memberRows = [];
      for (const item of state?.memberProgs) {
        memberRows.push({
          ...item,
          billingStart: item?.billStart
            ? moment(item?.billStart).format("ll")
            : "-",
          billingEnd: item?.billEnd ? moment(item?.billEnd).format("ll") : "-",
        });
      }

      return memberRows;
    },

    [GET_MEMBERS_DETAIL_GETT]: (state) => {
      return state.memberDetail;
    },

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
    getMemberProgramsRequest,
    getMemberPaymentsRequest,
  },
};
