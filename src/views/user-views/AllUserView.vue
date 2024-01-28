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
              icon="lock"
              :loading="props.row.userId === open.id ? resetPassloading : false"
              @click="handleResetPassword(props.row.userId)"
            />
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
  <ConfirmationModal
    :open="open"
    :handleSubmit="handleSubmitConfirmation"
    :handleClose="handleClose"
  />
</template>

<script>
import {
  GET_USER_ALLOWED_MENUS_GETT,
  getUsersRequest,
  resetPasswordRequest,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal.vue";
import {
  allUsersColumns,
  pagination,
  ADD_USER_VIEW_URL,
  EDIT_USER_VIEW_URL,
  toastMessage,
  handleAllowedActions,
} from "@/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AllVisitorsView",

  components: { ConfirmationModal },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const allUsers = ref([]);
    const resetPassloading = ref(false);
    const open = ref({
      id: "",
      bool: false,
      loading: false,
      text: "",
      title: "Reset Password",
    });

    const currentRoute = $router.currentRoute.value;
    let search = ref(null);

    // allowed actions
    const allowed = ref({
      addUser: false,
      updateUser: false,
    });

    const getUserAllowedMenusGetter = computed(() => {
      return $store.getters[GET_USER_ALLOWED_MENUS_GETT];
    });

    onBeforeMount(() => {
      handleGetAllUsers();
      let actions = handleAllowedActions(
        currentRoute,
        getUserAllowedMenusGetter,
        "",
        "addUser",
        "updateUser"
      );
      console.log({ actions });
      if (actions && Object.keys(actions)?.length) {
        allowed.value = { ...allowed.value, ...actions };
      }
    });

    const handleClose = () => {
      open.value.bool = false;
      open.value.loading = false;
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

    const handleResetPassword = (id) => {
      resetPassloading.value = true;
      open.value.id = id;
      $store.dispatch(resetPasswordRequest, {
        payload: `userId=${id}`,
        responseCallback: (status, res) => {
          resetPassloading.value = false;

          if (status) {
            open.value.bool = true;
            open.value.text = res.message;
          } else {
            res?.message && toastMessage(res?.message, false);
          }
        },
      });
    };

    const handleSubmitConfirmation = () => {
      handleClose();
    };

    return {
      //states
      toastMessage,
      handleAllowedActions,
      allUsers,
      tableLoader,
      pagination,
      search,
      resetPassloading,
      handleRouteEdit,
      handleSubmitConfirmation,
      filterOptions: [
        { label: "Active Visitors", value: false },
        { label: "All Visitors", value: true },
      ],
      allUsersColumns,
      $router,
      getUserAllowedMenusGetter,
      ADD_USER_VIEW_URL,
      allowed,
      open,
      //handlers
      handleResetPassword,
      handleRoute,
      handleClose,
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
