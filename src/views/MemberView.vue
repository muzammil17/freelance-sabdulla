<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-8 col-xs-10">
      <h5 class="title">
        {{
          EDIT_MEMBER_URL.title === pageName
            ? "Update Member Details"
            : "Membership Form"
        }}
      </h5>
    </div>
    <div class="col-lg-10 col-xl-10 col-md-11 col-sm-10 col-xs-11 q-mb-lg">
      <q-form @submit="onSubmit">
        <div class="row justify-start q-col-gutter-sm">
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-select
              label="Membership Title *"
              outlined
              aria-modal="false"
              behavior="menu"
              v-model="formState.title"
              :options="titlesOptions"
              :rules="[(val) => val || 'title is required']"
            />
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
              label="Membership type *"
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
                (val) => (val && val.length <= 20) || 'Limit exceeded',
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
                (val) => (val && val.length <= 20) || 'Limit exceeded',
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
              mask="#####-#######-#"
              class="input-field"
              v-model="formState.cnic"
              hint="ex: 42101-7429960-1"
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
              mask="###-########"
              hint="ex: 021-34569692"
              label="Phone Landline"
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
              mask="####-#######"
              hint="ex: 0333-0972217"
              v-model="formState.phoneMobile"
              label="Mobile Number *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && checkPhoneMobile(val)) || 'Invalid Mobile number',
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
              label="Address 2"
              lazy-rules
            />
          </div>

          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-select
              label="City *"
              outlined
              aria-modal="false"
              behavior="menu"
              v-model="formState.cityId"
              :options="citiesOptions"
              :rules="[(val) => val || 'City  is required']"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-select
              label="Area *"
              outlined
              aria-modal="false"
              behavior="menu"
              v-model="formState.areaId"
              :options="areasOptions"
              :rules="[(val) => val || 'Area zone  is required']"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <h5 class="text-h6 text-left q-mb-none">Emergency Contact</h5>
          </div>

          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.emergencyContactName"
              label="Name"
              lazy-rules
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="tel"
              class="input-field"
              mask="####-#######"
              hint="ex: 0333-0972217"
              v-model="formState.emergencyNumber"
              label="Emergency Mobile Number *"
              lazy-rules
              :rules="[
                (val) =>
                  !val ||
                  (val && checkPhoneMobile(val)) ||
                  'Invalid Mobile number',
              ]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="text"
              class="input-field"
              v-model="formState.relation"
              label="Relation"
              lazy-rules
            />
          </div>

          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="submit-btn-wrapper">
              <q-btn
                :loading="loader"
                class="submit-btn"
                :label="
                  EDIT_MEMBER_URL.title === pageName
                    ? 'Edit Member'
                    : 'Add Member'
                "
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
  computed,
  defineComponent,
  onMounted,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import {
  GET_USER_DETAIL_GETTER,
  GET_MEMBER_TYPES_REQUEST,
  GET_MEMBER_TYPES,
  SAVE_MEMBER_REQUEST,
  GET_MEMBERS_LIST_GETT,
  GET_CITIES_REQUEST,
  GET_CITIES_GETT,
  GET_AREAS_REQUEST,
  GET_AREAS_GETT,
  GET_MEMBER_DETAIL_REQUEST,
  GET_MEMBER_TITLES_REQUEST,
} from "@/action/actionTypes";
import {
  checkPhoneMobile,
  checkPhoneLandline,
  checkCNIC,
  EDIT_MEMBER_URL,
} from "@/constants/index";
import moment from "moment";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MemberView",

  components: {},

  setup() {
    const initialState = ref({
      title: "",
      relation: "",
      emergencyContactName: "",
      emergencyNumber: "",
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
      referencId: "",
      membershipTypeId: null,
    });

    let citiesOptions = ref(null);
    let areasOptions = ref(null);
    let titlesOptions = ref(null);

    const formState = ref({ ...initialState.value });

    const $store = useStore();
    const $router = useRouter();
    const pageName = $router.currentRoute.value.name;
    const memberId = $router.currentRoute.value.params.memberId;

    const $q = useQuasar();

    let memberShipTypesOptions = ref(null);
    let loader = ref(false);

    onBeforeMount(() => {
      console.log("onbeforemounted");
      $store.dispatch(GET_MEMBER_TYPES_REQUEST, {
        payload: true,
        responseCallback: () => {},
      });
      if (memberId) {
        $store.dispatch(GET_MEMBER_DETAIL_REQUEST, {
          payload: { memberId },
          responseCallback: () => {},
        });
      }

      $store.dispatch(GET_CITIES_REQUEST, {
        payload: true,
        responseCallback: (status, res) => {
          console.log({ res }, { status });
          if (status) {
            let options = [];
            console.log("res", res);
            if (res?.data?.length) {
              for (const item of res?.data) {
                options.push({ value: item?.cityId, label: item?.cityName });
              }
            }
            citiesOptions.value = options;
          }
        },
      });

      $store.dispatch(GET_MEMBER_TITLES_REQUEST, {
        payload: true,
        responseCallback: (status, res) => {
          console.log({ res }, { status });
          if (status) {
            let options = [];
            console.log("res", res);
            if (res?.data?.length) {
              for (const item of res?.data) {
                options.push({ label: item, value: item });
              }
            }
            titlesOptions.value = options;
          }
        },
      });
    });

    onMounted(() => {
      if (pageName === EDIT_MEMBER_URL.title) {
        if (!getMemberListGetter?.value) {
          $router.back();
        } else {
          let memberList = JSON.parse(
            JSON.stringify(Object.values(getMemberListGetter?.value))
          );
          let editMemberObj = memberList?.find(
            (dt) => dt?.memberId == memberId
          );
          console.log({ editMemberObj }, memberList);
          if (editMemberObj) {
            console.log({ editMemberObj });

            let setMember = { ...editMemberObj };
            setMember.membershipTypeId = {
              label: editMemberObj?.membershipTypeDesc,
              value: editMemberObj?.membershipTypeId,
            };
            setMember.cityId = {
              value: editMemberObj.cityId,
              label: editMemberObj?.cityName,
            };

            setMember.areaId = {
              value: editMemberObj.areaId,
              label: editMemberObj?.areaName,
            };
            setMember.title = {
              value: editMemberObj.title,
              label: editMemberObj?.title,
            };
            setMember.gender = editMemberObj.gender.toLowerCase();
            formState.value = setMember;
            $store.dispatch(GET_AREAS_REQUEST, {
              payload: { isActive: true, cityId: editMemberObj.cityId },
              responseCallback: (status, res) => {
                if (status && res?.data) {
                  console.log("res", res);

                  let options = [];
                  console.log("res", res);
                  if (res?.data?.length) {
                    for (const item of res?.data) {
                      options.push({
                        value: item?.areaId,
                        label: item?.areaName,
                      });
                    }
                  }

                  areasOptions.value = options;
                }
              },
            });
          }
        }
      }
    });

    const getMemberTypesGetter = computed(() => {
      return $store.getters[GET_MEMBER_TYPES];
    });

    const getMemberListGetter = computed(() => {
      return $store.getters[GET_MEMBERS_LIST_GETT];
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

    //watcher cities

    watch(formState.value, (currentVal, prev) => {
      if (
        currentVal.cityId &&
        currentVal.cityId?.value === prev.cityId?.value
      ) {
        $store.dispatch(GET_AREAS_REQUEST, {
          payload: { isActive: true, cityId: currentVal.cityId?.value },
          responseCallback: (status, res) => {
            if (status && res?.data) {
              console.log("res", res);

              let options = [];
              console.log("res", res);
              if (res?.data?.length) {
                for (const item of res?.data) {
                  options.push({
                    value: item?.areaId,
                    label: item?.areaName,
                  });
                }
              }
              const ifExist = options?.find(
                (dt) => dt?.value === currentVal.areaId?.value
              );
              if (!ifExist) {
                formState.value = { ...formState.value, areaId: null };
              }
              areasOptions.value = options;
            }
          },
        });
      }
    });
    //watcher cities

    const getUserGetter = computed(() => {
      return $store.getters[GET_USER_DETAIL_GETTER];
    });

    const getCitiesGetter = computed(() => {
      return $store.getters[GET_CITIES_GETT];
    });
    const getAreasGetter = computed(() => {
      return $store.getters[GET_AREAS_GETT];
    });

    const onSubmit = () => {
      loader.value = true;
      let payloadObj = {
        ...formState.value,
        title: formState.value.title.value,
        ...(EDIT_MEMBER_URL.title === pageName
          ? { memberId: Number(memberId) }
          : {}),
        dob: formState.value.dob.replaceAll("/", "-"),
        membershipTypeId: formState.value.membershipTypeId.value,
        membershipTypeDesc: formState.value.membershipTypeId.label,
        cityId: formState.value.cityId?.value,
        cityName: formState.value.cityId?.label,
        areaId: formState.value.areaId?.value,
        areaName: formState?.value?.areaId?.label,
      };

      Object.keys(payloadObj).forEach((key) => {
        if (!payloadObj[key]) {
          delete payloadObj[key];
        }
      });

      $store.dispatch(SAVE_MEMBER_REQUEST, {
        payload: {
          data: payloadObj,
          bool: EDIT_MEMBER_URL.title === pageName ? true : false,
        },
        responseCallback: (status, res) => {
          Object.assign(formState.value, {
            ...initialState,
          });
          console.log({ res });
          loader.value = false;
          if (status) {
            if (EDIT_MEMBER_URL.title !== pageName) {
              // formState.value = { ...initialState.value };
            }
            toastMessage(
              `Form ${
                EDIT_MEMBER_URL.title === pageName ? "updated" : "submitted"
              } successfully`,
              status
            );
          } else {
            toastMessage("Something went wrong", status);
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

    return {
      //states
      formState,
      titlesOptions,
      getUserGetter,
      moment,
      memberShipTypesOptions,
      genderOptions: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      loader,
      getMemberListGetter,
      pageName,
      getCitiesGetter,
      citiesOptions,
      getAreasGetter,
      areasOptions,
      EDIT_MEMBER_URL,
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
.submit-btn-wrapper {
  display: flex;
  justify-content: center;
}
.submit-btn {
  width: 50% !important;
  padding: 15px 0;
  border-radius: 15px;
  @media only screen and (max-width: 380px) {
    width: 90% !important;
  }
}
</style>
