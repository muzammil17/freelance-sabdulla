import { getRfidCardsRequest } from "@/action";
import { GET_RFID_CARDS_GETT, SET_RFID_CARD_MUT } from "@/action/actionTypes";
export const rfidModule = {
  state: () => ({
    rfidCards: null,
  }),
  mutations: {
    [SET_RFID_CARD_MUT]: (state, action) => {
      state.rfidCards = action.payload;
    },
  },

  getters: {
    [GET_RFID_CARDS_GETT]: (state) => {
      return state.rfidCards;
    },
  },

  actions: { getRfidCardsRequest },
};
