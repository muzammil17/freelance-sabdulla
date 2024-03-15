<template>
  <div class="row justify-center q-col-gutter-md">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <div class="row member-select-wrapper-row items-start">
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row justify-start items-center q-col-gutter-md">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                margin-bottom: 15px;
              "
              class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12"
            >
              <q-btn
                color="primary"
                label="Select Member"
                @click="openMemberListModal = true"
              />
            </div>

            <div
              class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-md"
              v-if="memberInput?.memberId"
            >
              <q-table
                title="Member Detail"
                dense
                hide-pagination
                :pagination="initialPagination"
                class="table-header-wrapper"
                :rows="[memberInput]"
                :columns="memberColumns"
                row-key="name"
              >
                <template v-slot:body-cell-actions="props">
                  <!-- @click="memberInfo(props)" -->
                  <q-td :props="props">
                    <q-btn
                      dense
                      round
                      flat
                      class="edit-memberbtn"
                      icon="delete"
                      @click="handleRemoveMember"
                    ></q-btn>
                  </q-td>
                </template>
              </q-table>
            </div>

            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-input
                outlined
                label="Amount*"
                v-model="amount"
                hint="* Add Amount"
                lazy-rules
                type="number"
              />
            </div>

            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-input
                outlined
                label="Donor Name"
                v-model="donorName"
                hint="* Add Donor Full Name"
              >
              </q-input>
            </div>
            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-input
                outlined
                v-model="donorPhoneNumber"
                mask="####-#######"
                label="Donor Phone Number"
                hint="* ex: 0333-1234567"
                lazy-rules
                class="input-field"
              >
              </q-input>
            </div>

            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-input
                outlined
                v-model="donorCnicNumber"
                mask="#####-#######-#"
                label="Donor CNIC Number"
                hint="* ex: 42201-1234567-8"
                lazy-rules
                class="input-field"
              >
              </q-input>
            </div>

            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-select
                outlined
                label="Payment Method"
                v-model="paymentInput"
                behavior="menu"
                :options="getPayModesGetter"
                hint="* Select Payment Method"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
              <q-select
                outlined
                label="Collection type"
                v-model="collectionInput"
                behavior="menu"
                :options="getCollectionTypeGetter"
                hint="* Select Collection Type"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div
              class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12"
              v-if="paymentInput && !paymentInput.defaultRealized"
            >
              <q-select
                outlined
                label="Select Bank"
                v-model="selectBankInput"
                behavior="menu"
                :options="getBanksForReceiptsTypeGetter"
                hint="* Select Bank for Cheque"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div
              class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12"
              v-if="paymentInput && !paymentInput.defaultRealized"
            >
              <q-input
                outlined
                label="Cheque number"
                type="number"
                v-model="chequeInput"
                hint="* Cheque number"
              />
            </div>
            <div
              class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12"
              v-if="paymentInput && !paymentInput.defaultRealized"
            >
              <q-input
                outlined
                v-model="chequeDateInput"
                mask="date"
                label="Cheque Date"
                hint="ex: 2000/12/30"
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
                      <q-date v-model="chequeDateInput">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <span class="checkout-wrapper">
        <q-btn
          color="primary"
          label="Checkout"
          :loading="saveReciptLoader"
          @click="handleCheckout"
        />
      </span>
    </div>
  </div>

  <!--////////////////////////// ////////////////// Modal//////////////////////////////////// -->

  <q-dialog v-model="openMemberListModal" class="dialog-wrapper">
    <q-card-section
      style="max-width: 1500px; width: 1000px; min-height: 200px"
      class="bg-white q-pt-none member-list-modal-wrapper"
    >
      <div class="row justify-center q-col-gutter-lg">
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <span class="modal-header-wrapper">
            <div class="text-h5">Select Member</div>
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="ion-close-circle"
              @click="openMemberListModal = false"
            />
          </span>
        </div>

        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <q-table
            title="Members"
            dense
            :pagination="initialPaginationModal"
            class="table-header-wrapper"
            :rows="membersRows"
            :filter="search"
            :columns="memberModalColumns"
            row-key="fullName"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="search"
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
                  @click="
                    memberInput = props.row;
                    openMemberListModal = false;
                  "
                  icon="ion-add-circle"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-dialog>

  <!--////////////////////////// ////////////////// Modal//////////////////////////////////// -->
