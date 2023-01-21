<template>
  <div class="row justify-center q-col-gutter-xs">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <div class="row q-col-gutter-sm member-select-wrapper-row items-start">
        <div class="col-lg-8 col-xl-8 col-md-8 col-sm-8 col-xs-12">
          <q-select
            outlined
            label="Select Member"
            v-model="memberInput"
            use-input
            behavior="menu"
            input-debounce="0"
            :options="memberOptions"
            @filter="filterFn"
            hint="* Select Member"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-12">
          <span class="add-btn-wrapper">
            <q-btn label="Add member" color="primary" />
          </span>
        </div>
      </div>
    </div>

    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        :hide-pagination="true"
        title="Cart"
        dense
        :pagination="initialPagination"
        class="table-header-wrapper"
        :rows="cartData"
        :columns="cartColumns"
        row-key="name"
      >
        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-input
              type="number"
              v-model="props.row.quantity"
              dense
              @update:model-value="
                (e) => handleChangeQuantity(e, props.row, props.rowIndex)
              "
              outlined
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
                Rs. {{ getCartItemsTotalPriceGetter }}
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {
  GET_CART_ITEMS_GETT,
  GET_CART_ITEMS_TOTAL_PRICE_GETT,
  GET_MEMBERS_REQUEST,
  SET_CART_UPDATED_ITEMS_MUT,
  GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT,
} from "@/action/actionTypes";
import { defineComponent, onBeforeMount, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import { cartColumns } from "@/constants";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CartView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    let memberInput = ref("");
    let cartData = ref(null);
    let memberOptions = ref(null);

    const initialPagination = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 100,
      // rowsNumber: xx if getting data from a server
    };

    onBeforeMount(() => {
      let clone = getCartItemsGetter.value.slice(0);

      if (!clone?.length) {
        $router.back();
      } else {
        $q.loading.show({
          delay: 400, // ms
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

    const getOptionsMembersGetter = computed(() => {
      return $store.getters[GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT];
    });

    watch(getOptionsMembersGetter.value, () => {
      console.log({ getOptionsMembersGetter });
    });

    const getCartItemsGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_GETT];
    });

    const getCartItemsTotalPriceGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_TOTAL_PRICE_GETT];
    });

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

    return {
      //states
      cartColumns,
      getCartItemsGetter,
      initialPagination,
      getCartItemsTotalPriceGetter,
      cartData,
      getOptionsMembersGetter,
      memberOptions,
      memberInput,
      //handlers
      filterFn,
      handleChangeQuantity,
    };
  },
});
</script>
<style scoped lang="scss">
.quantity-input {
  // height: 20px;
  width: 100px;
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
    font-weight: bold;
    color: #c36;
    font-size: 16px;
  }
}
.title {
  text-align: center;
}
</style>
