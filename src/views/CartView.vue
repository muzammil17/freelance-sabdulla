<template>
  <div class="row justify-center q-col-gutter-xs">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        title="Cart"
        dense
        :pagination="initialPagination"
        class="table-header-wrapper"
        :rows="getCartItemsGetter"
        :columns="cartColumns"
        row-key="name"
      >
        <template v-slot:bottom> Bottom </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { GET_CART_ITEMS_GETT } from "@/action/actionTypes";
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { cartColumns } from "@/constants";

export default defineComponent({
  name: "CartView",

  components: {},

  setup() {
    const $store = useStore();
    const initialPagination = {
      sortBy: "desc",
      descending: false,
      rowsPerPage: 100,
      // rowsNumber: xx if getting data from a server
    };
    onMounted(() => {
      console.log("getCartItemsGetter", getCartItemsGetter.value);
    });
    const getCartItemsGetter = computed(() => {
      return $store.getters[GET_CART_ITEMS_GETT];
    });

    return {
      //states
      cartColumns,
      getCartItemsGetter,
      initialPagination,
      //handlers
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
}
</style>
