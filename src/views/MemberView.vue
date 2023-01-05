<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10 q-gutter-y-lg">
      <h5 class="title">Membership Form</h5>
    </div>
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 q-gutter-y-lg"
    >
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row justify-center q-gutter-y-lg">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.title"
              label="Membership title *"
              hint="ex: Zakat"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val.length > 0) || 'title is required',
                (val) => (val && val.length <= 50) || 'Limit exceeded',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.firstName"
              label="First Name *"
              hint="ex: John"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val.length > 0) || 'First Name is required',
                (val) => (val && val.length <= 50) || 'Limit exceeded',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.lastName"
              label="Last Name *"
              hint="ex: Doe"
              lazy-rules
              class="input-field"
              :rules="[
                (val) => (val && val.length > 0) || 'Last Name is required',
                (val) => (val && val.length <= 50) || 'Limit exceeded',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              v-model="formState.dob"
              mask="date"
              label="Date of birth *"
              hint="ex: 2000/12/30"
              lazy-rules
              class="input-field"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="formState.dob"
                      :options="
                        (val) =>
                          moment(val).isBefore(
                            moment().format(`YYYY/MM/DD`),
                            `day`
                          )
                      "
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-radio v-model="formState.gender" val="male" label="Male" />
            <q-radio v-model="formState.gender" val="female" label="Female" />
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
              type="tel"
              class="input-field"
              v-model="formState.cnic"
              hint="ex: 18458-7429960-1"
              label="CNIC *"
              lazy-rules
              :rules="[(val) => (val && checkCNIC(val)) || 'Invalid CNIC']"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="tel"
              class="input-field"
              v-model="formState.phoneLandline"
              hint="ex: 317-14069692"
              label="Phone Landline *"
              lazy-rules
              :rules="[
                (val) =>
                  !val || checkPhoneLandline(val) || 'Invalid Landline number',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="tel"
              class="input-field"
              hint="ex: 4833-0972217"
              v-model="formState.phoneMobile"
              label="Mobile Number *"
              lazy-rules
              :rules="[
                (val) =>
                  !val || checkPhoneMobile(val) || 'Invalid Mobile number',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="text"
              class="input-field"
              v-model="formState.address1"
              label="Address 1 *"
              lazy-rules
              :rules="[
                (val) => (val && val?.length) || 'Address 1 is required',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="text"
              class="input-field"
              v-model="formState.address2"
              label="Address 2 *"
              lazy-rules
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              filled
              type="text"
              class="input-field"
              v-model="formState.area"
              label="Area *"
              lazy-rules
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
import { reactive, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { IS_AUTHENTICATED, GET_USER_DETAIS_GETTER } from "@/action/actionTypes";
import {
  checkPhoneMobile,
  checkPhoneLandline,
  checkCNIC,
} from "@/constants/index";
import moment from "moment";

export default defineComponent({
  name: "MemberView",

  components: {},

  setup() {
    const formState = reactive({
      title: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      cnic: "",
      email: "",
      phoneLandline: "",
      phoneMobile: "",
      address1: "",
      address2: "",
      cityId: "",
      areaId: "",
      area: "",
      referencId: "",
      currentUserId: "",
    });
    const $store = useStore();

    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });

    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIS_GETTER];
    });

    console.log("isLoggedIn", isLoggedIn);
    const onSubmit = (values) => {
      console.log("values", formState, values.target.value);
    };
    return {
      //states
      formState,
      getUserGetter,
      moment,

      //handlers
      onSubmit,
      checkPhoneMobile,
      checkPhoneLandline,
      checkCNIC,
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
