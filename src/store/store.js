import { createStore } from "vuex";

import { userModule } from "./modules/user";
import VuexPersistence from "vuex-persist";

export const vuexLocal = new VuexPersistence({
  key: "STORAGE_KEY",
  storage: window.localStorage,
  reducer: (state) => ({
    user: state.user,
  }),
});

export const store = createStore({
  modules: {
    user: userModule,
  },

  plugins: [vuexLocal.plugin],
});
