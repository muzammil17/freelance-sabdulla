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
      </q-toolbar>
    </q-header>

    <DrawerView :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container class="page-wrapper">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { GET_USER_DETAIL_GETTER } from "./action/actionTypes";
import DrawerView from "./components/drawer/DrawerView.vue";

export default {
  name: "LayoutDefault",

  components: {
    DrawerView,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const $store = useStore();

    const toggleLeftDrawerOpen = () => {
      console.log("leftDrawerOpen", leftDrawerOpen.value);
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    // onBeforeMount(() => {
    //   console.log("onbeforemounted");
    //   $store.dispatch(GET_USER_ALLOWED_MENU_ACTION_REQUEST, {
    //     payload: getUserGetter.value,
    //     responseCallback: () => {},
    //   });
    // });
    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });

    return {
      leftDrawerOpen,
      getUserGetter,
      // functions
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
}
.page-wrapper {
  padding-top: 110px !important;
}
</style>
