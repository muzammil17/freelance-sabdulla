import LoginView from "../views/LoginView.vue";
import MemberView from "../views/MemberView.vue";
import EditMemberView from "../views/EditMemberView.vue";
import MemberListView from "../views/MemberListView.vue";
import MemberDetailView from "@/views/MemberDetail.vue";
import DashboardEmpty from "@/views/DashboardEmpty.vue";
import ProgramsView from "@/views/program-views/ProgramsView.vue";
import ProgramDetailView from "@/views/program-views/ProgramsDetailView.vue";
import AllProgramView from "@/views/program-views/AllProgramView.vue";
import CreateProgramView from "@/views/program-views/CreateProgramView.vue";
import AddVisitor from "@/views/visitor-views/LoginVisitor.vue";
import AllVisitors from "@/views/visitor-views/AllVisitorsView.vue";
import AllCollection from "@/views/collection-views/AllCollectionsView.vue";
import CartView from "@/views/CartView.vue";
import PageNotFound from "@/views/Page404View.vue";
import quasarUserOptions from "@/quasar-user-options";

// export const API_URL = "https://api.ribat.com.pk/";
export const API_URL = "https://stagingapi.ribat.com.pk/";

export const toastMessage = (message, bool) => {
  quasarUserOptions.plugins.Notify.create({
    color: bool ? "positive" : "negative",
    textColor: "#fff",
    message,
    icon: "announcement",
    position: "top",
    timeout: 2000,
  });
};

export const ROUTE_ROLES = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  AUTH: "AUTH",
};

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

export const GET_MEMBER_PROGRAMS_URL = {
  url: "v1/Member/GetMemberPrograms",
  accesstoken: true,
  headers: false,
};
export const GET_MEMBER_TITLE_URL = {
  url: "v1/Member/GetTitles",
  accesstoken: true,
  headers: false,
};

