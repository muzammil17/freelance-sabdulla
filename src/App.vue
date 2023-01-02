<template>
  <q-layout view="hHh Lpr lF">
    <q-header class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawerOpen"
            aria-label="Menu"
            icon="menu"
          />

          {{ leftDrawerOpen }}
          <!-- <span class="icon-wrapper">
            <span>
              <img
                width="80"
                src="https://www.ribat.com.pk/wp-content/uploads/2022/01/Ribat-Logo.png"
              />
            </span>
          </span> -->

          <!-- Quasar App  -->
        </q-toolbar-title>

        <span class="icon-wrapper">
          <span>
            <img
              width="80"
              src="https://www.ribat.com.pk/wp-content/uploads/2022/01/Ribat-Logo.png"
            />
          </span>
        </span>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <DrawerView :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import DrawerView from "./components/drawer/DrawerView.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    HelloWorld,
    DrawerView,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    console.log({ leftDrawerOpen });

    const toggleLeftDrawerOpen = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,

      // functions
      toggleLeftDrawerOpen,
    };
  },
};
</script>

<style scoped lang="scss">
.icon-wrapper {
  // // display: flex;
  // height: 100%;
  // // z-index: 99999;
  // position: relative;
  // span {
  //   position: absolute;
  // }
  span {
    // display: flex;
    margin-left: 50px;
    img {
      background-color: #fff !important;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
.toolbar-custom-wrapper {
  box-shadow: 0px;
}
</style>
