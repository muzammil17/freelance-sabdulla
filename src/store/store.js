import { createStore } from "vuex";

import { userModule } from "./modules/user";
import VuexPersistence from "vuex-persist";
import { menuModule } from "./modules/menu";
import { memberModule } from "./modules/member";

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
    menu: menuModule,
    member: memberModule,
  },

  plugins: [vuexLocal.plugin],
});
