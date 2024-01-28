<template>
  <q-dialog v-model="openCopy.bool">
    <q-card-section
      style="max-width: 500px; width: 1000px; min-height: 200px"
      class="bg-white visitor-detail-card"
    >
      <div class="row justify-between q-col-gutter-lg">
        <div>
          <div class="text-h5">{{ openCopy.title }}</div>
        </div>
        <div>
          <q-btn
            dense
            round
            flat
            color="primary"
            icon="ion-close-circle"
            @click="handleClose"
          />
        </div>
        <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
          <p>{{ openCopy?.text }}</p>
        </div>
        <div
          class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 text-center"
        >
          <q-btn
            color="primary"
            size="small"
            label="Cancel"
            @click="handleClose"
          />
          <q-btn
            color="primary"
            size="small"
            class="q-ml-xs"
            label="Confirm"
            :loading="openCopy.loading"
            @click="handleSubmit"
          />
        </div>
      </div>
    </q-card-section>
  </q-dialog>
</template>
<script>
import { defineComponent, toRef } from "vue";

export default defineComponent({
  name: "AllCollectionsView",
  components: {},
  props: {
    open: { required: true, type: Object },
    handleClose: { required: true, type: Function },
    handleSubmit: { required: true, type: Function },
  },

  setup(props) {
    const openCopy = toRef(props, "open");

    return { openCopy };
  },
});
</script>
