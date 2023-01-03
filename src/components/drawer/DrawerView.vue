<template>
  <q-drawer :model-value="leftDrawerOpen" bordered class="bg-white-2">
    <q-list>
      <q-item-label header>Menu</q-item-label>
      <q-item
        clickable
        v-for="item in IsAuthenticated ? getPrivateMenu : getPublicMenu"
        :key="item"
        @click="handleRoute(item.url)"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item?.label }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="handleLogout" v-show="IsAuthenticated">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Log out</q-item-label>
          <!-- <q-item-label caption>quasar.dev</q-item-label> -->
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import {
  GET_PRIVATE_MENU,
  GET_PUBLIC_MENU,
  IS_AUTHENTICATED,
  LOGOUT_SUCCESS,
} from "@/action/actionTypes";
import { QDrawer, QList, QIcon, QItem, QItemSection, QItemLabel } from "quasar";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LOGIN_VIEW_URL } from "@/constants/index";

export default defineComponent({
  name: "DrawerView",
  props: ["leftDrawerOpen"],
  components: { QDrawer, QList, QIcon, QItem, QItemSection, QItemLabel },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const handleLogout = () => {
      console.log("logout");
      $store.commit(LOGOUT_SUCCESS);
      $router.replace(LOGIN_VIEW_URL);
    };

    const IsAuthenticated = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });

    const getPublicMenu = computed(() => {
      return $store.getters[GET_PUBLIC_MENU];
    });
    const getPrivateMenu = computed(() => {
      return $store.getters[GET_PRIVATE_MENU];
    });

    const handleRoute = (url) => {
      $router.push(url);
    };

    console.log("getPrivateMenu", getPrivateMenu);
    return {
      //GETTERS
      getPublicMenu,
      IsAuthenticated,
      getPrivateMenu,
      //handlers
      handleRoute,
      handleLogout,
    };
  },
});
</script>