</template>

<script>
import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
  GET_PAY_MODES_REQUEST,
  SAVE_RECEIPT_REQUEST,
  GET_PAYMODES_GETT,
  GET_COLLECTION_TYPE_GETT,
  GET_BANKS_FOR_RECEIPT_REQUEST,
  GET_BANKS_FOR_RECEIPTS_GETT,
  GET_BILLING_CYCLES_REQUEST,
  GET_BILLING_CYCLES_GETT,
} from "@/action/actionTypes";
import { defineComponent, onBeforeMount, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  cartColumns,
  memberColumns,
  memberModalColumns,
  IS_PAYMENT_METHOD_CHEQUE,
} from "@/constants";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import moment from "moment";

export default defineComponent({
  name: "SaveDonation",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const openMemberListModal = ref(false);
    const $router = useRouter();
    const saveReciptLoader = ref(false);
    const donorName = ref("");
    const donorPhoneNumber = ref("");
    const donorCnicNumber = ref("");
    const amount = ref("");

    let memberInput = ref("");
    let paymentInput = ref("");
    let collectionInput = ref("");
    let chequeInput = ref("");
    let chequeDateInput = ref("");
    let selectBankInput = ref("");

    let selected = ref([]);

    let cartData = ref(null);
    let memberOptions = ref(null);

    const getOptionsMembersGetter = computed(() => {
      return $store.getters[GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT];
    });

    ////////////////modal state and handlers
    let search = ref("");

    const initialPaginationModal = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 5,
    };

    const membersRows = ref([]);

    watch(getOptionsMembersGetter, (currentVal) => {
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
          });
        }
        membersRows.value = rowsTemp;
      }
    });

    ////////////////modal state and handlers

    const initialPagination = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 100,
    };

    const handleRemoveMember = () => {
      memberInput.value = [];
    };

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      $store.dispatch(GET_PAY_MODES_REQUEST, {
        payload: { activeOnly: true },
        responseCallback: () => {},
      });
      $store.dispatch(GET_MEMBERS_REQUEST, {
        payload: null,
        responseCallback: () => {},
      });

      $store.dispatch(GET_BANKS_FOR_RECEIPT_REQUEST, {
        payload: { activeOnly: true },
        responseCallback: () => {},
      });
      $store.dispatch(GET_BILLING_CYCLES_REQUEST, {
        payload: { activeOnly: true },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    const getCollectionTypeGetter = computed(() => {
      return $store.getters[GET_COLLECTION_TYPE_GETT];
    });

    const getBillCyclesOpionGetter = computed(() => {
      return $store.getters[GET_BILLING_CYCLES_GETT];
    });

    const getBanksForReceiptsTypeGetter = computed(() => {
      return $store.getters[GET_BANKS_FOR_RECEIPTS_GETT];
    });

    const handleCheckout = () => {
      if (!memberInput?.value?.memberId) {
        if (!donorName?.value?.trim()) {
          toastMessage("Donor Name is required.", false);
          return;
        } else if (!donorPhoneNumber?.value?.trim()) {
          toastMessage("Donot Phone Number is required.", false);
          return;
        } else if (
          donorPhoneNumber?.value &&
          donorPhoneNumber?.value?.length != 11
        ) {
          toastMessage("Invalid Phone Number.", false);
          return;
        } else if (!donorCnicNumber?.value?.trim()) {
          toastMessage("Donor CNIC Number is required.");
          return;
        } else if (
          donorCnicNumber?.value &&
          donorCnicNumber?.value?.length != 13
        ) {
          toastMessage("Donor CNIC Number is required.");
          return;
        }
      }
      if (amount.value < 1) {
        toastMessage("Amount is required.", false);
        return;
      }
      if (!paymentInput.value) {
        toastMessage("Select a Payment method", false);
        return;
      } else if (!collectionInput.value) {
        toastMessage("Select a Collection type", false);
        return;
      } else if (
        !paymentInput.value.defaultRealized &&
        !selectBankInput.value
      ) {
        toastMessage("Select a bank for cheque", false);
        return;
      } else if (!paymentInput.value.defaultRealized && !chequeInput.value) {
        toastMessage("Cheque number is required", false);
        return;
      }

      saveReciptLoader.value = true;

      const { memberId = null } = memberInput.value;

      const { payModeId, payModeDesc } = paymentInput.value;
      const { value, label } = collectionInput.value;
      const payload = {
        payModeId,
        payModeDesc,
        refMemberId: memberId,
        donorName,
        phoneMobile: donorPhoneNumber,
        donationDate: moment().format(),
        colTypeId: value,
        colTypeDesc: label,
        ...(!paymentInput.value.defaultRealized
          ? {
              chqBankId: selectBankInput.value?.value,
              cheBankName: selectBankInput.value?.label,
              chequeNo: String(chequeInput?.value),
              chequeDate: moment(chequeDateInput.value).format(),
            }
          : {}),
      };

      $store.dispatch(SAVE_RECEIPT_REQUEST, {
        payload,
        responseCallback: (statusreceipt, responseReceipt) => {
          console.log({ responseReceipt });
          const receiptId = responseReceipt?.data;
          if (statusreceipt && receiptId) {
            console.log("helo");
          } else {
            toastMessage("Something went wrong!", false);
            $router.push("/");
          }
        },
      });
    };

    const filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          memberOptions.value = getOptionsMembersGetter.value;
        });
        return;
      }

      update(() => {
        const name = val.toLowerCase();
        memberOptions.value = memberOptions.value.filter((dt) =>
          val
            ? dt?.firstName.toLowerCase().includes(name) ||
              dt?.lastName.toLowerCase().includes(name)
            : dt
        );
      });
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

    const getPayModesGetter = computed(() => {
      return $store.getters[GET_PAYMODES_GETT];
    });

    return {
      //states
      amount,
      donorName,
      donorPhoneNumber,
      donorCnicNumber,
      moment,
      chequeDateInput,
      getBillCyclesOpionGetter,
      IS_PAYMENT_METHOD_CHEQUE,
      paymentInput,
      search,
      initialPaginationModal,
      membersRows,
      cartColumns,
      initialPagination,
      cartData,
      getOptionsMembersGetter,
      memberOptions,
      memberInput,
      memberColumns,
      selected,
      openMemberListModal,
      saveReciptLoader,
      memberModalColumns,
      getBanksForReceiptsTypeGetter,
      getPayModesGetter,
      getCollectionTypeGetter,
      collectionInput,
      selectBankInput,
      chequeInput,
      //handlers
      handleCheckout,
      toastMessage,
      filterFn,
      handleRemoveMember,
    };
  },
});
</script>
<style scoped lang="scss">
.quantity-input {
  // height: 20px;
  width: 100px;
}
.dialog-wrapper {
  .member-list-modal-wrapper {
    width: max-content;
    border-radius: 15px;
    padding: 15px;
    .modal-header-wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
}
.cart-table-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h6 {
    margin: 0px;
  }
  .delete-item {
  }
}
.checkout-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.member-select-wrapper-row {
  margin: 20px 0px;
}
.add-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
.totalpricerow {
  width: 100%;
  .total-label {
    font-weight: bold;
    font-size: 16px;
  }
  .total-value {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    text-align: right;
    font-weight: bold;
    color: #c36;
    font-size: 16px;
  }
}
.title {
  text-align: center;
}
</style>
