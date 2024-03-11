<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10 q-gutter-y-lg">
      <h5 class="title">Change Password</h5>
    </div>
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 q-gutter-y-lg"
    >
      <q-form @submit="onSubmit">
        <div class="row justify-center q-gutter-y-lg">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="password"
              class="input-field"
              v-model="formState.oldPassword"
              label="Old Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val?.trim() !== '') ||
                  'Please type your Password',
                (val) =>
                  val.trim() !== formState.newPassword ||
                  'Old password must be different from new password',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="password"
              class="input-field"
              v-model="formState.newPassword"
              label="New Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val?.trim() !== '') ||
                  'Please type your Password',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="password"
              class="input-field"
              v-model="formState.confirmPassword"
              label="Confirm Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your Password',
                (val) =>
                  val === formState.newPassword || 'Password not matched',
              ]"
            />
          </div>
          <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-10">
            <div>
              <q-btn
                :loading="loader"
                :disable="loader"
                class="submit-btn"
                label="Save"
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
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  changePasswordRequest,
  GET_USER_DETAIL_GETTER,
} from "@/action/actionTypes";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "ProfileView",

  components: {},

  setup() {
    const $q = useQuasar();
    const loader = ref(false);

    const formState = reactive({
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    });
    const $store = useStore();
    const $router = useRouter();

    // const isLoggedIn = $store.getters[IS_AUTHENTICATED];

    const onSubmit = () => {
      loader.value = true;
      $store.dispatch(changePasswordRequest, {
        payload: { ...formState, userId: getUserGetter.value.userId },
        responseCallback: (status, res) => {
          loader.value = false;
          if (status || res.data) {
            toastMessage(res.message, true);
            $router.push("/");
          } else {
            toastMessage(res.message, false);
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

    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });

    return {
      //states
      formState,
      loader,
      getUserGetter,
      //handlers
      toastMessage,
      onSubmit,
    };
  },
};
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  margin: 0px;
  margin-bottom: 20px;
}
.input-field {
  color: #c36;
  background-color: transparent !important;
}
.q-field__native .q-field--labeled {
  border-radius: 8px !important;
}
.submit-btn {
  width: 100% !important;
  padding: 15px 0;
  border-radius: 15px;
}
</style>
