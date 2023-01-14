<template>
  <div class="row justify-center">
    <div
      class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12"
      @click="handleRoute(member.memberId)"
    >
      <q-card flat bordered class="my-card bg-white-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                Membership of {{ member?.membershipTypeDesc }}
              </div>
              <div class="text-subtitle2">by {{ member.firstName }}</div>
            </div>

            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section> {{ member.cnic }} </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn class="actions-wrapper" flat>View</q-btn>
          <!-- <q-btn flat>Action 2</q-btn> -->
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { VIEW_MEMBER_DETAIL_URL } from "@/constants";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MemberCard",
  props: ["member"],
  setup() {
    const $router = useRouter();
    const handleRoute = (id) => {
      $router.push(VIEW_MEMBER_DETAIL_URL.url.replace(":id", id));
    };
    return {
      //states

      //handlers
      handleRoute,
    };
  },
});
</script>

<style lang="scss">
.actions-wrapper {
  color: #c36 !important;
}
</style>