export const GET_MEMBER_PAYMENTS_URL = {
  url: "v1/Member/GetMemberPayments",
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

//RFID REQUESTS
export const GET_RFID_CARDS_URL = {
  url: "v1/RFCard/GetRFCards",
  accesstoken: true,
  headers: false,
};

export const ASSIGN_RFID_CARD_URL = {
  url: "v1/Member/AssignRFCard",
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

export const CREATE_PROGRAM_URL = {
  url: "v1/Programs/SaveProgram",
  accesstoken: true,
  headers: false,
};

export const GET_ALL_PROGRAMS_URL = {
  url: "v1/Programs/GetProgramList",
  accesstoken: true,
  headers: false,
};

export const GET_BILL_CYCLES_URL = {
  url: "v1/Billing/GetBillingCycles",
  accesstoken: true,
  headers: false,
};

//RECEIPT REQUESTS

export const SAVE_RECEIPT_URL = {
  url: "v1/Receipt/SaveReceipt",
  accesstoken: true,
  headers: false,
};

export const CANCEL_RECEIPT_URL = {
  url: "v1/Receipt/CancelReceipt",
  accesstoken: true,
  headers: false,
};

export const GET_RECEIPTS_BY_DATE_URL = {
  url: "v1/Receipt/GetReceiptsByDate",
  accesstoken: true,
  headers: false,
};

//VISITORS REQUESTS

export const VISITOR_LOGIN_URL = {
  url: "v1/Visitor/VisitorLogIn",
  accesstoken: true,
  headers: false,
};

export const GET_VISITORS_URL = {
  url: "v1/Visitor/GetVisitors",
  accesstoken: true,
  headers: false,
};

export const LOGOUT_VISITOR_URL = {
  url: "v1/Visitor/VisitorLogOut",
  accesstoken: true,
  headers: false,
};

/////////////////////////////////////PAGES ROUTES////////////////////////////////////////////////
export const LOGIN_VIEW_URL = {
  title: "Login",
  url: "/login",
  auth: ROUTE_ROLES.AUTH,
  component: LoginView,
};
export const PAGE404_VIEW_URL = {
  title: "Page Not Found",
  url: "/:catchAll(.*)",
  component: PageNotFound,

  meta: {
    requiresAuth: false,
  },

  auth: ROUTE_ROLES.PUBLIC,
};

export const MEMBER_VIEW_URL = {
  title: "Membership Form",
  url: "/membership-form",
  component: MemberView,

  auth: ROUTE_ROLES.PRIVATE,
};
export const EDIT_MEMBER_URL = {
  title: "Edit Member",
  url: "/edit-member/:memberId",
  auth: ROUTE_ROLES.PRIVATE,
  component: EditMemberView,
};

export const VIEW_MEMBERS_LIST_URL = {
  title: "Members List",
  url: "/members",
  auth: ROUTE_ROLES.PRIVATE,
  component: MemberListView,
};
export const VIEW_MEMBER_DETAIL_URL = {
  title: "Member Detail",
  url: "/member-detail/:memberId",
  auth: ROUTE_ROLES.PRIVATE,
  component: MemberDetailView,
};
export const VIEW_PROGRAMS_URL = {
  title: "Programs",
  url: "/programs",
  auth: ROUTE_ROLES.PRIVATE,
  component: ProgramsView,
};
export const VIEW_PROGRAM_Detail_URL = {
  title: "Program information",
  url: "/program/:id",
  auth: ROUTE_ROLES.PRIVATE,
  component: ProgramDetailView,
};
export const VIEW_CART_LIST_URL = {
  title: "Cart",
  url: "/cart",
  auth: ROUTE_ROLES.PRIVATE,
  component: CartView,
};

export const VIEW_ALL_PROGRAMS_DISPLAY_URL = {
  title: "All Programs",
  url: "/create-program",
  auth: ROUTE_ROLES.PRIVATE,
  component: AllProgramView,
};

export const VIEW_CREATE_PROGRAM_URL = {
  title: "Create Program",
  url: "/new-program",
  auth: ROUTE_ROLES.PRIVATE,
  component: CreateProgramView,
};

// export const VIEW_UPDATE_PROGRAM_URL = {
//   title: "Update Program",
//   url: "/update-program/:progId",
//   auth: ROUTE_ROLES.PRIVATE,
//   component: CreateProgramView,
// };

export const CREATE_ENTRY_VISITOR_URL = {
  title: "Visitor Login Entry",
  url: "/entry-visitor",
  component: AddVisitor,

  auth: ROUTE_ROLES.PRIVATE,
};
export const ALL_VISITOR_URL = {
  title: "Visitors",
  component: AllVisitors,

  url: "/visitor_log",
  auth: ROUTE_ROLES.PRIVATE,
};

export const ALL_COLLECTION_URL = {
  title: "Collection",
  url: "/collection",
  auth: ROUTE_ROLES.PRIVATE,
  component: AllCollection,
};

export const Home_URL = {
  title: "Home",
  url: "/",
  auth: ROUTE_ROLES.PRIVATE,
  component: DashboardEmpty,
};

export const ALL_ROUTES = [
  Home_URL,
  MEMBER_VIEW_URL,
  EDIT_MEMBER_URL,
  VIEW_MEMBERS_LIST_URL,
  VIEW_MEMBER_DETAIL_URL,
  PAGE404_VIEW_URL,
  VIEW_PROGRAMS_URL,
  VIEW_PROGRAM_Detail_URL,
  VIEW_CART_LIST_URL,
  VIEW_ALL_PROGRAMS_DISPLAY_URL,
  VIEW_CREATE_PROGRAM_URL,
  CREATE_ENTRY_VISITOR_URL,
  LOGIN_VIEW_URL,
  ALL_COLLECTION_URL,
  ALL_VISITOR_URL,
];

//////////////////////////////////UI CONSTANTS//////////////////////////////////////////////
export const pagination = {
  sortBy: "desc",
  descending: false,
  rowsPerPage: 5,
};

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
    name: "memberId",
    label: "Member Id",

    align: "left",
    field: "memberId",
    sortable: true,
  },
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

  {
    name: "activeRFCardNumber",
    align: "center",
    label: "Rfid number",
    field: "activeRFCardNumber",
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

export function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].progId] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node?.parentProgId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentProgId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

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

//member columns
export const memberProgramsColumns = [
  {
    name: "programDesc",
    label: "Program Detail",
    align: "left",
    field: "programDesc",
    sortable: true,
  },
  {
    name: "billingStart",
    label: "Billing Start",
    align: "left",
    field: "billingStart",
    sortable: true,
  },
  {
    name: "billingEnd",
    label: "Billing End",
    align: "left",
    field: "billingEnd",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },
  {
    name: "standardPrice",
    label: "Price (Rs.)",
    align: "left",
    field: "standardPrice",
    sortable: true,
  },
];
export const memberPaymentsColumns = [
  {
    name: "payModeDesc",
    label: "Payment Method",
    align: "left",
    field: "payModeDesc",
    sortable: true,
  },

  {
    name: "cheBankName",
    label: "Cheque bank name",
    align: "left",
    field: "cheBankName",
    sortable: true,
  },
  {
    name: "chequeNo",
    label: "Cheque No",
    align: "left",
    field: "chequeNo",
    sortable: true,
  },
  {
    name: "chequeDate",
    label: "Cheque date",
    align: "left",
    field: "chequeDate",
    sortable: true,
  },
  {
    name: "receiptDate",
    label: "Receipt date",
    align: "left",
    field: "receiptDate",
    sortable: true,
  },

  {
    name: "isCancelled",
    label: "Is Cancelled",
    align: "left",
    field: "isCancelled",
    sortable: true,
  },
  {
    name: "amount",
    label: "Amount (Rs.)",
    align: "left",
    field: "amount",
    sortable: true,
  },
];

