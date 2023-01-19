<template>
  <div class="row justify-center q-col-gutter-xs">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        :hide-pagination="true"
        title="Cart"
        dense
        :pagination="initialPagination"
        class="table-header-wrapper"
        :rows="getCartItemsGetter"
        :columns="cartColumns"
        row-key="name"
      >
        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-input
              type="number"
              v-model="props.row.quantity"
              dense
              outlined
            />
          </q-td>
        </template>
        <template v-slot:bottom-row>
          <q-tr>
            <q-td></q-td>
            <q-td>
              <span> Total Price: </span>
            </q-td>

            <q-td> Rs. {{ getCartItemsTotalPriceGetter }} </q-td>
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
} from "@/action/actionTypes";
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { cartColumns } from "@/constants";

export default defineComponent({
  name: "CartView",

  components: {},

  setup() {
    const $store = useStore();
    let cartQuant = ref(null);

    const initialPagination = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 100,
      // rowsNumber: xx if getting data from a server
    };
    onMounted(() => {
      let clone = getCartItemsGetter.value.slice(0);
      let addProgQuant = {};
      for (const item of clone) {
        addProgQuant = {
          quantity: item.quantity,
        };
        // push({ progId: item?.progId, quantity: item?.quantity });
      }

      cartQuant.value = addProgQuant;
      console.log(
        "getCartItemsGetter",
        { addProgQuant },
        getCartItemsGetter.value
      );
    });
    const getCartItemsGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_GETT];
    });

    const getCartItemsTotalPriceGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_TOTAL_PRICE_GETT];
    });

    return {
      //states
      cartColumns,
      getCartItemsGetter,
      initialPagination,
      getCartItemsTotalPriceGetter,
      cartQuant,
      //handlers
    };
  },
});
</script>
<style scoped lang="scss">
.quantity-input {
  // height: 20px;
  width: 100px;
}
.title {
  text-align: center;
}
</style>
