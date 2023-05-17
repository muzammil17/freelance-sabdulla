import {
  GET_MEMBERS_DETAIL_GETT,
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
  GET_MEMBERS_LIST_GETT,
  GET_MEMBER_PAYMENTS_GETT,
  GET_MEMBER_PROGRAMS_GETT,
  GET_MEMBER_TYPES,
  GET_VISITORS_GETT,
  GET_VISITORS_TABLE_ROWS_GETT,
  SET_MEMBERS_DETAIL_MUT,
  SET_MEMBERS_LIST_MUT,
  SET_MEMBER_PAYMENTS_MUT,
  SET_MEMBER_PROGRAMS_MUT,
  SET_MEMBER_TYPES,
  SET_VISITORS_MUT,
  UPDATE_VISITORS_MUT,
} from "@/action/actionTypes";

import {
  getMemberTypesRequest,
  saveMemberRequest,
  getMembersRequest,
  getMemberDetailRequest,
  getMemberProgramsRequest,
  getMemberPaymentsRequest,
  getMemberTitleRequest,
  visitorLoginRequest,
  getVisitorsRequest,
  logoutVisitorRequest,
} from "@/action";
import moment from "moment";

export const memberModule = {
  state: () => ({
    memberTypes: null,
    members: null,
    memberDetail: null,
    memberProgs: null,
    memberPayments: null,
    visitors: [
      // {
      //   visitorLogId: 1,
      //   visitorName: "zEESHAN",
      //   contactNo: "0222-2222222",
      //   visitorCNIC: "33333-3333333-3",
      //   purposeOfVisit: "NONE",
      //   deptToVisit: "string",
      //   personToVisit: "string",
      //   rfCardNo: "strng",
      //   identityReceived: true,
      //   identityReturned: false,
      //   rfCardReturned: true,
      //   rfNotRetReason: "strin",
      // },
    ],
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

    [SET_VISITORS_MUT]: (state, payload) => {
      console.log({ payload });
      state.visitors = payload;
    },

    [UPDATE_VISITORS_MUT]: (state, payload) => {
      console.log({ payload });
      const clone = [...(state?.visitors ?? [])];
      let findVisitor = state?.visitors?.findIndex(
        (dt) => dt?.visitorLogId === payload?.visitorLogId
      );
      if (findVisitor >= 0) {
        clone.splice(findVisitor, 1, { ...payload });
        state.visitors = clone;
      }
    },
  },

  getters: {
    [GET_VISITORS_GETT]: (state) => {
      return state.visitors;
    },

    [GET_VISITORS_TABLE_ROWS_GETT]: (state) => {
      let rows = [];
      if (state?.visitors?.length) {
        for (const item of state?.visitors) {
          rows.push({
            ...item,
            identityReceived: item?.identityReceived ? "Yes" : "No",
            identityReturned: item?.identityReturned ? "Yes" : "No",
            rfCardReturned: item?.rfCardReturned ? "Yes" : "No",
            entryDateTime: item?.entryDateTime
              ? moment(item?.entryDateTime).format("lll")
              : "-",
            exitDateTime: item?.exitDateTime
              ? moment(item?.exitDateTime).format("lll")
              : "-",
            deptToVisit: item?.deptToVisit || "-",
          });
        }
      }
      return rows;
    },

    [GET_MEMBER_PAYMENTS_GETT]: (state) => {
      let memberPaymts = [];
      if (state?.memberPayments?.length) {
        for (const item of state?.memberPayments) {
          memberPaymts.push({
            ...item,
            cheBankName: item?.cheBankName || "-",
            chequeNo: item?.chequeNo || "-",
            receiptDate: item?.receiptDate
              ? moment(item?.receiptDate).format("ll")
              : "-",
            chequeDate: item?.chequeDate
              ? moment(item?.chequeDate).format("ll")
              : "-",
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
    logoutVisitorRequest,
    getVisitorsRequest,
    visitorLoginRequest,
    getMemberTitleRequest,
    getMemberTypesRequest,
    saveMemberRequest,
    getMembersRequest,
    getMemberDetailRequest,
    getMemberProgramsRequest,
    getMemberPaymentsRequest,
  },
};
