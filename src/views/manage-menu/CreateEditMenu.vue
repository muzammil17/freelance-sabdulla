<template>
  <div class="row q-mx-md q-col-gutter-sm">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-my-sm">
      <q-form @submit="handleOpen">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="menu.menuName"
              outlined
              label="Menu Name *"
              hint="ex: Register Page"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val?.length > 0) || 'Menu Name is Required',
              ]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="menu.menuUrl"
              outlined
              label="Menu Url *"
              :rules="[
                (val) => (val && val?.length > 0) || 'Menu Url is Required',
              ]"
              hint="ex: /register"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="menu.sortOrder"
              outlined
              type="number"
              label="Sort Order *"
              :rules="[
                (val) =>
                  (val?.length > 0 && val >= 0) ||
                  'Sort must be a positive Number',
              ]"
              hint="ex: 1"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-select
              outlined
              label="Select Parent Menu"
              v-model="menu.parentMenuId"
              behavior="menu"
              :options="option"
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
          <div class="col-12 col-sm-6">
            <q-toggle label="Menu Active" v-model="menu.isActive" />
          </div>

          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-btn
              type="submit"
              color="primary"
              size="small"
              class="q-ml-xs"
              label="Save"
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
  <ConfirmationModal
    :open="open"
    :handleSubmit="confirm"
    :handleClose="handleClose"
  />
</template>

<script>
import {
  GET_ALL_MENU_REQUEST,
  getMenuByIdRequest,
  saveMenuRequest,
} from "@/action/actionTypes";
import { defineComponent, ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { toastMessage } from "@/constants";
import { useRouter } from "vue-router";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal.vue";
export default defineComponent({
  name: "CreateEditMenu",
  components: { ConfirmationModal },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const tableLoader = ref(false);
    const allMenus = ref([]);
    const menu = ref({
      menuName: "",
      menuUrl: "",
      isActive: false,
      sortOrder: 0,
    });
    const option = ref([]);
    const params = $router.currentRoute.value.params;
    console.log({ params });

    const open = ref({
      bool: false,
      loading: false,
      title: "User Menu",
      text: "Are you sure you want to save changes to this menu",
    });

    // allowed actions

    onBeforeMount(() => {
      tableLoader.value = true;
      $store.dispatch(getMenuByIdRequest, {
        payload: { id: params?.id },
        responseCallback: (status, res) => {
          console.log({ res });
          if (res?.data) {
            menu.value = {
              ...res?.data,
            };
          }
          $store.dispatch(GET_ALL_MENU_REQUEST, {
            payload: {},
            responseCallback: (status, res) => {
              if (res?.data?.length) {
                const options = res?.data?.map((item) => {
                  return {
                    value: item?.menuId,
                    label: item?.menuName,
                  };
                });
                let findMenu = options?.find(
                  (dt) => dt?.value == menu?.value.parentMenuId
                );
                option.value = options;
                if (findMenu) {
                  menu.value.parentMenuId = findMenu;
                }
                // allMenus.value = res?.data;
                tableLoader.value = false;
              }
            },
          });
        },
      });
    });

    const handleRoute = (url) => {
      $router.push(url);
    };

    const handleClose = () => {
      open.value = { ...open.value, loading: false, bool: !open.value.bool };
    };

    const handleOpen = () => {
      open.value = { ...open.value, bool: true };
    };

    const confirm = () => {
      open.value.bool = true;
      console.log({ menu });
      let payload = {
        ...menu.value,
        sortOrder: Number(menu.value.sortOrder),
        parentMenuId: menu.value.parentMenuId?.value
          ? menu.value.parentMenuId?.value
          : null,
      };
      $store.dispatch(saveMenuRequest, {
        payload: { ...payload },
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
    return {
      //states
      tableLoader,

      $router,
      open,
      allMenus,
      menu,
      option,
      //handlers
      confirm,

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
