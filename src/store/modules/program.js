import {
  GET_ALL_PROGRAMS_GETT,
  GET_CART_ITEMS_GETT,
  SET_ADD_CART_ITEM_MUT,
  SET_ALL_PROGRAMS_MUT,
} from "@/action/actionTypes";
// import {
// } from "@/constants";
import { getProgramsRequest } from "@/action";

export const programModule = {
  state: () => ({
    programs: [],
    cart: [],
  }),
  mutations: {
    [SET_ALL_PROGRAMS_MUT]: (state, payload) => {
      state.programs = payload;
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
      state.cart = cartItems;
    },
  },

  getters: {
    [GET_ALL_PROGRAMS_GETT]: (state) => {
      return state.programs;
    },
    [GET_CART_ITEMS_GETT]: (state) => {
      return state.cart;
    },
  },

  actions: { getProgramsRequest },
};
