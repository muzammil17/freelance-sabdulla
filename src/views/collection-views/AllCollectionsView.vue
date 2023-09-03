<template>
  <div class="row q-mx-md q-col-gutter-sm">
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
      <q-input
        outlined
        v-model="filterBy.fromDate"
        mask="date"
        label="From Date"
        lazy-rules
        class="input-field"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="filterBy.fromDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12 q-my-md">
      <q-input
        outlined
        v-model="filterBy.toDate"
        mask="date"
        label="To Date"
        lazy-rules
        class="input-field"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="filterBy.toDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-sm">
      <div class="row justify-end">
        <div>
          <q-btn
            color="primary"
            label="Get Data"
            @click="getCustomDateCollection"
          />
        </div>
      </div>
    </div>

    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <q-table
        :loading="tableLoader"
        title="Collection"
        dense
        :pagination="pagination"
        class="table-header-wrapper"
        :rows="getCollectionsByDateRowsGetter"
        :filter="search"
        :columns="allCollectionsByDateColumns"
        row-key="memberName"
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
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              icon="print"
              :disable="!props?.row?.printUrl ? true : false"
              @click="handlePrint(props?.row)"
            />
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              icon="delete"
              @click="handleOpen(props?.row?.receiptId, true)"
            />

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
              getCollectionsByDateRowsGetter?.find(
                (dt) => dt?.receiptId === openDetailVisitor.receiptId
              ),
            ]"
            :columns="singleCollectionColumns"
            row-key="visitorName"
          />
        </div>
      </div>
    </q-card-section>
  </q-dialog>

  <ConfirmationModal
    :open="open"
    :handleClose="handleClose"
    :handleSubmit="handleSubmitCancel"
  />
</template>

<script>
import {
  GET_VISITORS_GETT,
  GET_RECEIPTS_BY_DATE_REQUEST,
  GET_COLLECTIONS_BY_DATE_GETT,
  CANCEL_RECEIPT_REQUEST,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import {
  allVisitorColumns,
  allCollectionsByDateColumns,
  visitorDetailColumns,
  pagination,
  toastMessage,
  CREATE_ENTRY_VISITOR_URL,
  singleCollectionColumns,
} from "@/constants";
import { useRouter } from "vue-router";
import moment from "moment";
import { ConfirmationModal } from "@/components";
export default defineComponent({
  name: "AllCollectionsView",

  components: { ConfirmationModal },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const open = ref({
      id: null,
      bool: false,
      loading: false,
      title: "Cancel Receipt",
      text: "Are you sure you want to cancel this receipt",
    });
    const initialFilter = {
      fromDate: moment().subtract(2, "months").format(),
      toDate: moment().format(),
    };
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
      $store.dispatch(GET_RECEIPTS_BY_DATE_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
    });

    // watch(filterBy, (filterNewVal) => {
    //   tableLoader.value = true;
    //   $store.dispatch(GET_VISITORS_REQUEST, {
    //     payload: { showAll: filterNewVal.value },
    //     responseCallback: (status, res) => {
    //       console.log({ status, res });
    //       tableLoader.value = false;
    //     },
    //   });
    // });

    const handleRowClick = (prop) => {
      handleCloseVisitorDetail(prop?.row?.receiptId);
    };

    const handleCloseVisitorDetail = (id = null) => {
      openDetailVisitor.value = {
        bool: !openDetailVisitor.value.bool,
        receiptId: id,
      };
    };

    const getCustomDateCollection = () => {
      if (moment(filterBy.value.fromDate).isAfter(filterBy.value.toDate)) {
        toastMessage("From Date must be less than to Date", false);
      } else {
        tableLoader.value = true;
        $store.dispatch(GET_RECEIPTS_BY_DATE_REQUEST, {
          payload: {
            fromDate: moment(filterBy.value.fromDate).toISOString(),
            toDate: moment(filterBy.value.toDate).toISOString(),
          },
          responseCallback: (status, res) => {
            console.log({ status, res });
            setTimeout(() => {
              tableLoader.value = false;
            }, 1000);
          },
        });
      }
    };

    //getters
    const getCollectionsByDateRowsGetter = computed(() => {
      return $store.getters[GET_COLLECTIONS_BY_DATE_GETT];
    });

    const getVisitorsGetter = computed(() => {
      return $store.getters[GET_VISITORS_GETT];
    });

    const handleRoute = (url) => {
      $router.push(url);
    };

    const handleClose = () => {
      open.value = { ...open.value, bool: !open.value.bool };
    };

    const handleOpen = (id = null, bool = false) => {
      open.value = { ...open.value, bool, id };
    };
    const handleSubmitCancel = () => {
      // CANCEL_RECEIPT_REQUEST
      open.value = { ...open.value, loading: true };
      $store.dispatch(CANCEL_RECEIPT_REQUEST, {
        payload: {
          receiptId: open.value.id,
        },
        responseCallback: (status, res) => {
          console.log({ status, res });
          if (status) {
            tableLoader.value = true;

            $store.dispatch(GET_RECEIPTS_BY_DATE_REQUEST, {
              payload: {
                fromDate: moment(filterBy.value.fromDate).toISOString(),
                toDate: moment(filterBy.value.toDate).toISOString(),
              },
              responseCallback: () => {
                tableLoader.value = false;
                toastMessage(res?.message, true);
                open.value = { ...open.value, loading: false, bool: false };
              },
            });
          } else {
            toastMessage(res?.message || "Something went wrong", false);

            open.value = { ...open.value, loading: false, bool: false };
          }
        },
      });
    };

    const handlePrint = (data) => {
      window.open(data?.printUrl);
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
      getCollectionsByDateRowsGetter,
      filterBy,
      allVisitorColumns,
      allCollectionsByDateColumns,
      visitorDetailColumns,
      $router,
      singleCollectionColumns,
      open,
      //handlers
      handlePrint,
      handleSubmitCancel,
      handleOpen,
      handleRoute,
      handleRowClick,
      handleClose,
      handleCloseVisitorDetail,
      getCustomDateCollection,
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
