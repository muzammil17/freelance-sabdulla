<template>
  <div class="row justify-center">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-mb-sm">
      <q-btn
        flat
        round
        icon="ion-arrow-back"
        size="lg"
        color="primary"
        @click="$router.back()"
      />
    </div>
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-10 col-xs-11">
      <div class="row justify-start q-col-gutter-sm">
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Membership title</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.title }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">First Name</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.firstName }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Last Name</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.lastName }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Reference</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.referencId }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Membership type</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.membershipTypeDesc }}
          </p>
        </div>

        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Date of Birth</h6>
          <p class="text-body2">
            {{ moment(getMemberDetailGetter?.dob).format("LL") }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Gender</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.gender }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Email</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.email }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">CNIC</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.cnic }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Phone Landline</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.phoneLandline }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Phone Mobile</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.phoneMobile }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Address No1</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.address1 }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Address No2</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.address2 }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">City</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.cityName }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">Area</h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.areaName }}
          </p>
        </div>

        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">
            Emergency Contact Name
          </h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.emergencyContactName }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">
            Emergency Contact Number
          </h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.emergencyContactNo }}
          </p>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12">
          <h6 class="text-subtitle1 text-primary q-my-xs">
            Emergency Contact Relation
          </h6>
          <p class="text-body2">
            {{ getMemberDetailGetter?.emergencyContactRelation }}
          </p>
        </div>

        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <q-table
            title="Member Programs"
            dense
            title-class="text-primary"
            table-header-class="text-primary"
            class="table-header-wrapper"
            row-key="name"
            :columns="memberProgramsColumns"
            :rows="getMemberProgramsGetter"
          />
        </div>
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <q-table
            title="Member Payments"
            dense
            title-class="text-primary"
            table-header-class="text-primary"
            class="table-header-wrapper"
            row-key="name"
            :columns="memberPaymentsColumns"
            :rows="getMemberPaymentsGetter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
import {
  GET_MEMBER_DETAIL_REQUEST,
  GET_MEMBER_PROGRAMS_REQUEST,
  GET_MEMBER_PAYMENTS_REQUEST,
  GET_MEMBERS_DETAIL_GETT,
  GET_MEMBER_PROGRAMS_GETT,
  GET_MEMBER_PAYMENTS_GETT,
} from "@/action/actionTypes";
import { memberProgramsColumns, memberPaymentsColumns } from "@/constants";

import moment from "moment";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MemberView",

  components: {},

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const memberId = $router.currentRoute.value.params;
    const $q = useQuasar();

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log({ memberId });
      $store.dispatch(GET_MEMBER_DETAIL_REQUEST, {
        payload: { memberId: memberId?.memberId },
        responseCallback: (status) => {
          if (!status) {
            $q.loading.hide();
          }
        },
      });

      $store.dispatch(GET_MEMBER_PROGRAMS_REQUEST, {
        payload: { memberId: memberId?.memberId },
        responseCallback: (status) => {
          if (!status) {
            $q.loading.hide();
          }
        },
      });
      $store.dispatch(GET_MEMBER_PAYMENTS_REQUEST, {
        payload: { memberId: memberId?.memberId },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    // const isLoggedIn = computed(() => {
    //   return $store.getters[IS_AUTHENTICATED];
    // });

    const getMemberDetailGetter = computed(() => {
      return $store.getters[GET_MEMBERS_DETAIL_GETT];
    });

    const getMemberProgramsGetter = computed(() => {
      return $store.getters[GET_MEMBER_PROGRAMS_GETT];
    });

    const getMemberPaymentsGetter = computed(() => {
      return $store.getters[GET_MEMBER_PAYMENTS_GETT];
    });

    return {
      //states
      $q,
      memberPaymentsColumns,
      getMemberDetailGetter,
      moment,
      getMemberProgramsGetter,
      getMemberPaymentsGetter,
      memberProgramsColumns,

      //handlers
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
