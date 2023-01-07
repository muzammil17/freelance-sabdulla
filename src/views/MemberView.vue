<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10 q-gutter-y-lg">
      <h5 class="title">Membership Form</h5>
    </div>
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 q-gutter-y-lg"
    >
      <q-form @submit="onSubmit">
        <div class="row justify-center q-gutter-sm">
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.referencId"
              label="Reference"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-select
              label="Membership type"
              outlined
              aria-modal="false"
              behavior="menu"
              v-model="formState.membershipTypeId"
              :options="memberShipTypesOptions"
              :rules="[(val) => val || 'MemberShip type is required']"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.dob"
              mask="date"
              label="Date of birth"
              hint="ex: 2000/12/30"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  !val ||
                  moment(val).isBefore(moment().format(`YYYY/MM/DD`), `day`) ||
                  'DOB is invalid',
              ]"
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-option-group
              inline
              name="gender"
              :options="genderOptions"
              type="radio"
              v-model="formState.gender"
              :rules="[(val) => val || 'Gender is required']"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="email"
              class="input-field"
              v-model="formState.email"
              label="Email"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="tel"
              class="input-field"
              v-model="formState.cnic"
              hint="ex: 18458-7429960-1"
              label="CNIC *"
              lazy-rules
              :rules="[(val) => (val && checkCNIC(val)) || 'Invalid CNIC']"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
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
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.address2"
              label="Address 2 *"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.area"
              label="Area *"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.areaId"
              label="Area type *"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.cityId"
              label="City type *"
              lazy-rules
            />
          </div>

          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
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
import {
  reactive,
  computed,
  defineComponent,
  // onMounted,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import {
  IS_AUTHENTICATED,
  GET_USER_DETAIL_GETTER,
  GET_MEMBER_TYPES_REQUEST,
  GET_MEMBER_TYPES,
  SAVE_MEMBER_REQUEST,
} from "@/action/actionTypes";
import {
  checkPhoneMobile,
  checkPhoneLandline,
  checkCNIC,
} from "@/constants/index";
import moment from "moment";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MemberView",

  components: {},

  setup() {
    const initialState = {
      title: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "male",
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
      membershipTypeId: null,
    };
    const formState = reactive({
      title: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "male",
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
      membershipTypeId: null,
    });
    const $store = useStore();
    const $q = useQuasar();

    let memberShipTypesOptions = ref(null);

    onBeforeMount(() => {
      console.log("onbeforemounted");
      $store.dispatch(GET_MEMBER_TYPES_REQUEST, {
        payload: true,
        responseCallback: () => {},
      });
    });
    const getMemberTypesGetter = computed(() => {
      return $store.getters[GET_MEMBER_TYPES];
    });

    watch(getMemberTypesGetter, (currentVal) => {
      let options = currentVal?.map((item) => {
        return {
          value: item?.membershipTypeId,
          label: item?.membershipTypeDesc,
        };
      });
      memberShipTypesOptions.value = options;
    });

    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });

    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });

    console.log("isLoggedIn", isLoggedIn);
    const onSubmit = () => {
      let payloadObj = {
        ...formState,
        dob: formState.dob.replaceAll("/", "-"),
        membershipTypeId: formState.membershipTypeId.value,
      };
      Object.keys(payloadObj).forEach((key) => {
        if (!payloadObj[key]) {
          delete payloadObj[key];
        }
      });
      $store.dispatch(SAVE_MEMBER_REQUEST, {
        payload: payloadObj,
        responseCallback: (status) => {
          Object.assign(formState, {
            ...initialState,
          });
          if (status) {
            toastMessage("Form submitted successfully", status);
          } else {
            toastMessage("Something went wrong", status);
          }
        },
      });
      console.log("values", formState, getUserGetter.value);
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

    return {
      //states
      formState,
      getUserGetter,
      moment,
      memberShipTypesOptions,
      genderOptions: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
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
