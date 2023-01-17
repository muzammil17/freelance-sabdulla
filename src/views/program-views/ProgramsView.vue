<template>
  <div class="row justify-center">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <div class="row justify-center q-col-gutter-sm">
        <div
          class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12"
          v-for="(item, index) in allProgramsGetters"
          :key="index"
        >
          <q-card class="my-card all-prog-cards">
            <q-card-section class="card-header">
              <div class="text-h6">{{ item.progDesc }}</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>

            <q-card-section>
              {{ item.progDetailDesc }}
            </q-card-section>

            <q-separator dark />

            <q-card-actions class="view-btn-wrapper">
              <q-btn rounded class="view-btn" @click="handleRoute(item.progId)"
                >View</q-btn
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
} from "@/action/actionTypes";
import { useQuasar } from "quasar";
import { defineComponent, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { VIEW_PROGRAM_Detail_URL } from "@/constants";

export default defineComponent({
  name: "ProgramView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    onMounted(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log("onbeforemounted");

      $store.dispatch(GET_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: null },
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

    return {
      //states
      allProgramsGetters,
      //handlers
      handleRoute,
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
