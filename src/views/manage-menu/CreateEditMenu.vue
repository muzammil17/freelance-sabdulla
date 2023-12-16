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
import { getMenuByIdRequest, saveMenuRequest } from "@/action/actionTypes";
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
    });

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
            menu.value = res?.data;
          }
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
      $store.dispatch(saveMenuRequest, {
        payload: { ...menu.value },
        responseCallback: (status, res) => {
          if (status) {
            toastMessage(res?.message, true);
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
