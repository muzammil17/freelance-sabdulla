<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10 q-gutter-y-lg">
      <h5 class="title">Login</h5>
    </div>
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 q-gutter-y-lg"
    >
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row justify-center items-center q-gutter-y-lg">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.userId"
              label="Your User Id *"
              hint="User identity number"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="password"
              v-model="formState.pwd"
              label="Your Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your Password',
              ]"
            />
          </div>
          <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-10">
            <div>
              <q-btn
                class="submit-btn"
                label="Submit"
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
import { reactive } from "vue";
import { useStore } from "vuex";
import {
  // LOGIN_ACTION_REQUEST,
  LOGIN_SUCCESS,
  IS_AUTHENTICATED,
} from "@/action/actionTypes";

export default {
  name: "LoginView",

  components: {},

  setup() {
    const formState = reactive({
      userId: "",
      pwd: "",
    });
    const $store = useStore();
    const isLoggedIn = $store.getters[IS_AUTHENTICATED];
    console.log("isLoggedIn", isLoggedIn);
    const onSubmit = (values) => {
      console.log("values", formState, values.target.value);
      //   $store.dispatch(LOGIN_ACTION_REQUEST, {
      //     payload: formState,
      //     responseCallback: () => {},
      //   });
      $store.commit(LOGIN_SUCCESS, { data: "user" });
    };
    console.log("$store", $store);
    return {
      //states
      formState,
      //handlers
      onSubmit,
    };
  },
};
</script>
<style scoped lang="scss">
// .login-wrapper {
//   display: flex !important;
//   align-items: center;
//   width: 100%;
//   span {
//     display: flex;
//     width: 60% !important;
//   }
// }
.title {
  text-align: center;
  margin: 0px;
  margin-bottom: 20px;
}
.q-field--filled {
  color: #c36;
  //   background-color: rgb(163, 129, 140);
}
.submit-btn {
  width: 100% !important;
  padding: 15px 0;
  border-radius: 15px;
}
</style>
