import { createStore } from "vuex";

import { userModule } from "./modules/user";
import VuexPersistence from "vuex-persist";
import { menuModule } from "./modules/menu";
import { memberModule } from "./modules/member";
import { areaModule } from "./modules/areas";
import { programModule } from "./modules/program";
import { rfidModule } from "./modules/rfid-card";

export const vuexLocal = new VuexPersistence({
  key: "RIBAT_ADMIN",
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
    area: areaModule,
    program: programModule,
    rfid: rfidModule,
  },

  plugins: [vuexLocal.plugin],
});
