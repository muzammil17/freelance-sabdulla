<template>
  <div class="row justify-center q-col-gutter-xs">
    <div
      class="col-lg-10 col-xl-10 col-md-10 col-sm-10 col-xs-11 search-wrapper"
    >
      <div class="row justify-center items-center q-col-gutter-md">
        <div class="col-lg-4 col-xl-4 col-md-6 col-sm-10 col-xs-10">
          <q-input v-model="search" label="Search members">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-lg-8 col-xl-8 col-md-6 col-sm-11 col-xs-11">
          <span class="add-member-btn-wrapper">
            <q-btn class="add-memberbtn" @click="handleRoute">
              Add a member
            </q-btn>
          </span>
        </div>
      </div>
    </div>
    <div class="col-lg-11 col-xl-11 col-md-11 col-sm-11 col-xs-11">
      <q-table
        title="Members"
        dense
        class="table-header-wrapper"
        :rows="
          membersRows.filter((dt) =>
            search
              ? dt?.fullName?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.gender?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.phoneMobile
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ? dt
                : dt?.membershipTypeDesc
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ? dt
                : dt?.cnic?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.address1?.toLowerCase()?.includes(search?.toLowerCase())
                ? dt
                : dt?.membershipTypeDesc
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase()) && dt
              : dt
          )
        "
        :columns="memberColumns"
        row-key="name"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="editRow(props)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="memberInfo(props)"
              icon="info"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              class="edit-memberbtn"
              @click="deleteRow(props)"
              icon="delete"
            ></q-btn>
          </q-td> </template
      ></q-table>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, watch, ref } from "vue";
import { useStore } from "vuex";
import {
  GET_MEMBERS_LIST_GETT,
  GET_MEMBERS_REQUEST,
  IS_AUTHENTICATED,
} from "@/action/actionTypes";
import { useRouter } from "vue-router";
import {
  MEMBER_VIEW_URL,
  EDIT_MEMBER_URL,
  VIEW_MEMBER_DETAIL_URL,
} from "@/constants";
import { useQuasar } from "quasar";
import { memberColumns } from "@/constants";

export default defineComponent({
  name: "MemberListView",

  components: {},

  setup() {
    const $store = useStore();
    const $q = useQuasar();

    const $router = useRouter();

    const search = ref(null);
    const membersList = ref([]);
    const membersRows = ref([]);

    const membersListGetter = computed(() => {
      return $store.getters[GET_MEMBERS_LIST_GETT];
    });

    onBeforeMount(() => {
      $q.loading.show({
        delay: 400, // ms
      });
      console.log("onbeforemounted");

      $store.dispatch(GET_MEMBERS_REQUEST, {
        payload: null,
        responseCallback: () => {
          $q.loading.hide();
        },
      });
    });

    watch(membersListGetter, (currentVal) => {
      let memberListData = JSON.parse(
        JSON.stringify(Object.values(currentVal))
      );
      console.log("currentVal", memberListData);
      if (memberListData.length) {
        let rowsTemp = [];
        for (const item of memberListData) {
          console.log({ item });
          rowsTemp.push({
            ...item,
            membershipTypeDesc: item?.membershipTypeDesc || "-",
            fullName: `${item?.firstName} ${item?.lastName}`,
          });
        }
        membersRows.value = rowsTemp;
      }
      membersList.value = memberListData;
    });

    const isLoggedIn = computed(() => {
      return $store.getters[IS_AUTHENTICATED];
    });
    console.log("membersListGetter", membersListGetter.value);
    const handleRoute = () => {
      $router.push(MEMBER_VIEW_URL);
    };

    const editRow = (prop) => {
      $router.push(EDIT_MEMBER_URL?.replace(":memberId", prop.row?.memberId));
      console.log("prop", prop.row);
    };

    const memberInfo = (prop) => {
      $router.push(
        VIEW_MEMBER_DETAIL_URL?.replace(":memberId", prop.row?.memberId)
      );
    };

    return {
      //states
      search,
      isLoggedIn,
      membersListGetter,
      membersList,
      membersRows,
      memberColumns,
      //handlers
      handleRoute,
      memberInfo,
      editRow,
    };
  },
});
</script>
<style scoped lang="scss">
.edit-memberbtn {
  color: #c36;
}
.title {
  text-align: center;
  margin: 0px;
  margin-bottom: 20px;
}
.table-header-wrapper {
  border-radius: 10px;

  .q-table__top {
    background-color: #c36 !important;
    color: #fff !important;
  }
}
.search-wrapper {
  margin-bottom: 20px;
}
.input-field {
  color: #c36;
  background-color: transparent !important;
}

.q-field__native .q-field--labeled {
  border-radius: 8px !important;
}
.add-member-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  .add-memberbtn {
    background-color: #c36;
    color: #fff;
  }
}
</style>
