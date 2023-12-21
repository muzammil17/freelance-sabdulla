<template>
  <q-form @submit="handleOpen">
    <div class="row q-mx-md q-col-gutter-sm">
      <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6">
            <q-input
              outlined
              v-model="currentUserGroup.userGroupName"
              label="User Group Name *"
              hint="ex: John"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  (val && val?.length > 0) || 'User Group Name is required',
              ]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              outlined
              v-model="currentUserGroup.userGroupId"
              label="User Group ID *"
              hint="ex: 01"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val?.length > 0) || 'User Group ID is required',
              ]"
              class="input-field"
            />
          </div>
          <div class="col-12 col-sm-6">
            <div>
              <q-toggle
                v-model="currentUserGroup.userGroupActive"
                label="User Group Active"
              />
            </div>
          </div>
          <!-- :rules="[
                    (val) => (val && val.length > 0) || 'First Name is required',
                    (val) => (val && val.length <= 20) || 'Limit exceeded',
                  ]" -->
        </div>
      </div>
      <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12">
        <q-select
          v-model="model"
          filled
          clearable
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Search Menus"
          :options="options"
          @filter="filterFnAutoselect"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12 q-my-sm">
        <div class="row justify-end">
          <div>
            <q-btn
              color="primary"
              size="small"
              label="Add Menu"
              @click="handleAddMenu"
            />
          </div>
        </div>
      </div>

      <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
        <q-table
          :loading="tableLoader"
          title="User Group Menus"
          dense
          :rows="currentUserGroup.userGroupMenus"
          :pagination="pagination"
          class="table-header-wrapper"
          :filter="search"
          :columns="USER_GROUPS_MENUS_COLUMNS"
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
          <template v-slot:body-cell-isActiveLabel="props">
            <q-td :props="props">
              {{ props?.row?.isActive ? "Active" : "Inactive" }}
            </q-td>
          </template>
          <template v-slot:body-cell-accesstypes="props">
            <q-td :props="props">
              <div class="row">
                <div
                  class="col-12 col-sm-6 col-md-3"
                  v-for="(item, index) in accesstype"
                  :key="index"
                >
                  <q-toggle
                    :model-value="
                      props?.row.allowedAccessTypes?.find(
                        (dt) =>
                          dt?.menuId == props?.row?.menuId &&
                          dt?.userAccessTypes?.find(
                            (dta) => dta?.accessTypesId === item?.accessTypesId
                          )
                      )
                        ? true
                        : false
                    "
                    @update:model-value="(e) => handleTogg(e, item, props)"
                    :label="item?.accessTypeName"
                  />
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                @click="handleDeleteMenu(props)"
                round
                color="primary"
                size="sm"
                class="edit-memberbtn"
                icon="delete"
              />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 text-right">
        <q-btn
          color="primary"
          size="small"
          class="q-ml-xs"
          label="Save"
          type="submit"
        />
        <!-- @click="handleOpen" -->
      </div>
    </div>
  </q-form>
  <ConfirmationModal
    :open="open"
    :handleSubmit="confirm"
    :handleClose="handleClose"
  />
</template>

