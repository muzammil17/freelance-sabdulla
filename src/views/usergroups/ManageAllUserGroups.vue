<template>
  <div class="row q-mx-md q-col-gutter-sm">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-sm">
      <div class="row justify-end">
        <div>
          <q-btn
            color="primary"
            size="small"
            label="Add User Group"
            @click="handleRoute(ADD_USER_GROUP_URL.url)"
          />
        </div>
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
              flat
              color="primary"
              size="sm"
              class="edit-memberbtn"
              icon="edit"
              @click="
                handleRoute(
                  EDIT_USER_GROUP_URL.url.replace(
                    ':id',
                    props?.row?.userGroupId
                  ),
                  props
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
  GET_USER_GROUPS_GETT,
  GET_USER_GROUP_REQUEST,
  GET_ALL_MENU_REQUEST,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import {
  USER_GROUPS_COLUMNS,
  pagination,
  // toastMessage,
  EDIT_USER_GROUP_URL,
  ADD_USER_GROUP_URL,
} from "@/constants";
import { useRouter } from "vue-router";
import { ConfirmationModal } from "@/components";
export default defineComponent({
  name: "ManageMenu",

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
      $store.dispatch(GET_USER_GROUP_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          console.log({ status, res });
          tableLoader.value = false;
        },
      });
      $store.dispatch(GET_ALL_MENU_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          if (res?.data?.length) {
            allMenus.value = res?.data;
          }
          console.log({ res });
        },
      });
    });

    //getters
    const getUserGroupsGetter = computed(() => {
      return $store.getters[GET_USER_GROUPS_GETT];
    });

    const handleRoute = (url, prp) => {
      console.log({ prp });
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
      pagination,

      USER_GROUPS_COLUMNS,
      $router,
      open,
      getUserGroupsGetter,
      search,
      allMenus,
      EDIT_USER_GROUP_URL,
      ADD_USER_GROUP_URL,
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
