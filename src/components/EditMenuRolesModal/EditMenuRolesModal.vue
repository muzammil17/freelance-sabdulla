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
                filled
                v-model="model"
                clearable
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                label="Focus after filtering"
                :options="options"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
              >
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
                  <q-btn color="primary" label="Add Menu Role" />
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
              <q-table
                :loading="tableLoader"
                title="User Group Menus"
                dense
                :rows="openCopy.item.assignedMenus"
                :pagination="pagination"
                class="table-header-wrapper"
                :filter="search"
                :columns="USER_GROUPS_MENUS_COLUMNS"
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
              </q-table>
            </div>
          </div>
        </div>
        <!-- <div
          class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 text-center"
        >
          <q-btn
            color="primary"
            size="small"
            label="Cancel"
            @click="handleClose"
          />
          <q-btn
            color="primary"
            size="small"
            class="q-ml-xs"
            label="Confirm"
            :loading="openCopy.loading"
            @click="handleSubmit"
          />
        </div> -->
      </div>
    </q-card-section>
  </q-dialog>
</template>
<script>
import { defineComponent, toRefs } from "vue";
import { USER_GROUPS_MENUS_COLUMNS } from "@/constants";
// import { useRouter } from "vue-router";
// import { GET_ALL_MENU_REQUEST } from "@/action/actionTypes";
export default defineComponent({
  name: "EditMenuRolesModal",
  components: {},
  props: {
    open: Object,
    handleClose: { required: true, type: Function },
    rows: { required: true, type: Array },

    handleSubmit: { required: true, type: Function },
  },

  setup(props) {
    const { open } = toRefs(props);
    // const $store = useRouter();
    console.log({ openCopy: open.value });

    // onMounted(() => {

    // });

    return { openCopy: open, USER_GROUPS_MENUS_COLUMNS };
  },
});
</script>
