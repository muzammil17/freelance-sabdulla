<template>
  <div class="row justify-center">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <!-- <h5 class="title">WELCOME TO ADMIN DASHBOARD</h5> -->
      <q-form @submit="handleCreateProgram">
        <div class="row justify-start q-col-gutter-md">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-select
              outlined
              label="Parent Program"
              hint="ex: Select a Parent Program"
              lazy-rules
              v-model="formState.parentProgId"
              :clearable="true"
              behavior="menu"
              :options="
                params?.progId
                  ? getAllProgramsGetter.filter(
                      (dt) => dt?.progId != params?.progId
                    )
                  : getAllProgramsGetter
              "
              class="input-field"
              @update:model-value="handleChange"
              @clear="handleClear"
              :rules="[(val) => !val || val]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.progDesc"
              label="Program Description *"
              hint="ex: Program description"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Program description is required',
              ]"
            />
          </div>
          <div class="col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12">
            <q-input
              outlined
              v-model="formState.progDetailDesc"
              label="Program Detail Description *"
              hint="ex: Program detail description"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Program detail description is required',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-toggle
              :disable="formState.parentProgId ? false : true"
              label="Is Detail?"
              color="primary"
              v-model="formState.isDetail"
            />
          </div>

          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-toggle
              :label="formState.progActive ? 'Active' : 'In Active'"
              color="primary"
              v-model="formState.progActive"
            />
          </div>

          <div
            :class="
              !formState.isDetail
                ? 'hidden'
                : 'col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12'
            "
          >
            <q-select
              outlined
              label="Bill Cycle *"
              hint="ex: Program detail description"
              lazy-rules
              behavior="menu"
              class="input-field"
              :options="getBillCyclesGetter"
              v-model="formState.billCycle"
              :rules="[
                (val) =>
                  !formState.isDetail ||
                  (formState.isDetail && val) ||
                  'Bill cycle is required',
              ]"
            />
          </div>

          <div
            :class="
              !formState.isDetail
                ? 'col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 hidden'
                : 'col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12'
            "
          >
            <!-- type="number" -->
            <q-input
              v-model="formState.standardPrice"
              outlined
              type="number"
              label="Standard Price *"
              hint="ex: Program Price"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  !formState.isDetail ||
                  (formState.isDetail && val && val > 0) ||
                  'Price is required',
                (val) =>
                  !formState.isDetail ||
                  (formState.isDetail && !isNaN(val) && val > 0) ||
                  'Price is Invalid',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="submit-btn-wrapper">
              <q-btn
                :loading="createProgLoader"
                class="submit-btn"
                :label="params?.progId ? 'Update Program' : 'Create Program'"
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
  GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION,
  SAVE_PROGRAM_REQUEST,
  GET_BILLING_CYCLES_REQUEST,
  GET_BILLING_CYCLES_GETT,
  GET_ALL_PROGRAMS_REQUEST,
  GET_PROGRAMS_GETT,
} from "@/action/actionTypes";
import { useQuasar } from "quasar";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "CreateProgramView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    const params = $router.currentRoute.value.params;

    const createProgLoader = ref(false);

    const initialFormState = {
      isDetail: false,
      progDesc: null,
      progDetailDesc: "",
      standardPrice: null,
      parentProgId: null,
      billCycle: null,
      progActive: true,
    };
    let formState = ref({
      isDetail: false,
      progDesc: null,
      progDetailDesc: "",
      standardPrice: null,
      parentProgId: null,
      billCycle: null,
      progActive: true,
    });

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log("onbeforemounted");

      $store.dispatch(GET_ALL_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: null },
        responseCallback: () => {},
      });

      $store.dispatch(GET_BILLING_CYCLES_REQUEST, {
        payload: { activeOnly: true },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    const getProgramsOptionsListGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION];
    });

    const getAllProgramsGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_GETT];
    });

    watch(getAllProgramsGetter, (currentVal) => {
      if (params?.progId) {
        const currentProg = getAllProgramsGetter.value?.find(
          (dt) => dt?.progId == params?.progId
        );

        const getParentProg = getAllProgramsGetter.value?.find(
          (dt) => dt?.progId == currentProg?.parentProgId
        );
        formState.value.parentProgId = currentProg?.parentProgId
          ? {
              label: getParentProg?.progDesc || getParentProg?.progDetailDesc,
              value: getParentProg?.value,
            }
          : null;
        formState.value.progDesc = currentProg.progDesc;
        formState.value.progDetailDesc = currentProg.progDetailDesc;
        formState.value.isDetail = currentProg.isDetail;
        formState.value.progActive = currentProg.progActive;
        formState.value.billCycle = currentProg?.billCycle || null;
        formState.value.billCycle = currentProg?.billCycle || null;
        formState.value.standardPrice = currentProg?.standardPrice || null;

        console.log({ currentVal });
      }
    });

    const handleCreateProgram = () => {
      createProgLoader.value = true;
      const {
        billCycle,
        isDetail,
        parentProgId,
        progActive,
        progDesc,
        progDetailDesc,
        standardPrice,
      } = formState.value;
      console.log({ parentProgId });
      const payload = {
        ...(params?.progId ? { progId: Number(params?.progId) } : {}),
        ...(parentProgId?.value
          ? {
              parentProgDesc: parentProgId.progDesc,
              parentProgId: parentProgId?.value,
              programLevel: parentProgId?.programLevel,
            }
          : {}),
        isDetail,
        progActive,
        progDesc,
        progDetailDesc,
        ...(isDetail
          ? {
              standardPrice: Number(standardPrice),
              billCycleDesc: billCycle?.label,
              billCycleId: billCycle.value,
            }
          : {}),
      };

      $store.dispatch(SAVE_PROGRAM_REQUEST, {
        payload: {
          payloadData: payload,
          existing: params?.progId ? true : false,
        },
        responseCallback: (status, res) => {
          console.log({ status }, { res });
          createProgLoader.value = false;
          if (status) {
            if (!params?.progId) {
              formState.value.parentProgId = null;
              formState.value.isDetail = false;
            }

            toastMessage(
              params?.progId
                ? "Program has been Updated"
                : "Program has been Created",
              true
            );
          } else {
            toastMessage("Something went wrong", false);
          }
        },
      });
      console.log({ payload });
    };

    const handleClear = () => {
      formState.value.isDetail = false;
    };
    const handleChange = (val) => {
      if (val) {
        formState.value.isDetail = true;
      }
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

    const getBillCyclesGetter = computed(() => {
      return $store.getters[GET_BILLING_CYCLES_GETT];
    });

    return {
      //states
      params,
      getAllProgramsGetter,
      getBillCyclesGetter,
      initialFormState,
      createProgLoader,
      formState,
      getProgramsOptionsListGetter,
      //handlers
      toastMessage,
      handleClear,
      handleChange,
      handleCreateProgram,
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
}
</style>
