<template>
  <div class="row justify-center q-col-gutter-md">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <div class="row member-select-wrapper-row items-start">
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <!-- style="display: flex; justify-content: flex-end; margin-bottom: 15px" -->
          <div class="row justify-between items-center q-col-gutter-md">
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
            <div
              class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12"
              style="
                display: flex;
                justify-content: flex-end;
                margin-bottom: 15px;
              "
            >
              <q-btn
                color="primary"
                label="Select Member"
                @click="openMemberListModal = true"
              />
            </div>
          </div>
        </div>

        <div
          class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12"
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
                  icon="info"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>

    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        title="Cart"
        :pagination="initialPagination"
        class="table-header-wrapper"
        :rows="cartData"
        :columns="cartColumns"
        row-key="progDetailDesc"
        v-model:selected="selected"
      >
        <!-- selection="multiple" -->
        <!-- <template v-slot:top>
          <span class="cart-table-header">
            <h6>Cart Items</h6>
            <q-btn
              color="primary"
              @click="deleteItems"
              label="Remove"
              class="delete-item"
            />
          </span>
        </template> -->
        <template v-slot:body-cell-select="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              color="primary"
              @click="deleteCartItems(props.row)"
              icon="ion-close-circle"
            />
          </q-td>
        </template>
        <template v-slot:bottom>
          <q-tr class="row justify-between totalpricerow">
            <q-td class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-6">
              <span class="total-label"> Total Price: </span>
            </q-td>
            <q-td class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-4">
              <span class="total-value">
                <span> Rs. {{ getCartItemsTotalPriceGetter }} </span>
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
  GET_CART_ITEMS_GETT,
  GET_CART_ITEMS_TOTAL_PRICE_GETT,
  GET_MEMBERS_REQUEST,
  SET_CART_UPDATED_ITEMS_MUT,
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
  GET_PAY_MODES_REQUEST,
  SAVE_RECEIPT_REQUEST,
  SET_EMPTY_CART_MUT,
  REGISTER_TO_PROGRAM_REQUEST,
  GET_PAYMODES_GETT,
} from "@/action/actionTypes";
import { defineComponent, onBeforeMount, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { cartColumns, memberColumns, memberModalColumns } from "@/constants";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CartView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const openMemberListModal = ref(false);
    const $router = useRouter();
    const saveReciptLoader = ref(false);

    let memberInput = ref("");
    let paymentInput = ref("");

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
      // rowsNumber: xx if getting data from a server
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

    onBeforeMount(() => {
      let clone = getCartItemsGetter.value.slice(0);

      if (!clone?.length) {
        $router.back();
      } else {
        $q.loading.show({
          delay: 400, // ms
        });
        $store.dispatch(GET_PAY_MODES_REQUEST, {
          payload: { activeOnly: true },
          responseCallback: () => {},
        });
        $store.dispatch(GET_MEMBERS_REQUEST, {
          payload: null,
          responseCallback: () => {
            $q.loading.hide();
          },
        });
      }
      cartData.value = clone;
    });

    const getCartItemsGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_GETT];
    });

    const getCartItemsTotalPriceGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_TOTAL_PRICE_GETT];
    });

    const handleCheckout = () => {
      if (!cartData.value?.length) {
        toastMessage("Your Cart is empty", false);
      } else if (!memberInput?.value?.memberId) {
        toastMessage("Select a member for the programs", false);
      } else if (!paymentInput.value) {
        toastMessage("Select a Payment method", false);
      }
      // else if (cartData.value?.length > 1) {
      //   toastMessage("Only single program can be selected at a time!", false);
      // }
      else {
        saveReciptLoader.value = true;

        const cartItemsList = [];
        const { memberId, lastName, firstName } = memberInput.value;
        for (const item of cartData.value) {
          const { standardPrice, progId } = item;
          cartItemsList.push({
            memberId: memberId,
            programId: progId,
            standardPrice,
          });
        }

        const { payModeId, payModeDesc } = paymentInput.value;
        const payload = {
          payModeId,
          payModeDesc,
          memberId,
          memberFullName: `${firstName} ${lastName}`,
          amount: Number(getCartItemsTotalPriceGetter.value),
        };
        console.log({ payload });
        $store.dispatch(REGISTER_TO_PROGRAM_REQUEST, {
          payload: cartItemsList,
          responseCallback: (status, res) => {
            if (status) {
              toastMessage(res.message, true);

              $store.dispatch(SAVE_RECEIPT_REQUEST, {
                payload,
                responseCallback: (status, res) => {
                  saveReciptLoader.value = false;
                  console.log(status, { res });
                  $store.commit(SET_EMPTY_CART_MUT, null);

                  if (status) {
                    console.log({ res });
                    toastMessage(res.message, true);
                    $router.push("/");
                  } else {
                    toastMessage("Something went wrong!", false);
                    $router.push("/");
                  }
                },
              });
            }
          },
        });
      }
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

    const handleChangeQuantity = (e, row, rowindex) => {
      let clone = cartData.value.slice(0);
      if (Number(e) <= 0) {
        clone.splice(rowindex, 1, {
          ...clone[rowindex],
          quantity: "1",
          unitPrice: clone[rowindex]?.standardPrice,
        });
        cartData.value = clone;
      } else {
        clone.splice(rowindex, 1, {
          ...clone[rowindex],
          unitPrice: Number(e) * clone[rowindex]?.standardPrice,
        });
        cartData.value = clone;
      }
      $store.commit(SET_CART_UPDATED_ITEMS_MUT, clone);
    };

    const deleteItems = () => {
      let clone = cartData.value.slice(0);

      let selectedCartItems = selected?.value?.map((dt) => dt?.progId);
      if (selectedCartItems?.length) {
        let filterDeletedItems = clone.filter(
          (dt) => !selectedCartItems.includes(dt?.progId)
        );
        console.log({ filterDeletedItems }, { selectedCartItems }, { clone });
        cartData.value = filterDeletedItems;
        $store.commit(SET_CART_UPDATED_ITEMS_MUT, filterDeletedItems);
      }
    };

    const deleteCartItems = (item) => {
      let clone = cartData.value.slice(0);

      let selectedCartItems = [item]?.map((dt) => dt?.progId);
      if (selectedCartItems?.length) {
        let filterDeletedItems = clone.filter(
          (dt) => !selectedCartItems.includes(dt?.progId)
        );
        console.log({ filterDeletedItems }, { selectedCartItems }, { clone });
        cartData.value = filterDeletedItems;
        $store.commit(SET_CART_UPDATED_ITEMS_MUT, filterDeletedItems);
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

    const getPayModesGetter = computed(() => {
      return $store.getters[GET_PAYMODES_GETT];
    });

    return {
      //states
      paymentInput,
      search,
      initialPaginationModal,
      membersRows,
      cartColumns,
      getCartItemsGetter,
      initialPagination,
      getCartItemsTotalPriceGetter,
      cartData,
      getOptionsMembersGetter,
      memberOptions,
      memberInput,
      memberColumns,
      selected,
      openMemberListModal,
      saveReciptLoader,
      memberModalColumns,
      getPayModesGetter,
      //handlers
      handleCheckout,
      toastMessage,
      filterFn,
      handleChangeQuantity,
      deleteItems,
      deleteCartItems,
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
