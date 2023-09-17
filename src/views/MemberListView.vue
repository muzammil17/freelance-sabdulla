<template>
  <div class="row justify-center q-col-gutter-xs">
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 search-wrapper"
    >
      <div class="row justify-center items-center q-col-gutter-md">
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-10 col-xs-10">
          <q-input v-model="search" label="Search members">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-lg-8 col-xl-8 col-md-6 col-sm-11 col-xs-11">
          <span class="add-member-btn-wrapper">
            <q-btn class="add-memberbtn" @click="handleRoute">
              Add a member
            </q-btn>
          </span>
        </div>
      </div>
    </div>
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        title="Members"
        dense
        :pagination="initialPagination"
        class="table-header-wrapper"
        :rows="
          membersRows.filter((dt) =>
            search
              ? dt?.fullName?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.gender?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.activeRFCard
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ? dt
                : dt?.phoneMobile
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ? dt
                : dt?.membershipTypeDesc
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ? dt
                : dt?.cnic?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.address1?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.membershipTypeDesc
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase()) && dt
              : dt
          )
        "
        :columns="memberColumns"
        row-key="name"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="editRow(props)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="memberInfo(props)"
              icon="info"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="handleOpenRFID(props.row)"
              icon="badge"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>

  <!-- Assign rfid card popup  -->

  <!-- visitor's detail dialog -->
  <q-dialog v-model="openDetailMember.bool">
    <q-card-section
      style="max-width: 800px; width: 700px; min-height: 200px"
      class="bg-white visitor-detail-card"
    >
      <q-form @submit="onSubmit">
        <div class="row justify-between q-col-gutter-lg">
          <div class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-10">
            <div class="text-h6">
              Assign RFID to
              {{
                `${openDetailMember.data?.title} ${openDetailMember.data?.fullName}`
              }}
            </div>
          </div>

          <div class="col-lg-2 col-xl-2 col-md-2 col-sm-2 col-xs-2">
            <div class="row justify-end">
              <div>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="ion-close-circle"
                  @click="handleCloseRFID"
                />
              </div>
            </div>
          </div>
          <div
            class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-10"
            v-if="openDetailMember.data?.activeRFCard"
          >
            <div class="text-subtitle1 text-primary">
              * Current Assigned RFID"
              {{ openDetailMember.data?.activeRFCard }}
            </div>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="openDetailMember.rfid"
              type="text"
              class="input-field"
              label="RFID Number *"
              :rules="[
                (val) => (val && val.length > 0) || 'RFID number is required',
                (val) =>
                  (val && openDetailMember.data?.activeRFCard !== val) ||
                  'This RFID number is already assigned',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="row justify-end">
              <div>
                <q-btn color="primary" label="Assign RFID" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-dialog>
  <ConfirmationModal
    :open="open"
    :handleSubmit="handleSubmitConfirmation"
    :handleClose="handleClose"
  />
</template>

<script>
import { computed, defineComponent, onBeforeMount, watch, ref } from "vue";
import { useStore } from "vuex";
import {
  GET_MEMBERS_LIST_GETT,
  GET_MEMBERS_REQUEST,
  IS_AUTHENTICATED,
  ASSIGN_RFID_CARD_REQUEST,
} from "@/action/actionTypes";
import { useRouter } from "vue-router";
import {
  MEMBER_VIEW_URL,
  EDIT_MEMBER_URL,
  VIEW_MEMBER_DETAIL_URL,
} from "@/constants";
import { useQuasar } from "quasar";
import { memberColumns } from "@/constants";

