<template>
  <div class="row justify-center">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <!-- <h5 class="title">WELCOME TO ADMIN DASHBOARD</h5> -->
      <q-form @submit="handleCreateProgram">
        <div class="row justify-start q-col-gutter-md">
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <q-select
              outlined
              label="Parent Program *"
              hint="ex: Select a Parent Program"
              lazy-rules
              v-model="formState.parentProgram"
              :clearable="true"
              behavior="menu"
              :options="parentProgramsOptions"
              class="input-field"
              @update:model-value="handleChange"
              @clear="handleClear"
              :rules="[
                (val) => !val || val,
                // (val) => !val || 'Parent Program is required',
              ]"
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
              :disable="formState.parentProgram ? false : true"
              label="Is Detail?"
              color="primary"
              v-model="formState.isDetail"
            />
          </div>

          <!-- :class="
              !formState.isDetail
                ? 'hidden'
                : 'col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-12'
            " -->
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
              :options="billCycleOptions"
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
            <q-input
              v-model="formState.standardPrice"
              outlined
              label="Standard Price *"
              hint="ex: Program Price"
              lazy-rules
              class="input-field"
              :rules="[
                (val) =>
                  !formState.isDetail ||
                  (formState.isDetail && val) ||
                  'Price is required',
              ]"
            />
          </div>
          <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
            <div class="submit-btn-wrapper">
              <q-btn
                class="submit-btn"
                label="Create Program"
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

export default defineComponent({
  name: "CreateProgramView",

  components: {},

  setup() {
    let formState = ref({
      isDetail: false,
      progDesc: null,
      progDetailDesc: "",
      standardPrice: null,
      parentProgram: null,
      billCycle: null,
    });

    const handleCreateProgram = (values) => {
      console.log({ values });
    };

    const handleClear = () => {
      formState.value.isDetail = false;
    };
    const handleChange = (val) => {
      if (val) {
        formState.value.isDetail = true;
      }
    };

    return {
      //states
      parentProgramsOptions: [
        { value: 1, label: "Program 1" },
        { value: 2, label: "Program 2" },
        { value: 3, label: "Program 3" },
        { value: 4, label: "Program 4" },
      ],
      billCycleOptions: [
        { value: 1, label: "Bill cycle 1" },
        { value: 2, label: "Bill cycle 2" },
        { value: 3, label: "Bill cycle 3" },
        { value: 4, label: "Bill cycle 4" },
      ],
      formState,

      //handlers
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
