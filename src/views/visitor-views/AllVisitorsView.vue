<template>
  <div class="row q-mx-md">
    <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12 q-my-md">
      <q-select
        outlined
        behavior="menu"
        v-model="filterBy"
        :options="filterOptions"
        label="Filter By"
      />
    </div>

    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <q-table
        title="Visitors"
        dense
        :pagination="initialPaginationModal"
        class="table-header-wrapper"
        :rows="getVisitorsRowsGetter"
        :filter="search"
        :columns="allVisitorColumns"
        row-key="visitorName"
      >
        <template v-slot:top-right>
          <q-input
            v-model="search"
            borderless
            dense
            debounce="300"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat class="edit-memberbtn" icon="ion-log-out" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {
  GET_VISITORS_REQUEST,
  GET_VISITORS_TABLE_ROWS_GETT,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { allVisitorColumns } from "@/constants";
export default defineComponent({
  name: "AllVisitorsView",

  components: {},

  setup() {
    const $store = useStore();
    let filterBy = ref(null);
    let search = ref(null);

    onBeforeMount(() => {
      $store.dispatch(GET_VISITORS_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          console.log({ status, res });
        },
      });
    });

    //getters
    const getVisitorsRowsGetter = computed(() => {
      return $store.getters[GET_VISITORS_TABLE_ROWS_GETT];
    });

    return {
      //states
      search,
      filterOptions: [
        { label: "Active Visitors", value: "activeVisitors" },
        { label: "All Visitors", value: "allVisitors" },
      ],
      getVisitorsRowsGetter,
      filterBy,
      allVisitorColumns,
      //handlers
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  margin: 0;
}
</style>