import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal.vue";
import { toastMessage } from "@/constants";
export default defineComponent({
  name: "MemberListView",

  components: { ConfirmationModal },

  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const rfids = ref([]);
    const open = ref({
      bool: false,
      loading: false,
      title: "Confirmation",
      text: "This member already has active RF Card assigned. Do want to re-assign new RF Card?",
    });
    const openDetailMember = ref({ bool: false, data: null, rfid: "" });

    const initialPagination = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    };
    const $router = useRouter();

    const search = ref(null);
    const membersList = ref([]);
    const membersRows = ref([]);

    const membersListGetter = computed(() => {
      return $store.getters[GET_MEMBERS_LIST_GETT];
    });

    const getMembers = () => {
      $q.loading.show({
        delay: 400, // ms
      });
      $store.dispatch(GET_MEMBERS_REQUEST, {
        payload: null,
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    };

    onBeforeMount(() => {
      getMembers();
    });

    watch(membersListGetter, (currentVal) => {
      let memberListData = JSON.parse(
        JSON.stringify(Object.values(currentVal))
      );
      console.log("currentVal", memberListData);
      if (memberListData.length) {
        let rowsTemp = [];
        for (const item of memberListData) {
          console.log({ item });
          rowsTemp.push({
            ...item,
            membershipTypeDesc: item?.membershipTypeDesc || "-",
            fullName: `${item?.firstName} ${item?.lastName}`,
            activeRFCardNumber: item?.activeRFCard || "-",
          });
        }
        membersRows.value = rowsTemp;
      }
      membersList.value = memberListData;
    });

    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });
    console.log("membersListGetter", membersListGetter.value);
    const handleRoute = () => {
      $router.push(MEMBER_VIEW_URL.url);
    };

    const editRow = (prop) => {
      $router.push(
        EDIT_MEMBER_URL.url?.replace(":memberId", prop.row?.memberId)
      );
      console.log("prop", prop.row);
    };

    const memberInfo = (prop) => {
      $router.push(
        VIEW_MEMBER_DETAIL_URL.url?.replace(":memberId", prop.row?.memberId)
      );
    };

    const handleCloseRFID = () => {
      openDetailMember.value = { bool: false, data: null };
    };

    const handleOpenRFID = (data) => {
      console.log({ data });
      openDetailMember.value = {
        bool: data?.activeRFCard ? false : true,
        data,
        rfid: data?.activeRFCard,
      };
      data?.activeRFCard ? handleClose() : null;
    };
    watch(openDetailMember, () => {
      console.log({ openDetailMember: openDetailMember.value });
    });

    const handleClose = () => {
      open.value = { ...open.value, bool: !open.value.bool };
    };

    const handleSubmitConfirmation = () => {
      handleClose();
      openDetailMember.value = {
        ...openDetailMember.value,
        bool: true,
      };
    };

    const onSubmit = () => {
      $store.dispatch(ASSIGN_RFID_CARD_REQUEST, {
        payload: {
          rfCardNo: openDetailMember.value.rfid,
          memberId: openDetailMember.value.data.memberId,
        },
        responseCallback: (status, res) => {
          if (res.data) {
            toastMessage(res.message, true);
            getMembers();
          } else {
            toastMessage(res.message, false);
          }
          console.log({ res });
          openDetailMember.value = {
            bool: false,
            data: null,
            rfid: null,
          };
          console.log({ res });
        },
      });
    };

    return {
      //states
      rfids,
      search,
      isLoggedIn,
      membersListGetter,
      membersList,
      membersRows,
      memberColumns,
      initialPagination,
      $q,
      openDetailMember,
      open,
      //handlers
      onSubmit,
      handleSubmitConfirmation,
      handleClose,
      handleOpenRFID,
      handleCloseRFID,
      handleRoute,
      memberInfo,
      editRow,
    };
  },
});
</script>
<style lang="scss">
.table-header-wrapper {
  border-radius: 10px;
  .edit-memberbtn {
    color: #c36;
  }
  .q-table {
    .col-address {
      max-width: 200px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .title {
    text-align: center;
    margin: 0px;
    margin-bottom: 20px;
  }
  .q-table__top {
    // background-color: #c36 !important;
    // color: #fff !important;
  }
}
.visitor-detail-card {
  border-radius: 15px;
}
.search-wrapper {
  margin-bottom: 20px;
}
.input-field {
  color: #c36;
  background-color: transparent !important;
}

.q-field__native .q-field--labeled {
  border-radius: 8px !important;
}
.add-member-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  .add-memberbtn {
    background-color: #c36;
    color: #fff;
  }
}
</style>
