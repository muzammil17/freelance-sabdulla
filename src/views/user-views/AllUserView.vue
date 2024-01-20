<template>
  <div class="row q-mx-md">
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-md"
      v-if="allowed?.addUser"
    >
      <div class="row justify-end">
        <div>
          <q-btn
            color="primary"
            label="Add User"
            @click="handleRoute(ADD_USER_VIEW_URL.url)"
          />
        </div>
      </div>
    </div>

    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <q-table
        :loading="tableLoader"
        title="Users"
        dense
        :pagination="pagination"
        class="table-header-wrapper"
        :rows="allUsers"
        :filter="search"
        :columns="allUsersColumns"
        row-key="displayName"
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
              v-if="allowed.updateUser"
              dense
              round
              flat
              class="edit-memberbtn"
              icon="edit"
              @click="handleRouteEdit(props)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {
  GET_USER_ALLOWED_MENUS_GETT,
  getUsersRequest,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import {
  allUsersColumns,
  visitorDetailColumns,
  pagination,
  ADD_USER_VIEW_URL,
  ALL_ROUTES,
  EDIT_USER_VIEW_URL,
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
    const allUsers = ref([]);

    const currentRoute = $router.currentRoute.value;
    const initialFilter = { label: "All Visitors", value: true };
    let filterBy = ref(initialFilter);
    let search = ref(null);
    let logoutVisitor = ref(null);

    // allowed actions
    const allowed = ref({
      addUser: false,
      updateUser: false,
    });

    const initialFormState = {
      identityReturned: false,
      rfCardReturned: false,
      rfNotRetReason: "",
    };

    let formState = ref(initialFormState);

    const getUserAllowedMenusGetter = computed(() => {
      return $store.getters[GET_USER_ALLOWED_MENUS_GETT];
    });

    onBeforeMount(() => {
      handleGetAllUsers();
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
      if (menuFind) {
        for (const item of menuFind?.accessMenu) {
          console.log({ item });
          if (item?.accessTypeId === 3) {
            allowed.value.addUser = true;
          } else if (item?.accessTypeId === 2) {
            allowed.value.updateUser = true;
          }
        }
      }
    };

    const onSubmit = () => {};

    const handleRowClick = () => {
      // handleCloseVisitorDetail(prop?.row?.visitorLogId);
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
    function handleGetAllUsers() {
      tableLoader.value = true;

      $store.dispatch(getUsersRequest, {
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;

          if (status) {
            let data = res?.data?.map((item) => {
              return {
                ...item,
                isActive: item?.userActive ? "Yes" : "No",
              };
            });
            allUsers.value = data;
          }
        },
      });
    }

    const handleRoute = (url) => {
      $router.push(url);
    };

    const handleRouteEdit = (prop) => {
      $router.push(EDIT_USER_VIEW_URL.url.replace(":id", prop?.row?.userId));
    };

    return {
      //states
      toastMessage,
      handleAllowedActions,
      allUsers,
      tableLoader,
      logoutVisitor,
      formState,
      pagination,
      search,
      handleRouteEdit,
      filterOptions: [
        { label: "Active Visitors", value: false },
        { label: "All Visitors", value: true },
      ],
      filterBy,
      allUsersColumns,
      visitorDetailColumns,
      $router,
      getUserAllowedMenusGetter,
      ADD_USER_VIEW_URL,
      allowed,
      //handlers
      handleRoute,
      onSubmit,
      handleRowClick,
      EDIT_USER_VIEW_URL,
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
