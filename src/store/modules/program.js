import {
  GET_ALL_PROGRAMS_GETT,
  GET_BANKS_FOR_RECEIPTS_GETT,
  GET_BILLING_CYCLES_GETT,
  GET_CART_ITEMS_GETT,
  GET_CART_ITEMS_TOTAL_PRICE_GETT,
  GET_COLLECTIONS_BY_DATE_GETT,
  GET_COLLECTION_TYPE_GETT,
  GET_PAYMODES_GETT,
  GET_PROGRAMS_GETT,
  GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION,
  GET_PROGRAMS_TREE_GETT,
  SET_ADD_CART_ITEM_MUT,
  SET_ALL_PROGRAMS_MUT,
  SET_BILLING_CYCLES_MUT,
  SET_CART_BANKS_MUT,
  SET_CART_UPDATED_ITEMS_MUT,
  SET_COLLECTIONS_BY_DATE_MUT,
  SET_EMPTY_CART_MUT,
  SET_PAYMENT_MODES_MUT,
  SET_PROGRAMS_MUT,
  SET_PROGRAMS_TREE_MUT,
} from "@/action/actionTypes";

import {
  getProgramsRequest,
  saveReceiptRequest,
  registerProgramRequest,
  getPayModesRequest,
  getBanksRequest,
  saveProgramRequest,
  getBillCyclesRequest,
  getAllProgramsRequest,
  getReceiptsByDateRequest,
  cancelReceiptRequest,
} from "@/action";
import { list_to_tree } from "@/constants";
import moment from "moment";

export const programModule = {
  state: () => ({
    programs: [],
    allPrograms: [],
    allProgramsTree: [],

    cart: [],
    totalPrice: 0,
    paymentModes: [],
    collection_types: [
      { value: 1, label: "Fee" },
      { value: 2, label: "Donation" },
    ],
    billingCyclesOptions: [],
    banksForCart: [],
    receipts: [],
  }),
  mutations: {
    [SET_ALL_PROGRAMS_MUT]: (state, payload) => {
      console.log({ payload });
      state.programs = payload;
    },

    [SET_PROGRAMS_MUT]: (state, payload) => {
      console.log({ payload });
      let arr = [];
      if (payload?.length) {
        for (const item of payload) {
          arr.push({ ...item, label: item?.progDesc, value: item?.progId });
        }
      }
      state.allPrograms = arr;
    },
    [SET_PROGRAMS_TREE_MUT]: (state, payload) => {
      if (payload?.length) {
        let payloadRes = [];

        for (const item of payload) {
          payloadRes.push({
            ...item,
            // icon: "ion-information-circle-outline",
            label: item?.progDesc,
            value: item?.progId,
          });
        }

        const tree = list_to_tree(payloadRes);

        state.allProgramsTree = tree;
      } else {
        state.allProgramsTree = [];
      }
    },

    [SET_CART_UPDATED_ITEMS_MUT]: (state, payload) => {
      let totalPrice = 0;
      for (const item of payload) {
        totalPrice += item.unitPrice;
      }
      state.totalPrice = totalPrice;
      state.cart = payload;
    },

    [SET_ADD_CART_ITEM_MUT]: (state, payload) => {
      let cartItems = JSON.parse(JSON.stringify(state.cart));
      const ifItem = cartItems?.findIndex(
        (dt) => dt?.progId === payload?.progId
      );
      if (ifItem >= 0) {
        // let quantity = cartItems[ifItem]?.quantity + 1;
        // let unitPrice = quantity * cartItems[ifItem]?.standardPrice;
        // console.log("ifItem", quantity, cartItems[ifItem]?.quantity);
        // cartItems.splice(ifItem, 1, {
        //   ...cartItems[ifItem],
        //   quantity,
        //   unitPrice,
        // });
        // console.log({ cartItems });
      } else {
        console.log("ifItem", cartItems[ifItem]?.quantity);
        let quantity = 1;
        let unitPrice = quantity * payload?.standardPrice;
        let payloadData = {
          ...payload,
          quantity: 1,
          unitPrice,
        };
        cartItems.push(payloadData);
      }
      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.unitPrice;
      }
      state.totalPrice = totalPrice;
      state.cart = cartItems;
    },

    [SET_EMPTY_CART_MUT]: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },

    [SET_PAYMENT_MODES_MUT]: (state, payload) => {
      state.paymentModes = payload;
    },

    [SET_BILLING_CYCLES_MUT]: (state, payload) => {
      let bills = [];
      if (payload?.length) {
        for (const item of payload) {
          bills.push({
            ...item,
            value: item?.billCycleId,
            label: item?.billCycle,
          });
        }
      }
      state.billingCyclesOptions = bills;
    },

    [SET_CART_BANKS_MUT]: (state, payload) => {
      let clonePayload = [];
      if (payload?.length) {
        for (const item of payload) {
          clonePayload.push({
            ...item,
            value: item?.bankId,
            label: item?.bankName,
          });
        }
      }
      state.banksForCart = clonePayload;
    },
    [SET_COLLECTIONS_BY_DATE_MUT]: (state, payload) => {
      console.log({ payload });
      state.receipts = payload;
    },
  },

  getters: {
    [GET_COLLECTIONS_BY_DATE_GETT]: (state) => {
      let clone = [];

      if (state?.receipts?.length) {
        state?.receipts.forEach((item) => {
          clone.push({
            ...item,
            billStartDate: moment(item?.billStartDate).format("lll"),
            receiptDate: moment(item?.receiptDate).format("lll"),
            isCancelled: item?.isCancelled ? "Yes" : "No",
          });
        });
      }

      return clone;
    },
    [GET_BILLING_CYCLES_GETT]: (state) => {
      return state.billingCyclesOptions;
    },

    [GET_PROGRAMS_GETT]: (state) => {
      return state.allPrograms;
    },

    [GET_BANKS_FOR_RECEIPTS_GETT]: (state) => {
      return state.banksForCart;
    },

    [GET_ALL_PROGRAMS_GETT]: (state) => {
      return state.programs;
    },

    [GET_PROGRAMS_TREE_GETT]: (state) => {
      return state.allProgramsTree;
    },

    [GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION]: (state) => {
      let cloneProgs = state.programs?.slice(0);
      let options = [];
      if (cloneProgs.length) {
        for (const item of cloneProgs) {
          options.push({ ...item, value: item?.progId, label: item?.progDesc });
        }
        return options;
      }
    },

    [GET_CART_ITEMS_GETT]: (state) => {
      return state.cart;
    },

    [GET_CART_ITEMS_TOTAL_PRICE_GETT]: (state) => {
      return state.totalPrice;
    },

    [GET_COLLECTION_TYPE_GETT]: (state) => {
      return state.collection_types;
    },

    [GET_PAYMODES_GETT]: (state) => {
      let clonePaymodes = state.paymentModes.slice(0);
      let options = [];
      if (clonePaymodes?.length) {
        for (const item of clonePaymodes) {
          options.push({
            ...item,
            label: item?.payModeDesc,
            value: item?.payModeId,
          });
        }
      }
      return options;
    },
  },

  actions: {
    getAllProgramsRequest,
    getBillCyclesRequest,
    getProgramsRequest,
    saveReceiptRequest,
    registerProgramRequest,
    getPayModesRequest,
    getBanksRequest,
    saveProgramRequest,
    getReceiptsByDateRequest,
    cancelReceiptRequest,
  },
};
