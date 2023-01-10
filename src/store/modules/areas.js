import { getCitiesRequest, getAreasRequest } from "@/action";
import {
  GET_AREAS_GETT,
  GET_CITIES_GETT,
  SET_AREAS_MUT,
  SET_CITIES_MUT,
} from "@/action/actionTypes";
export const areaModule = {
  state: () => ({
    areas: null,
    city: null,
  }),
  mutations: {
    [SET_CITIES_MUT]: (state, action) => {
      state.city = action.payload;
    },
    [SET_AREAS_MUT]: (state, action) => {
      state.areas = action.payload;
    },
  },

  getters: {
    [GET_CITIES_GETT]: (state) => {
      return state.city;
    },
    [GET_AREAS_GETT]: (state) => {
      return state.areas;
    },
  },

  actions: { getCitiesRequest, getAreasRequest },
};