//visitor columns
export const allVisitorColumns = [
  {
    name: "visitorName",
    label: "Visitor's Name",
    align: "left",
    field: "visitorName",
    sortable: true,
  },
  {
    name: "contactNo",
    label: "Contact",
    align: "left",
    field: "contactNo",
    sortable: true,
  },
  {
    name: "visitorCNIC",
    label: "CNIC",
    align: "left",
    field: "visitorCNIC",
    sortable: true,
  },

  {
    name: "rfCardNo",
    label: "RFID",
    align: "left",
    field: "rfCardNo",
    sortable: true,
  },

  {
    name: "deptToVisit",
    label: "Dept. to visit",
    align: "left",
    field: "deptToVisit",
    sortable: true,
  },

  {
    name: "entryDateTime",
    label: "Entry time",
    align: "left",
    field: "entryDateTime",
    sortable: true,
  },
  {
    name: "exitDateTimeLabel",
    label: "Exit time",
    align: "left",
    field: "exitDateTimeLabel",
    sortable: true,
  },

  {
    name: "actions",
    label: "Action",
    align: "left",
    field: "actions",
    sortable: true,
  },
];

// reciptt columns

export const allCollectionsByDateColumns = [
  {
    name: "receiptId",
    label: "Receipt Id",
    align: "left",
    field: "receiptId",
    sortable: true,
  },
  {
    name: "receiptDate",
    label: "Receipt Date",
    align: "left",
    field: "receiptDate",
    sortable: true,
  },

  {
    name: "memberFullName",
    label: "Member name",
    align: "left",
    field: "memberFullName",
    sortable: true,
  },

  {
    name: "phone",
    label: "Phone",
    align: "left",
    field: "phone",
    sortable: true,
  },

  {
    name: "amount",
    label: "Amount Rs.",
    align: "left",
    field: "amount",
    sortable: true,
  },
  {
    name: "isCancelled",
    label: "Cancelled (Yes/No)",
    align: "left",
    field: "isCancelled",
    sortable: true,
  },

  {
    name: "createdBy",
    label: "Created By",
    align: "left",
    field: "createdBy",
    sortable: true,
  },
  {
    name: "actions",
    label: "Action",
    align: "left",
    field: "actions",
    sortable: true,
  },
];

export const singleCollectionColumns = [
  {
    name: "receiptId",
    label: "Receipt Id",
    align: "left",
    field: "receiptId",
    sortable: true,
  },
  {
    name: "receiptDate",
    label: "Receipt Date",
    align: "left",
    field: "receiptDate",
    sortable: true,
  },

  {
    name: "memberFullName",
    label: "Member name",
    align: "left",
    field: "memberFullName",
    sortable: true,
  },

  {
    name: "phone",
    label: "Phone",
    align: "left",
    field: "phone",
    sortable: true,
  },

  {
    name: "billStartDate",
    label: "Billing Date",
    align: "left",
    field: "billStartDate",
    sortable: true,
  },
  {
    name: "isCancelled",
    label: "Cancelled (Yes/No)",
    align: "left",
    field: "isCancelled",
    sortable: true,
  },

  {
    name: "payModeDesc",
    label: "Payment mode",
    align: "left",
    field: "payModeDesc",
    sortable: true,
  },

  {
    name: "createdBy",
    label: "Created By",
    align: "left",
    field: "createdBy",
    sortable: true,
  },

  {
    name: "amount",
    label: "Amount Rs.",
    align: "left",
    field: "amount",
    sortable: true,
  },
];

export const visitorDetailColumns = [
  {
    name: "visitorName",
    label: "Visitor's Name",
    align: "left",
    field: "visitorName",
    sortable: true,
  },
  {
    name: "contactNo",
    label: "Contact",
    align: "left",
    field: "contactNo",
    sortable: true,
  },
  {
    name: "visitorCNIC",
    label: "CNIC",
    align: "left",
    field: "visitorCNIC",
    sortable: true,
  },
  {
    name: "purposeOfVisit",
    label: "Purpose to visit",
    align: "left",
    field: "purposeOfVisit",
    sortable: true,
  },

  {
    name: "deptToVisit",
    label: "Dept to visit",
    align: "left",
    field: "deptToVisit",
    sortable: true,
  },
  {
    name: "personToVisit",
    label: "Person to visit",
    align: "left",
    field: "personToVisit",
    sortable: true,
  },
  {
    name: "rfCardNo",
    label: "RFID",
    align: "left",
    field: "rfCardNo",
    sortable: true,
  },

  {
    name: "identityReceived",
    label: "Identity Received",
    align: "left",
    field: "identityReceived",
    sortable: true,
  },

  {
    name: "identityReturned",
    label: "Identity Returned",
    align: "left",
    field: "identityReturned",
    sortable: true,
  },
  {
    name: "rfCardReturned",
    label: "RFID card Returned",
    align: "left",
    field: "rfCardReturned",
    sortable: true,
  },
];
