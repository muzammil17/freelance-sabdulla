<template>
  <div class="row">
    <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row justify-end">
        <div class="q-px-lg q-mt-md">
          <q-btn
            label="Add new program"
            color="primary"
            @click="$router.push(VIEW_CREATE_PROGRAM_URL.url)"
            v-if="allowed.createProgram"
          />
        </div>
      </div>
    </div>
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-px-lg q-my-lg"
    >
      <q-input
        class="full-width"
        ref="filterRef"
        outlined
        v-model="filter"
        label="Filter Programs"
      >
        <template v-slot:append>
          <q-icon
            v-if="filter !== ''"
            name="clear"
            class="cursor-pointer"
            @click="filter = ''"
          />
        </template>
      </q-input>
    </div>
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 q-px-lg row align-center"
    >
      <h6 class="text-h6 q-my-none text-left">Program Selected:</h6>
      <p
        class="text-h6 text-primary text-left q-mb-none q-ml-xs"
        v-if="selected"
      >
        {{
          `${
            getAllProgramsGetter?.find((dt) => dt?.progId == selected)?.progDesc
          } (Prog. ${
            getAllProgramsGetter?.find((dt) => dt?.progId == selected).progId
          })` || ""
        }}
      </p>
    </div>

    <div
      class="col-12 col-md-6 q-px-lg q-mt-md"
      :class="allowed.updateProgram ? '' : 'col-md-12'"
    >
      <q-tree
        :filter="filter"
        icon="ion-arrow-forward"
        color="primary"
        :nodes="getProgramTreeGetter"
        node-key="value"
        accordion
        v-model:selected="selected"
        @update:selected="handleClick"
      />
      <!-- v-model:selected="selected" -->
    </div>
    <div
      class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12 q-px-lg q-mt-lg"
      v-if="selected && allowed.updateProgram"
    >
      <div class="row justify-center">
        <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
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
                    selected
                      ? getAllProgramsGetter.filter(
                          (dt) => dt?.progId != selected
                        )
                      : getAllProgramsGetter
                  "
                  class="input-field"
                  @update:model-value="handleChange"
                  @clear="handleClear"
                  :rules="[(val) => !val || val]"
                />
              </div>
              <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formState.progDesc"
                  label="Program Description *"
                  hint="ex: Program description"
                  lazy-rules
                  class="input-field"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Program description is required',
                  ]"
                />
              </div>
              <div class="col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12">
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
                    : 'col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12'
                "
              >
                <q-select
                  outlined
                  label="Bill Cycle *"
                  hint="ex: bill cycle"
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
                    ? 'col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12 hidden'
                    : 'col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12'
                "
              >
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
                    label="Update Program"
                    type="submit"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import {
  GET_ALL_PROGRAMS_REQUEST,
  GET_PROGRAMS_TREE_GETT,
  GET_PROGRAMS_GETT,
  GET_BILLING_CYCLES_REQUEST,
  GET_BILLING_CYCLES_GETT,
  SAVE_PROGRAM_REQUEST,
  GET_USER_ALLOWED_MENUS_GETT,
} from "@/action/actionTypes";
// import { useRouter } from "vue-router";
import { ALL_ROUTES, VIEW_CREATE_PROGRAM_URL } from "@/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AllProgramView",

  components: {},

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const filter = ref("");

    const $router = useRouter();
    const currentRoute = $router.currentRoute.value;

    // allowed actions
    const allowed = ref({
      createProgram: false,
      updateProgram: false,
    });

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
    const createProgLoader = ref(false);

    const expanded = ref([]);
    // const selectedProg = ref(null);

    const selected = ref(null);

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      handleGetAllProgs();

      $store.dispatch(GET_BILLING_CYCLES_REQUEST, {
        payload: { activeOnly: true },
        responseCallback: () => {
          $q.loading.hide();
        },
      });

      handleAllowedActions();
    });

    const handleGetAllProgs = () => {
      $store.dispatch(GET_ALL_PROGRAMS_REQUEST, {
        payload: { activeOnly: true, parentProgId: null },
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    };

    watch(selected, (currentVal) => {
      console.log({ currentVal });

      if (selected.value) {
        const currentProg = getAllProgramsGetter.value?.find(
          (dt) => dt?.progId == selected.value
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
        if (currentProg?.billCycleId) {
          formState.value.billCycle = {
            label: currentProg?.billCycleDesc,
            value: currentProg?.billCycleId,
          };
        } else {
          formState.value.billCycle = null;
        }
        formState.value.standardPrice = currentProg?.standardPrice || null;
      }
    });

    const getProgramTreeGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_TREE_GETT];
    });

    const getAllProgramsGetter = computed(() => {
      return $store.getters[GET_PROGRAMS_GETT];
    });
    const getBillCyclesGetter = computed(() => {
      return $store.getters[GET_BILLING_CYCLES_GETT];
    });

    const getUserAllowedMenusGetter = computed(() => {
      return $store.getters[GET_USER_ALLOWED_MENUS_GETT];
    });

    // GET_PROGRAMS_TREE_GETT

    const selectedProg = (node, filter) => {
      const filt = filter.toLowerCase();
      return node.label && node.label.toLowerCase().indexOf(filt) > -1;
    };
    const filterMethod = (val) => {
      console.log({ val });
    };

    const handleRoute = () => {
      console.log(expanded.value);
      // $router.push(VIEW_UPDATE_PROGRAM_URL.url.replace(":progId", id));
    };
    const handleClick = (e) => {
      console.log({ e });
    };

    const handleClear = () => {
      formState.value.isDetail = false;
    };
    const handleChange = (val) => {
      if (val) {
        formState.value.isDetail = true;
      }
    };

    const handleAllowedActions = () => {
      const findRoute = ALL_ROUTES?.find(
        (dt) =>
          dt?.url !== "/" &&
          (dt?.view?.includes(currentRoute.matched[0].path) ||
            dt?.create?.includes(currentRoute?.matched[0].path) ||
            dt?.update?.includes(currentRoute?.matched[0].path) ||
            dt?.delete?.includes(currentRoute?.matched[0].path) ||
            dt?.print?.includes(currentRoute?.matched[0].path))
      );
      const menuFind = getUserAllowedMenusGetter.value?.find(
        (dt) =>
          dt?.menuUrl !== "/" &&
          (findRoute?.view?.includes(dt?.menuUrl) ||
            findRoute?.create?.includes(dt?.menuUrl) ||
            findRoute?.update?.includes(dt?.menuUrl) ||
            findRoute?.delete?.includes(dt?.menuUrl) ||
            findRoute?.print?.includes(dt?.menuUrl))
      );
      if (menuFind) {
        for (const item of menuFind?.accessMenu) {
          // if (item?.accessTypeId === 1) {
          //   allowed.value.viewCollection = true;
          // }
          if (item?.accessTypeId === 3) {
            allowed.value.createProgram = true;
          } else if (item?.accessTypeId === 2) {
            // if (findRoute?.update?.includes(currentRoute?.matched[0].path)) {
            allowed.value.updateProgram = true;
            // }
          }
          //  else if (item?.accessTypeId === 4) {
          //   allowed.value.printCollection = true;
          // } else if (item?.accessTypeId === 5) {
          //   allowed.value.deleteCollection = true;
          // }
        }
      }
    };

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
        progId: Number(selected.value),
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

          existing: true,
        },
        responseCallback: (status, res) => {
          console.log({ status }, { res });
          createProgLoader.value = false;
          if (status) {
            toastMessage("Program has been Updated", true);
            $q.loading.show({
              delay: 400, // ms
            });
            handleGetAllProgs();
          } else {
            toastMessage("Something went wrong", false);
          }
        },
      });
      console.log({ payload });
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
      filter,
      initialFormState,
      formState,
      getAllProgramsGetter,
      getProgramTreeGetter,
      selected,
      expanded,
      getBillCyclesGetter,
      createProgLoader,
      allowed,
      VIEW_CREATE_PROGRAM_URL,

      //handlers
      handleClear,
      handleChange,
      toastMessage,
      handleCreateProgram,
      selectedProg,
      filterMethod,
      handleClick,
      handleRoute,
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  margin: 0px;
  text-align: center;
}
</style>
