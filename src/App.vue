<template>
  <q-layout view="lHh Lpr lF">
    <q-header class="header-wrapper">
      <q-toolbar>
        <q-toolbar-title>
          <span class="icon-wrapper">
            <span>
              <img
                width="60"
                src="https://www.ribat.com.pk/wp-content/uploads/2022/01/Ribat-Logo.png"
              />
            </span>
          </span>
          <span class="page-title"> {{ pageName }} </span>

          <!-- Quasar App  -->
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          class="toggle-btn"
          @click="toggleLeftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <span class="carticonwrapper" v-if="IsAuthenticated">
          <q-btn
            flat
            class="cart-icon"
            dense
            round
            aria-label="Menu"
            @click="handleRoute(VIEW_CART_LIST_URL.url)"
          >
            <q-icon class="icon-basket" name="ion-basket" />
          </q-btn>
          <span class="count" v-if="getCartItemsGetter.length">{{
            getCartItemsGetter.length
          }}</span>
        </span>
      </q-toolbar>
    </q-header>
    <!-- <DrawerView :leftDrawerOpen="leftDrawerOpen" /> -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="1008"
      width="250"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header>Menu</q-item-label>
          <q-item
            class="lt-md"
            clickable
            @click="handleRoute(VIEW_CART_LIST_URL.url)"
            v-show="IsAuthenticated"
          >
            <q-item-section avatar>
              <q-icon name="ion-basket" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cart</q-item-label>
              <!-- <q-item-label caption>quasar.dev</q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item
            clickable
            @click="handleRoute(LOGIN_VIEW_URL.url)"
            v-show="!IsAuthenticated"
          >
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- ************************** -->
        <q-list class="rounded-borders" v-if="IsAuthenticated">
          <q-expansion-item
            :content-inset-level="1"
            expand-separator
            icon="dashboard"
            v-for="(item, index) in IsAuthenticated
              ? getUserAllowedMenusGetter?.filter((dt) => !dt?.parentMenuId)
              : getPublicMenu"
            :key="index"
            :label="item?.menuName"
          >
            <q-item
              clickable
              v-ripple
              v-for="items in IsAuthenticated
                ? getUserAllowedMenusGetter?.filter(
                    (dt) =>
                      dt?.parentMenuId && item?.menuId === dt?.parentMenuId
                  )
                : getPublicMenu"
              :key="items"
              @click="handleRoute(items.menuUrl)"
            >
              <q-item-section>{{ items?.menuName }}</q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>

        <!-- ************************** -->
        <q-item
          clickable
          @click="handleRoute('/profile')"
          v-show="IsAuthenticated"
        >
          <q-item-section avatar>
            <q-icon name="fa fa-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
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
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="page-wrapper">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useMeta, useQuasar } from "quasar";
import { ref, computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  GET_CART_ITEMS_GETT,
  GET_PRIVATE_MENU,
  GET_PUBLIC_MENU,
  GET_USER_ALLOWED_MENUS_GETT,
  GET_USER_ALLOWED_MENU_ACTION_REQUEST,
  GET_USER_DETAIL_GETTER,
  IS_AUTHENTICATED,
  LOGOUT_SUCCESS,
} from "./action/actionTypes";
import { LOGIN_VIEW_URL, VIEW_CART_LIST_URL } from "./constants";
import { Cart } from "@/assets";
// import DrawerView from "./components/drawer/DrawerView.vue";

export default {
  name: "LayoutDefault",

  components: {
    // DrawerView,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();
    let pageName = ref(null);

    const toggleLeftDrawerOpen = () => {
      console.log("leftDrawerOpen", leftDrawerOpen.value);
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    onBeforeMount(() => {
      console.log("onbeforemounted");
      if (isLoggedIn.value) {
        $store.dispatch(GET_USER_ALLOWED_MENU_ACTION_REQUEST, {
          payload: getUserGetter.value,
          responseCallback: (res) => {
            console.log({ res });
          },
        });
      }
    });
    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });

    watch($router.currentRoute, (currentRoute) => {
      const pageMetadata = {
        title: `Ribat ${currentRoute.name ? currentRoute.name : ""}`,
      };
      pageName.value = currentRoute.name;
      useMeta(pageMetadata);
    });

    watch(isLoggedIn, () => {
      if (isLoggedIn.value) {
        $store.dispatch(GET_USER_ALLOWED_MENU_ACTION_REQUEST, {
          payload: getUserGetter.value,
          responseCallback: (res) => {
            console.log({ res });
          },
        });
      }
    });
    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });
    const getCartItemsGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_GETT];
    });
    ///drawer components

    const handleLogout = () => {
      console.log("logout");
      toastMessage("Logout Successfully", true);
      $store.commit(LOGOUT_SUCCESS);
      $router.replace(LOGIN_VIEW_URL.url);
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

    const getUserAllowedMenusGetter = computed(() => {
      return $store.getters[GET_USER_ALLOWED_MENUS_GETT];
    });

    const handleRoute = (url) => {
      $router.push(url);
    };
    const toastMessage = (message, bool) => {
      $q.notify({
        color: bool ? "positive" : "negative",
        textColor: "#fff",
        message,
        icon: "announcement",

        position: "top",
        timeout: 2000,
      });
    };

    return {
      leftDrawerOpen,
      getUserGetter,
      isLoggedIn,
      getPrivateMenu,
      getPublicMenu,
      IsAuthenticated,
      getUserAllowedMenusGetter,
      pageName,
      Cart,
      VIEW_CART_LIST_URL,
      getCartItemsGetter,
      LOGIN_VIEW_URL,
      // functions
      handleLogout,
      toastMessage,
      handleRoute,
      toggleLeftDrawerOpen,
    };
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  // border-bottom: 1px solid #c36;
  color: #c36;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  .icon-wrapper {
    span {
      img {
        background-color: #fff !important;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        position: absolute;
        top: 10px;
        @media only screen and (max-width: 724px) {
          width: 40px;
        }
      }
    }
  }
  .toolbar-custom-wrapper {
    box-shadow: 0px;
  }
  .toggle-btn {
    @media only screen and (min-width: 1008px) {
      display: none !important;
    }
  }
  .carticonwrapper {
    display: flex !important;
    align-items: flex-start !important;
    position: relative;
    @media only screen and (max-width: 1008px) {
      display: none !important;
    }
    .cart-icon {
      // margin-right: 200px;

      .icon-basket {
        color: #000;
      }
    }
    .count {
      position: absolute;
      right: -4px;
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      background-color: #c36;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
    }
  }
}

.page-wrapper {
  padding-top: 120px !important;
}
.page-title {
  margin-left: 100px;
  color: #000;
}
</style>
