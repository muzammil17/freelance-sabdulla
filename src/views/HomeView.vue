<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10 q-gutter-y-lg">
      <h5 class="title">Registration Form</h5>
    </div>
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 q-gutter-y-lg"
    >
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row justify-center q-gutter-y-lg">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.name"
              label="Name *"
              hint="ex: John Doe"
              lazy-rules
              class="input-field"
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="email"
              class="input-field"
              v-model="formState.email"
              label="Email"
              lazy-rules
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="number"
              class="input-field"
              v-model="formState.phonenumber"
              label="Phone Number *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Phone number is required',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="number"
              class="input-field"
              v-model="formState.age"
              label="Age *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Age is required']"
            />
          </div>

          <div class="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-xs-10">
            <div>
              <q-btn
                class="submit-btn"
                label="Register"
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
import { reactive, computed, onBeforeMount, defineComponent } from "vue";
import { useStore } from "vuex";
import {
  // LOGIN_ACTION_REQUEST,
  IS_AUTHENTICATED,
  GET_USER_ALLOWED_MENU_ACTION_REQUEST,
  GET_USER_DETAIL_GETTER,
} from "@/action/actionTypes";

export default defineComponent({
  name: "HomeView",

  components: {},

  setup() {
    const formState = reactive({
      name: "",
      email: "",
      phonenumber: "",
      age: "",
    });
    const $store = useStore();

    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });

    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });

    onBeforeMount(() => {
      console.log("onbeforemounted");
      $store.dispatch(GET_USER_ALLOWED_MENU_ACTION_REQUEST, {
        payload: getUserGetter.value,
        responseCallback: () => {},
      });
    });

    console.log("isLoggedIn", isLoggedIn);
    const onSubmit = (values) => {
      console.log("values", formState, values.target.value);
    };
    console.log("$store", $store);
    return {
      //states
      formState,
      getUserGetter,
      //handlers
      onSubmit,
    };
  },
});
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
