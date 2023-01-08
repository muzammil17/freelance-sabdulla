// import { LOGOUT_SUCCESS } from "@/action/actionTypes";
// import router from "@/router";
// import { store } from "@/store/store";

export const API_URL = "https://api.ribat.com.pk/";

export const LOGIN_URL = {
  url: "v1/Authenticate",
  accesstoken: false,
  headers: false,
};
export const GET_USER_ALLOWED_MENU_URL = {
  url: "v1/UserAccount/GetUserAllowedMenus",
  accesstoken: true,
  headers: false,
};
export const GET_MEMBER_TYPES_URL = {
  url: "v1/Member/GetMemberTypes",
  accesstoken: true,
  headers: false,
};
export const SAVE_MEMBER_URL = {
  url: "v1/Member/SaveMember",
  accesstoken: true,
  headers: false,
};
export const GET_MEMBERS_URL = {
  url: "v1/Member/GetMembers",
  accesstoken: true,
  headers: false,
};
export const GET_MEMBER_DETAIL_URL = {
  url: "v1/Member/GetMemberById",
  accesstoken: true,
  headers: false,
};

//PAGES ROUTES
export const LOGIN_VIEW_URL = "/login";

export const DASHBOARD_VIEW_URL = "/dashboard";
export const MEMBER_VIEW_URL = "/membership-form";
export const EDIT_MEMBER_URL = "/edit-member/:memberId";

export const VIEW_MEMBERS_LIST_URL = "/members";
export const VIEW_MEMBER_DETAIL_URL = "/member-detail/:memberId";

export const checkPhoneLandline = (value) => {
  let regex = /^[0-9]{3}-[0-9]{8}$/gm;
  let result = value.match(regex);
  if (result?.length) {
    return true;
  } else {
    return false;
  }
};
export const checkPhoneMobile = (value) => {
  let regex = /^[0-9]{4}-[0-9]{7}$/gm;
  let result = value.match(regex);
  if (result?.length) {
    return true;
  } else {
    return false;
  }
};

export const checkCNIC = (value) => {
  let regex = /^[0-9]{5}-[0-9]{7}-[0-9]$/gm;
  let result = value.match(regex);
  if (result?.length) {
    return true;
  } else {
    return false;
  }
};

export const LOGOUT_UNAUTH = () => {
  // store.commit(LOGOUT_SUCCESS);
  // router.replace(LOGIN_VIEW_URL);
};

export const memberColumns = [
  {
    name: "title",
    label: "Title",
    align: "left",
    field: "title",
    sortable: true,
  },
  {
    name: "fullName",
    label: "Full Name",
    align: "left",
    field: "fullName",
    sortable: true,
  },
  {
    name: "gender",
    align: "left",
    label: "Gender",
    field: "gender",
    sortable: true,
  },
  {
    name: "cnic",
    align: "center",
    label: "CNIC",
    field: "cnic",
    sortable: true,
  },
  {
    name: "address1",
    align: "left",
    label: "Address 1",
    field: "address1",
    sortable: true,
  },
  {
    name: "membershipTypeDesc",
    align: "left",
    label: "Membership type",
    field: "membershipTypeDesc",
    sortable: true,
  },
  {
    name: "phoneMobile",
    align: "center",
    label: "Mobile number",
    field: "phoneMobile",
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];
