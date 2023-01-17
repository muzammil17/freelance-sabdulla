import {
  GET_ALL_PROGRAMS_GETT,
  SET_ALL_PROGRAMS_MUT,
} from "@/action/actionTypes";
// import {
// } from "@/constants";
import { getProgramsRequest } from "@/action";

export const programModule = {
  state: () => ({
    programs: [],
  }),
  mutations: {
    [SET_ALL_PROGRAMS_MUT]: (state, payload) => {
      state.programs = payload;
    },
  },

  getters: {
    [GET_ALL_PROGRAMS_GETT]: (state) => {
      return state.programs;
    },
  },

  actions: { getProgramsRequest },
};
