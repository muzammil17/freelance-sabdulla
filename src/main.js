import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { store } from "./store/store";

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .mount("#app");
