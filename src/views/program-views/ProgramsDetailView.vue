<template>
  <div class="row justify-center">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-mb-sm">
      <q-btn
        flat
        round
        icon="ion-arrow-back"
        size="lg"
        color="primary"
        @click="$router.back()"
      />
    </div>

    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <div class="row justify-center q-col-gutter-sm">
        <div
          class="col-lg-4 col-xl-4 col-md-6 col-sm-11 col-xs-11"
          v-if="!allProgramsGetters?.length"
        >
          <h4 class="text-primary">No programs to show</h4>
        </div>
        <div
          class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12"
          v-for="(item, index) in allProgramsGetters"
          :key="index"
        >
          <q-card class="my-card all-prog-cards">
            <q-card-section class="card-header">
              <div class="text-h6">{{ item.progDesc }}</div>
              <div class="text-subtitle2 price-tag" v-if="item.isDetail">
                Rs.{{ item.standardPrice }}
              </div>
            </q-card-section>

            <q-card-section>
              {{ item.progDetailDesc }}
            </q-card-section>

            <q-separator dark />

            <q-card-actions class="view-btn-wrapper">
              <q-btn
                v-if="!item.isDetail"
                rounded
                class="view-btn"
                @click="handleRoute(item.progId)"
                >View</q-btn
              >
              <q-btn
                v-if="item.isDetail"
                rounded
                class="view-btn"
                @click="handleAddtoCart(item)"
                >Add to Cart</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_ALL_PROGRAMS_GETT,
  GET_PROGRAMS_REQUEST,
  SET_ADD_CART_ITEM_MUT,
} from "@/action/actionTypes";
import { VIEW_PROGRAM_Detail_URL } from "@/constants";
import { useQuasar } from "quasar";
import { defineComponent, computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProgramDetailView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    const progId = $router.currentRoute;
    // const state = $router.currentRoute.value;
    // console.log({ state });
    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log("onbeforemounted");

      $store.dispatch(GET_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: progId.value.params.id },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });
    watch(progId, (currentVal) => {
      $q.loading.show({
        delay: 400, // ms
      });
      $store.dispatch(GET_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: currentVal.params.id },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    const allProgramsGetters = computed(() => {
      return $store.getters[GET_ALL_PROGRAMS_GETT];
    });

    const handleRoute = (id) => {
      $router.push(VIEW_PROGRAM_Detail_URL.url.replace(":id", id));
    };

    const handleAddtoCart = (item) => {
      $store.commit(SET_ADD_CART_ITEM_MUT, item);
      toastMessage(
        `${item.progDetailDesc || item.progDesc} added to cart`,
        true
      );
      // $router.push(VIEW_CART_LIST_URL.url);
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
      //states
      $router,
      allProgramsGetters,
      //handlers
      handleRoute,
      handleAddtoCart,
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
}
.all-prog-cards {
  // background-color: #c36;
  // color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .price-tag {
    color: #c36;
  }
  .card-header {
    padding-bottom: 0px;
  }
  .view-btn-wrapper {
    display: flex;
    justify-content: center;
    .view-btn {
      background-color: #c36;
      color: #fff;
      width: 50%;
    }
  }
}
</style>
