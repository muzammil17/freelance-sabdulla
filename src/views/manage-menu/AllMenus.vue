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
        title="Menus"
        dense
        :pagination="pagination"
        class="table-header-wrapper"
        :rows="allMenus"
        :filter="search"
        :columns="ALL_MENUS_COLUMNS"
        row-key="menuName"
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
        <template v-slot:body-cell-isActive="props">
          <q-td :props="props">
            {{ props?.row?.isActive ? "Active" : "Inactive" }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              size="sm"
              class="edit-memberbtn"
              icon="edit"
              @click="
                handleRoute(
                  EDIT_MENU_URL.url.replace(':id', props?.row?.menuId)
                )
              "
            />
            <!-- <q-btn
              dense
              round
              flat
              color="primary"
              size="sm"
              class="edit-memberbtn"
              icon="delete"
              @click="handleOpen(props?.row, true)"
            /> -->
          </q-td>
        </template>
      </q-table>
    </div>
  </div>

  <ConfirmationModal
    :handleSubmit="handleSubmit"
    :open="open"
    :handleClose="handleClose"
  />
  <!-- :handleSubmit="handleSubmitCancel"  -->
</template>

<script>
import {
  GET_VISITORS_GETT,
  GET_USER_GROUPS_GETT,
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
  ALL_MENUS_COLUMNS,
  CREATE_ENTRY_VISITOR_URL,
  singleCollectionColumns,
  EDIT_USER_GROUP_URL,
  EDIT_MENU_URL,
} from "@/constants";
import { useRouter } from "vue-router";
import { ConfirmationModal } from "@/components";
export default defineComponent({
  name: "AllMenus",

  components: { ConfirmationModal },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const search = ref("");
    const allMenus = ref([]);

    const open = ref({
      id: null,
      item: null,
      bool: false,
      loading: false,
      title: "Delete User Group",
      text: "Are you sure you want to delete this user group",
    });

    // allowed actions

    onBeforeMount(() => {
      tableLoader.value = true;

      $store.dispatch(GET_ALL_MENU_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          if (res?.data?.length) {
            allMenus.value = res?.data;
            tableLoader.value = false;
          }
        },
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

    const handleSubmit = () => {
      handleClose();
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
      search,
      allMenus,
      EDIT_USER_GROUP_URL,
      ALL_MENUS_COLUMNS,
      EDIT_MENU_URL,
      //handlers
      handleOpen,
      handleSubmit,
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
