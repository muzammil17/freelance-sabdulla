<template>
  <q-dialog v-model="openCopy.bool">
    <q-card-section
      style="max-width: 991px; width: 1000px; min-height: 200px"
      class="bg-white visitor-detail-card"
    >
      <div class="row justify-between q-col-gutter-lg">
        <div>
          <div class="text-h5">{{ openCopy.title }}</div>
        </div>
        <div>
          <q-btn
            dense
            round
            flat
            color="primary"
            icon="ion-close-circle"
            @click="handleClose"
          />
        </div>
        <div style="width: 100%">
          <div class="row q-col-gutter-md w-100">
            <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-12">
              <q-select
                v-model="model"
                filled
                clearable
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                label="Focus after filtering"
                :options="options"
                @filter="filterFnAutoselect"
              >
                <!-- @filter="filterFn"
                @filter-abort="abortFilterFn" -->
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
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
                :rows="currentUserGroup.assignedMenus"
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
                <template v-slot:body-cell-accesstypes="props">
                  <q-td :props="props">
                    <div>
                      <q-toggle v-model="checkeddd" label="View" />
                      <q-toggle v-model="checkeddd" label="Edit" />
                    </div>

                    <div>
                      <q-toggle v-model="checkeddd" label="Delete" />
                      <q-toggle v-model="checkeddd" label="Update" />
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
          </div>
        </div>
        <div
          class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 text-right"
        >
          <q-btn
            color="primary"
            size="small"
            class="q-ml-xs"
            label="Confirm"
            :loading="openCopy.loading"
            @click="handleSubmit"
          />
        </div>
      </div>
    </q-card-section>
  </q-dialog>
</template>
<script>
import { defineComponent, toRefs, ref, watch } from "vue";
import { USER_GROUPS_MENUS_COLUMNS } from "@/constants";
// import { useRouter } from "vue-router";
// import { GET_ALL_MENU_REQUEST } from "@/action/actionTypes";
export default defineComponent({
  name: "EditMenuRolesModal",
  components: {},
  props: {
    open: Object,
    allMenus: Array,
    handleClose: { required: true, type: Function },
    rows: { required: true, type: Array },

    handleSubmit: { required: true, type: Function },
  },

  setup(props) {
    const { open, allMenus } = toRefs(props);
    const search = ref("");
    const model = ref("");
    const checkeddd = ref(false);
    const currentUserGroup = ref(null);

    const options = ref([]);
    console.log({ allMenus: allMenus.value });

    watch(open, () => {
      if (open.value.bool) {
        console.log({ open: open.value });
        currentUserGroup.value = open.value.item;

        let newoptions = allMenus.value
          ?.filter(
            (item) =>
              !currentUserGroup.value?.assignedMenus.some(
                (userItem) => userItem?.menuName == item?.menuName
              )
          )
          ?.map((item) => {
            return {
              label: `${item?.menuName} (${item?.menuUrl})`,
              value: item?.menuId,
            };
          });
        options.value = newoptions;
        console.log({
          currentUserGroup: currentUserGroup.value,
          newoptions: newoptions,
          allMenus: allMenus.value,
        });
      }
    });

    const handleAddMenu = () => {
      if (model.value) {
        let clone = [...(currentUserGroup.value?.assignedMenus ?? [])];
        let findMenu = allMenus.value?.find(
          (item) => item?.menuId == model.value?.value
        );
        clone.unshift({
          ...findMenu,
          isActiveLabel: findMenu?.isActive ? "Yes" : "No",
        });
        currentUserGroup.value = {
          ...currentUserGroup.value,
          assignedMenus: clone,
        };
        console.log({ clone: clone });
      }
    };

    const handleDeleteMenu = (row) => {
      let clone = [...(currentUserGroup.value?.assignedMenus ?? [])];
      let findIndex = clone?.findIndex((dt) => dt?.menuId == row?.row?.menuId);
      console.log({ row, findIndex });
      clone.splice(findIndex, 1);
      currentUserGroup.value = {
        ...currentUserGroup.value,
        assignedMenus: clone,
      };
    };

    const filterFnAutoselect = (val, update) => {
      // call abort() at any time if you can't retrieve data somehow
      update(() => {
        console.log({ val, update });
        const needle = val.toLocaleLowerCase();
        options.value = allMenus.value
          ?.filter(
            (item) =>
              !currentUserGroup.value?.assignedMenus.some(
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

    return {
      openCopy: open,
      USER_GROUPS_MENUS_COLUMNS,
      search,
      options,
      currentUserGroup,
      checkeddd,
      filterFnAutoselect,
      handleAddMenu,
      handleDeleteMenu,
      model,
    };
  },
});
</script>
