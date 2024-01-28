<template>
  <div class="row justify-center">
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-10 col-xs-10 q-gutter-y-lg"
    >
      <q-form @submit="handleSubmit">
        <div class="row justify-start q-col-gutter-md">
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              :disable="currentRoute?.params?.id ? true : false"
              v-model="formState.userId"
              label="User ID *"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val.length > 0) || 'User Id is required',
              ]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.userName"
              label="User Name *"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val.length > 0) || 'User Name is required',
              ]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.displayName"
              label="Display Name *"
              lazy-rules
              class="input-field"
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />
          </div>

          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.email"
              label="Email *"
              :rules="[
                (val) => (val && val.length > 0) || 'Email is required',
                (val) => validateEmail(val) || 'Email is invalid',
              ]"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-select
              label="User Group ID *"
              outlined
              aria-modal="false"
              behavior="menu"
              v-model="formState.userGroupId"
              :options="options"
              :rules="[(val) => val || 'MemberShip type is required']"
              class="input-field"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-checkbox
              dense
              v-model="formState.userActive"
              label="Is User Active?"
              color="primary"
            />
          </div>

          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="submit-btn-wrapper">
              <q-btn
                :loading="btnLoader"
                class="submit-btn"
                :label="currentRoute?.params?.id ? 'Edit User' : 'Add User'"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";
import { checkPhoneMobile, checkCNIC, validateEmail } from "@/constants";
import { useStore } from "vuex";
// import moment from "moment";
import {
  GET_USER_GROUP_REQUEST,
  getSingleUserRequest,
  saveUserRequest,
} from "@/action/actionTypes";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "AllVisitorsView",

  components: {},

  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();
    const currentRoute = $router.currentRoute;
    const options = ref([]);
    let btnLoader = ref(false);

    const initialFormState = {
      userId: "",
      userName: "",
      email: "",
      displayName: "",
      userGroupId: "",
      userActive: false,
    };

    let formState = ref(initialFormState);

    onBeforeMount(() => {
      if (currentRoute?.value?.params?.id) {
        getSingleUser();
      } else {
        getAllUserGroups();
      }
    });

    const handleSubmit = () => {
      btnLoader.value = true;
      const payload = {
        ...formState.value,
        userGroupId: formState.value.userGroupId?.value,
      };
      $store.dispatch(saveUserRequest, {
        payload,
        responseCallback: (status, res) => {
          btnLoader.value = false;

          if (status) {
            toastMessage(res?.message || "New User added", true);
          } else {
            toastMessage(res?.message || "Something went wrong", false);
          }
        },
      });
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

    const getAllUserGroups = () => {
      $store.dispatch(GET_USER_GROUP_REQUEST, {
        payload: {},
        responseCallback: (status, res) => {
          if (status) {
            let newoptions = res?.data?.map((item) => {
              return {
                label: item?.userGroupName,
                value: item?.userGroupId,
              };
            });
            if (currentRoute.value?.params?.id) {
              formState.value = {
                ...formState.value,
                userGroupId: newoptions?.find(
                  (dt) => dt?.value == formState.value.userGroupId
                ),
              };
            }
            options.value = newoptions;
          }
        },
      });
    };

    const getSingleUser = () => {
      $store.dispatch(getSingleUserRequest, {
        payload: { id: currentRoute?.value?.params?.id },
        responseCallback: (status, res) => {
          console.log({ status, res });
          if (status) {
            formState.value = { ...res.data };
            getAllUserGroups();
          }
        },
      });
    };

    return {
      //states
      formState,
      btnLoader,
      $router,
      options,
      currentRoute: currentRoute.value,
      //handlers
      validateEmail,
      toastMessage,
      handleSubmit,
      checkPhoneMobile,
      checkCNIC,
    };
  },
});
</script>
<style scoped lang="scss"></style>
