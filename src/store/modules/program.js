import {
  GET_ALL_PROGRAMS_GETT,
  GET_CART_ITEMS_GETT,
  GET_CART_ITEMS_TOTAL_PRICE_GETT,
  SET_ADD_CART_ITEM_MUT,
  SET_ALL_PROGRAMS_MUT,
  SET_CART_UPDATED_ITEMS_MUT,
  SET_EMPTY_CART_MUT,
} from "@/action/actionTypes";
// import {
// } from "@/constants";
import { getProgramsRequest, saveReceiptRequest } from "@/action";

export const programModule = {
  state: () => ({
    programs: [],
    cart: [],
    totalPrice: 0,
  }),
  mutations: {
    [SET_ALL_PROGRAMS_MUT]: (state, payload) => {
      state.programs = payload;
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
        let quantity = cartItems[ifItem]?.quantity + 1;
        let unitPrice = quantity * cartItems[ifItem]?.standardPrice;
        console.log("ifItem", quantity, cartItems[ifItem]?.quantity);
        cartItems.splice(ifItem, 1, {
          ...cartItems[ifItem],
          quantity,
          unitPrice,
        });
        console.log({ cartItems });
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
  },

  getters: {
    [GET_ALL_PROGRAMS_GETT]: (state) => {
      return state.programs;
    },
    [GET_CART_ITEMS_GETT]: (state) => {
      return state.cart;
    },
    [GET_CART_ITEMS_TOTAL_PRICE_GETT]: (state) => {
      return state.totalPrice;
    },
  },

  actions: { getProgramsRequest, saveReceiptRequest },
};
