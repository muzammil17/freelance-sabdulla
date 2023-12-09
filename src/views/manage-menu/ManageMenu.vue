<template>
  <div class="row q-mx-md q-col-gutter-sm">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-sm">
      <div class="row justify-end">
        <!-- <div>
            <q-btn color="primary" label="Add Menu Role" />
          </div> -->
      </div>
    </div>

    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <q-table
        :loading="tableLoader"
        title="User Groups"
        dense
        :pagination="pagination"
        class="table-header-wrapper"
        :rows="getUserGroupsGetter"
        :filter="search"
        :columns="USER_GROUPS_COLUMNS"
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
              color="primary"
              size="sm"
              class="edit-memberbtn"
              icon="edit"
              @click="handleOpen(props.row, true)"
            />
            <!-- :disable="!props?.row?.printUrl ? true : false"
              v-if="allowed.printCollection" -->
          </q-td>
        </template>
      </q-table>
    </div>
  </div>

  <EditMeuRoleModal :open="open" rows="open" :handleClose="handleClose" />
  <!-- :handleSubmit="handleSubmitCancel"  -->
</template>

<script>
import {
  GET_VISITORS_GETT,
  GET_USER_GROUPS_GETT,
  GET_USER_GROUP_REQUEST,
  GET_ALL_MENU_REQUEST,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import {
  allVisitorColumns,
  USER_GROUPS_COLUMNS,
  visitorDetailColumns,
  pagination,
  // toastMessage,
  CREATE_ENTRY_VISITOR_URL,
  singleCollectionColumns,
} from "@/constants";
import { useRouter } from "vue-router";
import { EditMeuRoleModal } from "@/components";
export default defineComponent({
  name: "ManageMenu",

  components: { EditMeuRoleModal },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const open = ref({
      id: null,
      item: null,
      bool: false,
      loading: false,
      title: "Edit User Group Role",
      text: "Are you sure you want to cancel this receipt",
    });

    // allowed actions

    onBeforeMount(() => {
      tableLoader.value = true;
      $store.dispatch(GET_USER_GROUP_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
      $store.dispatch(GET_ALL_MENU_REQUEST, {
        payload: {},
        responseCallback: () => {},
      });
    });

    //getters
    const getUserGroupsGetter = computed(() => {
      return $store.getters[GET_USER_GROUPS_GETT];
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

    const handleOpen = (value = null, bool = false) => {
      open.value = { ...open.value, item: value, bool };
    };

    return {
      //states
      tableLoader,
      CREATE_ENTRY_VISITOR_URL,
      getVisitorsGetter,
      pagination,

      allVisitorColumns,
      USER_GROUPS_COLUMNS,
      visitorDetailColumns,
      $router,
      singleCollectionColumns,
      open,
      getUserGroupsGetter,
      //handlers
      handleOpen,
      handleRoute,
      handleClose,
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
