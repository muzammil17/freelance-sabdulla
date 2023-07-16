<template>
  <div class="row q-mx-md">
    <!-- <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row justify-end">
        <div>
          <q-btn
            color="primary"
            label="Print Collection"
            @click="handleRoute(CREATE_ENTRY_VISITOR_URL.url)"
          />
        </div>
      </div>
    </div> -->

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
        :loading="tableLoader"
        title="Collection"
        dense
        :pagination="pagination"
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
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              icon="info"
              @click="handleRowClick(props)"
            />
            <q-btn dense round flat class="edit-memberbtn" icon="print" />
            <!-- @click="handleClickAction(props)" -->
          </q-td>
        </template>
      </q-table>
    </div>
  </div>

  <!-- visitor's detail dialog -->
  <q-dialog v-model="openDetailVisitor.bool">
    <q-card-section
      style="max-width: 1500px; width: 1000px; min-height: 200px"
      class="bg-white visitor-detail-card"
    >
      <div class="row justify-between q-col-gutter-lg">
        <div>
          <div class="text-h5">Visitor Detail</div>
        </div>
        <div>
          <q-btn
            dense
            round
            flat
            color="primary"
            icon="ion-close-circle"
            @click="handleCloseVisitorDetail"
          />
        </div>
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <q-table
            style="min-height: 200px"
            dense
            :pagination="pagination"
            class="table-header-wrapper"
            :rows="[
              getVisitorsRowsGetter?.find(
                (dt) => dt?.visitorLogId === openDetailVisitor.visitorId
              ),
            ]"
            :columns="visitorDetailColumns"
            row-key="visitorName"
          />
        </div>
      </div>
    </q-card-section>
  </q-dialog>
</template>

<script>
import {
  GET_VISITORS_REQUEST,
  GET_VISITORS_TABLE_ROWS_GETT,
  GET_VISITORS_GETT,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import {
  allVisitorColumns,
  visitorDetailColumns,
  pagination,
  CREATE_ENTRY_VISITOR_URL,
} from "@/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AllCollectionsView",

  components: {},

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const initialFilter = { label: "All Visitors", value: true };
    let filterBy = ref(initialFilter);
    let search = ref(null);
    let logoutVisitor = ref(null);

    const initialFormState = {
      identityReturned: false,
      rfCardReturned: false,
      rfNotRetReason: "",
    };

    let formState = ref(initialFormState);

    let openDetailVisitor = ref({ bool: false, visitorId: null });
    let openLogoutVisitor = ref({ bool: false, visitorId: null });

    onBeforeMount(() => {
      tableLoader.value = true;
      $store.dispatch(GET_VISITORS_REQUEST, {
        payload: { showAll: filterBy.value.value },
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
    });

    watch(filterBy, (filterNewVal) => {
      tableLoader.value = true;
      $store.dispatch(GET_VISITORS_REQUEST, {
        payload: { showAll: filterNewVal.value },
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
    });

    const handleRowClick = (prop) => {
      handleCloseVisitorDetail(prop?.row?.visitorLogId);
    };

    const handleCloseVisitorDetail = (id = null) => {
      openDetailVisitor.value = {
        bool: !openDetailVisitor.value.bool,
        visitorId: id,
      };
    };
    //getters
    const getVisitorsRowsGetter = computed(() => {
      return $store.getters[GET_VISITORS_TABLE_ROWS_GETT];
    });

    const getVisitorsGetter = computed(() => {
      return $store.getters[GET_VISITORS_GETT];
    });

    const handleRoute = (url) => {
      $router.push(url);
    };

    return {
      //states
      tableLoader,
      CREATE_ENTRY_VISITOR_URL,
      logoutVisitor,
      formState,
      getVisitorsGetter,
      openLogoutVisitor,
      pagination,
      openDetailVisitor,
      search,
      filterOptions: [
        { label: "Active Visitors", value: false },
        { label: "All Visitors", value: true },
      ],
      getVisitorsRowsGetter,
      filterBy,
      allVisitorColumns,
      visitorDetailColumns,
      $router,
      //handlers
      handleRoute,
      handleRowClick,
      handleCloseVisitorDetail,
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  margin: 0;
}
.visitor-detail-card {
  border-radius: 15px;
}
</style>
