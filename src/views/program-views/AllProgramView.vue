<template>
  <div class="row q-col-gutter-lg">
    <div
      class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11 q-py-md"
      style="display: flex; justify-content: flex-end"
    >
      <q-btn
        :disable="selected ? false : true"
        size="sm"
        color="primary"
        :label="`Update ${
          getAllProgramsGetter?.find((dt) => dt?.progId == selected)
            ?.progDesc || ''
        } Program`"
        @click="handleRoute(selected)"
      />
    </div>

    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <h5 class="title">Program Tree</h5>

      <q-tree
        :default-expand-all="true"
        :nodes="getProgramTreeGetter"
        node-key="value"
        accordion
        v-model:selected="selected"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import {
  GET_ALL_PROGRAMS_REQUEST,
  GET_PROGRAMS_TREE_GETT,
  GET_PROGRAMS_GETT,
} from "@/action/actionTypes";
import { useRouter } from "vue-router";
import { VIEW_UPDATE_PROGRAM_URL } from "@/constants";

export default defineComponent({
  name: "AllProgramView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    // const selectedProg = ref(null);

    const selected = ref(null);

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log("onbeforemounted");

      $store.dispatch(GET_ALL_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: null },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    const getProgramTreeGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_TREE_GETT];
    });

    const getAllProgramsGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_GETT];
    });

    // GET_PROGRAMS_TREE_GETT

    const selectedProg = (node, filter) => {
      const filt = filter.toLowerCase();
      return node.label && node.label.toLowerCase().indexOf(filt) > -1;
    };
    const filterMethod = (val) => {
      console.log({ val });
    };

    const handleRoute = (id) => {
      $router.push(VIEW_UPDATE_PROGRAM_URL.url.replace(":progId", id));
    };

    return {
      //states
      handleRoute,
      getAllProgramsGetter,
      selectedProg,
      filterMethod,
      getProgramTreeGetter,
      selected,

      expanded: ref([]),
      simple: [
        {
          label: "Satisfied customers (with avatar)",
          //   avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [
            {
              label: "Good food (with icon)",
              icon: "restaurant_menu",
              children: [
                { label: "Quality ingredients" },
                { label: "Good recipe" },
              ],
            },
            {
              label: "Good service (disabled node with icon)",
              icon: "room_service",
              children: [
                { label: "Prompt attention" },
                { label: "Professional waiter" },
              ],
            },
            {
              label: "Pleasant surroundings (with icon)",
              icon: "photo",
              children: [
                {
                  label: "Happy atmosphere (with image)",
                  img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
                },
                { label: "Good table presentation" },
                { label: "Pleasing decor" },
              ],
            },
          ],
        },
      ],

      //handlers
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  margin: 0px;
  text-align: center;
}
</style>
