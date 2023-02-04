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

//areas requests
export const GET_AREA_URL = {
  url: "v1/Area/GetAreas",
  accesstoken: true,
  headers: false,
};

export const GET_CITIES_URL = {
  url: "v1/City/GetCities",
  accesstoken: true,
  headers: false,
};
//PROGRAMS REQUESTS
export const GET_PROGRAMS_URL = {
  url: "v1/Programs/GetPrograms",
  accesstoken: true,
  headers: false,
};
export const GET_PAYMODE__URL = {
  url: "v1/Receipt/GetPayModes",
  accesstoken: true,
  headers: false,
};

export const GET_BANKS_URL = {
  url: "v1/Bank/GetBanks",
  accesstoken: true,
  headers: false,
};

export const REGISTER_PROGRAM_URL = {
  url: "v1/Member/RegisterPrograms",
  accesstoken: true,
  headers: false,
};

//RECEIPT REQUESTS

export const SAVE_RECEIPT_URL = {
  url: "v1/Receipt/SaveReceipt",
  accesstoken: true,
  headers: false,
};

/////////////////////////////////////PAGES ROUTES////////////////////////////////////////////////
export const LOGIN_VIEW_URL = { title: "Login", url: "/login" };
export const DASHBOARD_VIEW_URL = { title: "Dashboard", url: "/dashboard" };
export const MEMBER_VIEW_URL = {
  title: "Membership Form",
  url: "/membership-form",
};
export const EDIT_MEMBER_URL = {
  title: "Edit Member",
  url: "/edit-member/:memberId",
};

export const VIEW_MEMBERS_LIST_URL = {
  title: "Members List",
  url: "/members",
};
export const VIEW_MEMBER_DETAIL_URL = {
  title: "Member Detail",
  url: "/member-detail/:memberId",
};
export const VIEW_PROGRAMS_URL = {
  title: "Programs",
  url: "/programs",
};
export const VIEW_PROGRAM_Detail_URL = {
  title: "Program information",
  url: "/program/:id",
};
export const VIEW_CART_LIST_URL = {
  title: "Cart",
  url: "/cart",
};

export const VIEW_ALL_PROGRAMS_DISPLAY_URL = {
  title: "All Programs",
  url: "/all-programs",
};

export const VIEW_CREATE_PROGRAM_URL = {
  title: "Create Program",
  url: "/create-program",
};

//////////////////////////////////UI CONSTANTS//////////////////////////////////////////////

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

export const IS_PAYMENT_METHOD_CHEQUE = "Cheque";

export const LOGOUT_UNAUTH = () => {
  // store.commit(LOGOUT_SUCCESS);
  // router.replace(LOGIN_VIEW_URL);
};

export const memberModalColumns = [
  {
    name: "fullName",
    label: "Full Name",
    align: "left",
    field: "fullName",
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
    name: "phoneMobile",
    align: "center",
    label: "Mobile number",
    field: "phoneMobile",
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

export const memberColumns = [
  {
    name: "title",
    label: "Title",
    // style: "width: 500px",

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

    classes: "col-address",
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

export const cartColumns = [
  {
    name: "select",
    label: "",
    align: "left",
    field: "select",
    sortable: true,
  },

  {
    name: "progDesc",
    label: "Program Detail",
    align: "left",
    field: "progDesc",
    sortable: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    align: "left",
    width: "100px",
    field: "quantity",
    classes: "quantity-input",
    sortable: true,
  },
  {
    name: "standardPrice",
    label: "Price",
    align: "right",
    field: "standardPrice",
    sortable: true,
  },
];
