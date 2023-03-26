<template>
  <div class="row justify-center">
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-10 col-xs-10 q-gutter-y-lg"
    >
      <q-form @submit="handleSubmitVisitor">
        <div class="row justify-start q-col-gutter-md">
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.visitorName"
              label="Visitor's Name *"
              lazy-rules
              class="input-field"
              :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              type="tel"
              class="input-field"
              mask="####-#######"
              hint="ex: 0333-0972217"
              v-model="formState.contactNo"
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
              type="tel"
              mask="#####-#######-#"
              class="input-field"
              v-model="formState.visitorCNIC"
              hint="ex: 42101-7429960-1"
              label="CNIC *"
              lazy-rules
              :rules="[(val) => (val && checkCNIC(val)) || 'Invalid CNIC']"
            />
          </div>

          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.purposeOfVisit"
              label="Purpose to visit"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.deptToVisit"
              label="Department to visit"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.personToVisit"
              label="Person to visit"
              lazy-rules
              class="input-field"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.rfCardNo"
              label="RFID Card Number *"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  (val && val?.length > 1) || 'Rfid card number is required',
              ]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-checkbox
              dense
              v-model="formState.identityReceived"
              label="Visitor's Identity Received"
              color="primary"
            />
          </div>

          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="submit-btn-wrapper">
              <q-btn
                :loading="btnLoader"
                class="submit-btn"
                label="Add Visitor"
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
import { defineComponent, ref } from "vue";
import { checkPhoneMobile, checkCNIC } from "@/constants";
import { useStore } from "vuex";
import moment from "moment";
import { VISITOR_LOGIN_REQUEST } from "@/action/actionTypes";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "AllVisitorsView",

  components: {},

  setup() {
    const $store = useStore();
    const $q = useQuasar();

    let btnLoader = ref(false);

    const initialFormState = {
      visitorName: "",
      contactNo: "",
      visitorCNIC: "",
      purposeOfVisit: "",
      deptToVisit: "",
      personToVisit: "",
      rfCardNo: "",
      identityReceived: false,
      entryDateTime: "",
    };
    let formState = ref(initialFormState);

    const handleSubmitVisitor = () => {
      btnLoader.value = true;
      const payload = {
        ...formState.value,
        entryDateTime: moment().toISOString(),
      };
      console.log({ payload });
      $store.dispatch(VISITOR_LOGIN_REQUEST, {
        payload: {
          data: { ...payload },
        },
        responseCallback: (status, res) => {
          console.log({ status, res });
          toastMessage("New Visitor added", true);
          btnLoader.value = false;
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
      btnLoader,
      //handlers
      toastMessage,
      handleSubmitVisitor,
      checkPhoneMobile,
      checkCNIC,
    };
  },
});
</script>
<style scoped lang="scss"></style>
