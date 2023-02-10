///////////////////////////////////vuex getters///////////////////////////////////////
export const GET_USER_TOKEN = "getUserToken";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";

export const GET_PUBLIC_MENU = "GET_PUBLIC_MENU";
export const GET_PRIVATE_MENU = "GET_PRIVATE_MENU";
export const GET_JWT_TOKEN = "GET_JWT_TOKEN";
export const GET_USER_DETAIL_GETTER = "GET_USER_DETAIL_GETTER";
export const GET_USER_ALLOWED_MENUS_GETT = "GET_USER_ALLOWED_MENUS_GETT";

//member getters
export const GET_MEMBER_TYPES = "GET_MEMBER_TYPES";
export const GET_MEMBERS_LIST_GETT = "GET_MEMBERS_LIST_GETT";
export const GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT =
  "GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT";

//area gettters
export const GET_CITIES_GETT = "GET_CITIES_GETT";
export const GET_AREAS_GETT = "GET_AREAS_GETT";

//program GETTERS
export const GET_ALL_PROGRAMS_GETT = "GET_ALL_PROGRAMS_GETT";
export const GET_PROGRAMS_GETT = "GET_PROGRAMS_GETT";
export const GET_CART_ITEMS_GETT = "GET_CART_ITEMS_GETT";
export const GET_CART_ITEMS_TOTAL_PRICE_GETT =
  "GET_CART_ITEMS_TOTAL_PRICE_GETT";
export const GET_PAYMODES_GETT = "GET_PAYMODES_GETT";
export const GET_COLLECTION_TYPE_GETT = "GET_COLLECTION_TYPE_GETT";
export const GET_BANKS_FOR_RECEIPTS_GETT = "GET_BANKS_FOR_RECEIPTS_GETT";
export const GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION =
  "GET_PROGRAMS_OPTIONS_FOR_PROGRAMS_CREATION";
export const GET_BILLING_CYCLES_GETT = "GET_BILLING_CYCLES_GETT";
export const GET_PROGRAMS_TREE_GETT = "GET_PROGRAMS_TREE_GETT";

////////////////////////////////////vuex MUTATIONS/////////////////////////////////////
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SET_USER_PRIVATE_MENU = "SET_USER_PRIVATE_MENU";

//member MUTATIONS
export const SET_MEMBER_TYPES = "SET_MEMBER_TYPES";
export const SET_MEMBERS_LIST_MUT = "SET_MEMBERS_LIST_MUT";

//area mutations
export const SET_CITIES_MUT = "SET_CITIES_MUT";
export const SET_AREAS_MUT = "SET_AREAS_MUT";

//program mutations
export const SET_ALL_PROGRAMS_MUT = "SET_ALL_PROGRAMS_MUT";
export const SET_ADD_CART_ITEM_MUT = "SET_ADD_CART_ITEM_MUT";
export const SET_CART_UPDATED_ITEMS_MUT = "SET_CART_UPDATED_ITEMS_MUT";
export const SET_EMPTY_CART_MUT = "SET_EMPTY_CART_MUT";
export const SET_PAYMENT_MODES_MUT = "SET_PAYMENT_MODES_MUT";
export const SET_CART_BANKS_MUT = "SET_CART_BANKS_MUT";
export const SET_BILLING_CYCLES_MUT = "SET_BILLING_CYCLES_MUT";
export const SET_PROGRAMS_MUT = "SET_PROGRAMS_MUT";
export const SET_PROGRAMS_TREE_MUT = "SET_PROGRAMS_TREE_MUT";

////////////////////////////////////vuex actions/////////////////////////////////////////////

export const LOGIN_ACTION_REQUEST = "loginRequest";
export const GET_USER_ALLOWED_MENU_ACTION_REQUEST =
  "getUserAllowedMenusRequest";

export const GET_MEMBER_TYPES_REQUEST = "getMemberTypesRequest";
export const SAVE_MEMBER_REQUEST = "saveMemberRequest";
export const GET_MEMBERS_REQUEST = "getMembersRequest";
export const GET_MEMBER_DETAIL_REQUEST = "getMemberDetailRequest";

//areas actions
export const GET_CITIES_REQUEST = "getCitiesRequest";
export const GET_AREAS_REQUEST = "getAreasRequest";

//program actions
export const GET_PROGRAMS_REQUEST = "getProgramsRequest";
export const REGISTER_TO_PROGRAM_REQUEST = "registerProgramRequest";
export const SAVE_PROGRAM_REQUEST = "saveProgramRequest";
export const GET_ALL_PROGRAMS_REQUEST = "getAllProgramsRequest";

//banks actions
export const GET_BANKS_FOR_RECEIPT_REQUEST = "getBanksRequest";

//receipt actions
export const GET_PAY_MODES_REQUEST = "getPayModesRequest";
export const SAVE_RECEIPT_REQUEST = "saveReceiptRequest";

//billing actions
export const GET_BILLING_CYCLES_REQUEST = "getBillCyclesRequest";