<script>
import {
  GET_ALL_MENU_REQUEST,
  GET_USER_GROUP_ID_REQUEST,
  GET_ALL_ACCESSTYPES_REQUEST,
  saveUserGroupRequest,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import {
  pagination,
  // toastMessage,
  USER_GROUPS_MENUS_COLUMNS,
  toastMessage,
} from "@/constants";
import { useRouter } from "vue-router";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal.vue";
export default defineComponent({
  name: "ManageUserGroup",
  components: { ConfirmationModal },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const search = ref("");
    const allMenus = ref([]);
    const currentUserGroup = ref({
      userGroupName: "",
      userGroupActive: false,
      userGroupMenus: [],
      userGroupId: "",
    });
    const model = ref("");
    const options = ref([]);
    const accesstype = ref([]);

    const params = $router.currentRoute.value.params;
    console.log({ params });

    const open = ref({
      bool: false,
      loading: false,
      title: "Edit User Group",
      text: "Are you sure you want to save changes to this user group",
    });

    const handleTogg = (e, item, props) => {
      let clone = [...(currentUserGroup.value?.userGroupMenus ?? [])];

      let findIndex = clone?.findIndex(
        (dt) => dt?.menuId == props?.row?.menuId
      );

      let indexOfAllowedAccesstypes = clone[
        findIndex
      ]?.allowedAccessTypes?.findIndex((dt) => props.row?.menuId == dt?.menuId);

      if (indexOfAllowedAccesstypes < 0) {
        clone[findIndex]?.allowedAccessTypes.push({
          userGroupId: currentUserGroup?.value?.userGroupId,
          menuId: props.row?.menuId,
          userAccessTypes: [item],
        });
      } else {
        const findIfAccesstypeExist = clone[findIndex]?.allowedAccessTypes[
          indexOfAllowedAccesstypes
        ]?.userAccessTypes?.findIndex(
          (dt) => dt?.accessTypesId == item?.accessTypesId
        );

        if (findIfAccesstypeExist >= 0) {
          clone[findIndex]?.allowedAccessTypes[
            indexOfAllowedAccesstypes
          ]?.userAccessTypes?.splice(findIfAccesstypeExist, 1);
        } else {
          clone[findIndex]?.allowedAccessTypes[
            indexOfAllowedAccesstypes
          ]?.userAccessTypes.push(item);
        }
      }
      currentUserGroup.value = {
        ...currentUserGroup.value,
        userGroupMenus: clone,
      };
    };

    // allowed actions

    onBeforeMount(() => {
      tableLoader.value = true;
      console.log("dsdsd");

      $store.dispatch(GET_ALL_ACCESSTYPES_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          if (res?.data?.length) {
            accesstype.value = res?.data;
          }
        },
      });
      if (params.id) {
        $store.dispatch(GET_USER_GROUP_ID_REQUEST, {
          payload: { id: params?.id, withPrivileges: true },
          responseCallback: (status, res) => {
            if (res?.data) {
              currentUserGroup.value = res?.data;
            }
          },
        });
      }

      $store.dispatch(GET_ALL_MENU_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          tableLoader.value = false;

          if (res?.data?.length) {
            allMenus.value = res?.data;
          }
        },
      });
    });

    const handleClose = () => {
      open.value = { ...open.value, loading: false, bool: !open.value.bool };
    };

    const handleOpen = () => {
      open.value = { ...open.value, bool: true };
    };

    const filterFnAutoselect = (val, update) => {
      // call abort() at any time if you can't retrieve data somehow
      update(() => {
        console.log({
          val,
          update,
          currentUserGroup: currentUserGroup.value,
          allMenus: allMenus.value,
        });
        const needle = val.toLocaleLowerCase();
        options.value = allMenus.value
          ?.filter(
            (item) =>
              !currentUserGroup.value?.userGroupMenus.some(
                (userItem) => userItem?.menuName == item?.menuName
              )
          )
          ?.filter((v) => v?.menuName.toLocaleLowerCase().indexOf(needle) > -1)
          .map((item) => {
            return {
              label: `${item?.menuName} (${item?.menuUrl})`,
              value: item?.menuId,
            };
          });
      });
    };

    const handleAddMenu = () => {
      if (model.value) {
        let clone = [...(currentUserGroup.value?.userGroupMenus ?? [])];
        let findMenu = allMenus.value?.find(
          (item) => item?.menuId == model.value?.value
        );
        clone.unshift({
          ...findMenu,
          isActiveLabel: findMenu?.isActive ? "Yes" : "No",
        });
        currentUserGroup.value = {
          ...currentUserGroup.value,
          userGroupMenus: clone,
        };
        model.value = null;
      }
    };

    const handleDeleteMenu = (row) => {
      let clone = [...(currentUserGroup.value?.userGroupMenus ?? [])];
      let findIndex = clone?.findIndex((dt) => dt?.menuId == row?.row?.menuId);
      clone.splice(findIndex, 1);
      currentUserGroup.value = {
        ...currentUserGroup.value,
        userGroupMenus: clone,
      };
    };

    const confirm = () => {
      open.value.bool = true;
      $store.dispatch(saveUserGroupRequest, {
        payload: { ...currentUserGroup.value },
        responseCallback: (status, res) => {
          if (status) {
            toastMessage(res?.message, true);
            $router.back();
          } else {
            toastMessage("Something Went Wrong", false);
          }
          handleClose();
        },
      });
    };

    const onSubmit = () => {};

    return {
      //states
      tableLoader,
      pagination,

      $router,
      open,
      search,
      allMenus,
      currentUserGroup,
      USER_GROUPS_MENUS_COLUMNS,
      options,
      model,
      accesstype,
      params,
      //handlers
      onSubmit,

      handleTogg,
      confirm,
      handleAddMenu,
      handleDeleteMenu,
      filterFnAutoselect,
      handleOpen,
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
