<template>
  <div class="row justify-center">
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <!-- <h5 class="title">WELCOME TO ADMIN DASHBOARD</h5> -->
      <q-tree
        :nodes="simple"
        accordion
        node-key="label"
        v-model:expanded="expanded"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AllProgramView",

  components: {},

  setup() {
    return {
      //states
      expanded: ref([
        "Satisfied customers (with avatar)",
        "Good food (with icon)",
      ]),

      simple: [
        {
          label: "Satisfied customers (with avatar)",
          //   avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          children: [
            {
              label: "Good food (with icon)",
              icon: "restaurant_menu",
              children: [
                { label: "Quality ingredients" },
                { label: "Good recipe" },
              ],
            },
            {
              label: "Good service (disabled node with icon)",
              icon: "room_service",
              children: [
                { label: "Prompt attention" },
                { label: "Professional waiter" },
              ],
            },
            {
              label: "Pleasant surroundings (with icon)",
              icon: "photo",
              children: [
                {
                  label: "Happy atmosphere (with image)",
                  img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
                },
                { label: "Good table presentation" },
                { label: "Pleasing decor" },
              ],
            },
          ],
        },
      ],

      //handlers
    };
  },
});
</script>
<style scoped lang="scss">
.title {
  text-align: center;
}
</style>
