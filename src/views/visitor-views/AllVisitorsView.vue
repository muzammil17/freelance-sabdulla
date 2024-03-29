<template>
  <div class="row q-mx-md">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row justify-end">
        <div>
          <q-btn
            color="primary"
            label="Add Visitor"
            @click="handleRoute(CREATE_ENTRY_VISITOR_URL.url)"
            v-if="allowed.addVisitor"
          />
        </div>
      </div>
    </div>

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
        title="Visitors"
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
              v-if="allowed.viewVisitor"
              @click="handleRowClick(props)"
            />
            <q-btn
              dense
              :disable="props?.row?.exitDateTime ? true : false"
              round
              flat
              class="edit-memberbtn"
              icon="logout"
              v-if="allowed.logoutVisitor"
              @click="handleClickAction(props)"
            />
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

  <!-- visitor's logout -->

  <q-dialog v-model="openLogoutVisitor.bool">
    <q-card-section
      style="max-width: 1500px; width: 1000px; min-height: 200px"
      class="bg-white visitor-detail-card"
    >
      <div class="row justify-between q-col-gutter-lg">
        <div>
          <div class="text-h5">Logout Visitor</div>
        </div>
        <div>
          <q-btn
            dense
            round
            flat
            color="primary"
            icon="ion-close-circle"
            @click="handleCloseVisitorLogout()"
          />
        </div>
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <q-form @submit="onSubmit">
            <div class="row justify-start q-col-gutter-md">
              <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                <q-field
                  ref="toggle"
                  :value="formState.identityReturned"
                  borderless
                  dense
                  :rules="[
                    (val) =>
                      !logoutVisitor?.identityReceived ||
                      (logoutVisitor?.identityReceived &&
                        formState.identityReturned) ||
                      'This field is must be checked',
                  ]"
                >
                  <template v-slot:control>
                    <q-checkbox
                      dense
                      v-model="formState.identityReturned"
                      label="Visitor's Identity Returned"
                      color="primary"
                    ></q-checkbox>
                  </template>
                </q-field>
              </div>
              <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                <q-field
                  ref="toggle"
                  :value="formState.rfCardReturned"
                  borderless
                  dense
                  :rules="[handleRulesRFIDCheckBox]"
                >
                  <template v-slot:control>
                    <q-checkbox
                      dense
                      v-model="formState.rfCardReturned"
                      label="RFID Returned?"
                      color="primary"
                    ></q-checkbox>
                  </template>
                </q-field>
              </div>
              <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formState.rfNotRetReason"
                  type="text"
                  class="input-field"
                  label="Reason for not returning RFID card"
                  lazy-rules
                  :rules="[handleRulesNotyetReason]"
                />
              </div>

              <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                <q-btn
                  dense
                  no-caps
                  color="primary"
                  label="Logout Visitor"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
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
  LOGOUT_VISITOR_REQUEST,
  UPDATE_VISITORS_MUT,
  GET_USER_ALLOWED_MENUS_GETT,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import {
  allVisitorColumns,
  visitorDetailColumns,
  pagination,
  CREATE_ENTRY_VISITOR_URL,
  ALL_ROUTES,
} from "@/constants";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AllVisitorsView",

  components: {},

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const $q = useQuasar();

    const currentRoute = $router.currentRoute.value;
    const initialFilter = { label: "All Visitors", value: true };
    let filterBy = ref(initialFilter);
    let search = ref(null);
    let logoutVisitor = ref(null);

    // allowed actions
    const allowed = ref({
      addVisitor: false,
      viewVisitor: false,
      logoutVisitor: false,
    });

    const initialFormState = {
      identityReturned: false,
      rfCardReturned: false,
      rfNotRetReason: "",
    };

    let formState = ref(initialFormState);

    let openDetailVisitor = ref({ bool: false, visitorId: null });
    let openLogoutVisitor = ref({ bool: false, visitorId: null });

    const getUserAllowedMenusGetter = computed(() => {
      return $store.getters[GET_USER_ALLOWED_MENUS_GETT];
    });

    onBeforeMount(() => {
      tableLoader.value = true;
      $store.dispatch(GET_VISITORS_REQUEST, {
        payload: { showAll: filterBy.value.value },
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });

      // handling allowed actions
      handleAllowedActions();
    });

    const handleAllowedActions = () => {
      const findRoute = ALL_ROUTES?.find(
        (dt) =>
          dt?.url !== "/" &&
          (dt?.view?.includes(currentRoute.matched[0].path) ||
            dt?.create?.includes(currentRoute?.matched[0].path) ||
            dt?.update?.includes(currentRoute?.matched[0].path) ||
            dt?.delete?.includes(currentRoute?.matched[0].path) ||
            dt?.print?.includes(currentRoute?.matched[0].path))
      );
      const menuFind = getUserAllowedMenusGetter.value?.find(
        (dt) =>
          dt?.menuUrl !== "/" &&
          (findRoute?.view?.includes(dt?.menuUrl) ||
            findRoute?.create?.includes(dt?.menuUrl) ||
            findRoute?.update?.includes(dt?.menuUrl) ||
            findRoute?.delete?.includes(dt?.menuUrl) ||
            findRoute?.print?.includes(dt?.menuUrl))
      );
      console.log({ menuFind });
      if (menuFind) {
        for (const item of menuFind?.accessMenu) {
          if (item?.accessTypeId === 1) {
            allowed.value.viewVisitor = true;
          } else if (item?.accessTypeId === 3) {
            allowed.value.addVisitor = true;
          } else if (item?.accessTypeId === 2) {
            allowed.value.logoutVisitor = true;
          }
          // else if (item?.accessTypeId === 4) {
          //   if (findRoute?.print?.includes(currentRoute?.matched[0].path)) {
          //   }
          // } else if (item?.accessTypeId === 5) {
          //   if (findRoute?.delete?.includes(currentRoute?.matched[0].path)) {
          //   }
          // }
        }
      }
    };

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

    const onSubmit = (val) => {
      let payload = {
        ...logoutVisitor.value,
        ...formState.value,
      };
      console.log({ val, logoutVisitor: logoutVisitor.value });

      $store.dispatch(LOGOUT_VISITOR_REQUEST, {
        payload: { data: { ...payload } },
        responseCallback: (status, res) => {
          if (status) {
            toastMessage(res?.message, true);
            $store.dispatch(UPDATE_VISITORS_MUT, { ...payload });
            filterBy.value = initialFilter;
            handleGetAllVisitor();
            handleCloseVisitorLogout();
          } else {
            toastMessage(res?.message || "Something went wrong!", false);
          }
        },
      });
    };

    const handleRowClick = (prop) => {
      handleCloseVisitorDetail(prop?.row?.visitorLogId);
    };

    const handleClickAction = (prop) => {
      // handleCloseVisitorDetail(row?.id);
      handleCloseVisitorLogout(prop?.row?.visitorLogId);
      // let allVisitors = JSON.parse(JSON.stringify(getVisitorsGetter.value));
      let findvisitor = getVisitorsGetter.value.find(
        (dt) => dt?.visitorLogId === prop?.row?.visitorLogId
      );
      // console.log({ findvisitor }, prop?.row?.visitorLogId);
      logoutVisitor.value = findvisitor;
    };
    const handleCloseVisitorLogout = (id = null) => {
      openLogoutVisitor.value = {
        bool: !openLogoutVisitor.value.bool,
        visitorId: id,
      };
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

    const handleRulesNotyetReason = (val) => {
      console.log({ val });
      if (!formState.value.rfCardReturned && !val?.length) {
        return "Give a reason for not submiting RFID";
      } else if (formState.value.rfCardReturned && val?.length) {
        return "Reason Not Needed if RFID is returned";
      } else {
        return true;
      }
    };

    const handleRulesRFIDCheckBox = (val) => {
      console.log({ val });
      if (formState.value.rfNotRetReason && formState.value.rfCardReturned) {
        return "Please uncheck this if RFID is not submitted";
      } else if (
        !formState.value.rfNotRetReason &&
        !formState.value.rfCardReturned
      ) {
        return "Give a reason below for not submitting RFID or check it";
      } else {
        return true;
      }
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
    function handleGetAllVisitor() {
      tableLoader.value = true;

      $store.dispatch(GET_VISITORS_REQUEST, {
        payload: { showAll: true },
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
    }

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
      getUserAllowedMenusGetter,
      allowed,
      //handlers
      handleRulesNotyetReason,
      handleRulesRFIDCheckBox,
      handleRoute,
      onSubmit,
      handleClickAction,
      handleCloseVisitorLogout,
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
