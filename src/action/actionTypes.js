///////////////////////////////////vuex getters///////////////////////////////////////
export const GET_USER_TOKEN = "getUserToken";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const GET_USER_GROUPS_GETT = "GET_USER_GROUPS_GETT";

export const GET_PUBLIC_MENU = "GET_PUBLIC_MENU";
export const GET_PRIVATE_MENU = "GET_PRIVATE_MENU";
export const GET_JWT_TOKEN = "GET_JWT_TOKEN";
export const GET_USER_DETAIL_GETTER = "GET_USER_DETAIL_GETTER";
export const GET_USER_ALLOWED_MENUS_GETT = "GET_USER_ALLOWED_MENUS_GETT";
export const GET_MENU_BY_USER_GROUP_GETT = "GET_MENU_BY_USER_GROUP_GETT";

//member getters
export const GET_MEMBER_TYPES = "GET_MEMBER_TYPES";
export const GET_MEMBERS_LIST_GETT = "GET_MEMBERS_LIST_GETT";
export const GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT =
  "GET_MEMBERS_LIST_AS_SELECT_OPTIONS_GETT";
export const GET_MEMBERS_DETAIL_GETT = "GET_MEMBERS_DETAIL_GETT";
export const GET_MEMBER_PROGRAMS_GETT = "GET_MEMBER_PROGRAMS_GETT";
export const GET_MEMBER_PAYMENTS_GETT = "GET_MEMBER_PAYMENTS_GETT";
export const GET_VISITORS_GETT = "GET_VISITORS_GETT";
export const GET_VISITORS_TABLE_ROWS_GETT = "GET_VISITORS_TABLE_ROWS_GETT";

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
export const GET_COLLECTIONS_BY_DATE_GETT = "GET_COLLECTIONS_BY_DATE_GETT";

//RFID CARD GETTERS
export const GET_RFID_CARDS_GETT = "GET_RFID_CARDS_GETT";

////////////////////////////////////vuex MUTATIONS/////////////////////////////////////
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SET_USER_GROUPS_MUT = "SET_USER_GROUPS_MUT";

export const SET_USER_PRIVATE_MENU = "SET_USER_PRIVATE_MENU";
export const GET_MENU_BY_USER_GROUP_MUT = "GET_MENU_BY_USER_GROUP_MUT";

//member MUTATIONS
export const SET_MEMBER_TYPES = "SET_MEMBER_TYPES";
export const SET_MEMBERS_LIST_MUT = "SET_MEMBERS_LIST_MUT";
export const SET_MEMBERS_DETAIL_MUT = "SET_MEMBERS_DETAIL_MUT";
export const SET_MEMBER_PROGRAMS_MUT = "SET_MEMBER_PROGRAMS_MUT";
export const SET_MEMBER_PAYMENTS_MUT = "SET_MEMBER_PAYMENTS_MUT";
export const SET_VISITORS_MUT = "SET_VISITORS_MUT";
export const UPDATE_VISITORS_MUT = "UPDATE_VISITORS_MUT";

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
export const SET_COLLECTIONS_BY_DATE_MUT = "SET_COLLECTIONS_BY_DATE_MUT";

//RFID MUTATIONS
export const SET_RFID_CARD_MUT = "SET_RFID_CARD_MUT";

////////////////////////////////////vuex actions/////////////////////////////////////////////

//auth actions
export const LOGIN_ACTION_REQUEST = "loginRequest";
export const GET_USER_GROUP_REQUEST = "getUserGroupsRequest";
export const GET_USER_GROUP_ID_REQUEST = "getUserGroupByIdRequest";
export const GET_ALL_ACCESSTYPES_REQUEST = "getAllAccessTypeRequest";
export const saveUserGroupRequest = "saveUserGroupRequest";

//menu actions
export const GET_USER_ALLOWED_MENU_ACTION_REQUEST =
  "getUserAllowedMenusRequest";

export const GET_MENU_BY_USER_GROUP_REQUEST = "getAllMenusByUserGroupRequest";
export const GET_ALL_MENU_REQUEST = "getAllMenusRequest";
export const getMenuByIdRequest = "getMenuByIdRequest";
export const saveMenuRequest = "saveMenuRequest";

//member actions
export const GET_MEMBER_TYPES_REQUEST = "getMemberTypesRequest";
export const SAVE_MEMBER_REQUEST = "saveMemberRequest";
export const GET_MEMBERS_REQUEST = "getMembersRequest";
export const GET_MEMBER_DETAIL_REQUEST = "getMemberDetailRequest";
export const GET_MEMBER_PROGRAMS_REQUEST = "getMemberProgramsRequest";
export const GET_MEMBER_PAYMENTS_REQUEST = "getMemberPaymentsRequest";
export const GET_MEMBER_TITLES_REQUEST = "getMemberTitleRequest";

export const VISITOR_LOGIN_REQUEST = "visitorLoginRequest";
export const GET_VISITORS_REQUEST = "getVisitorsRequest";
export const LOGOUT_VISITOR_REQUEST = "logoutVisitorRequest";

//areas actions
export const GET_CITIES_REQUEST = "getCitiesRequest";
export const GET_AREAS_REQUEST = "getAreasRequest";

//program actions
export const GET_PROGRAMS_REQUEST = "getProgramsRequest";
export const REGISTER_TO_PROGRAM_REQUEST = "registerProgramRequest";
export const SAVE_PROGRAM_REQUEST = "saveProgramRequest";
export const GET_ALL_PROGRAMS_REQUEST = "getAllProgramsRequest";
export const GET_RECEIPTS_BY_DATE_REQUEST = "getReceiptsByDateRequest";
export const CANCEL_RECEIPT_REQUEST = "cancelReceiptRequest";

//banks actions
export const GET_BANKS_FOR_RECEIPT_REQUEST = "getBanksRequest";

//receipt actions
export const GET_PAY_MODES_REQUEST = "getPayModesRequest";
export const SAVE_RECEIPT_REQUEST = "saveReceiptRequest";

//billing actions
export const GET_BILLING_CYCLES_REQUEST = "getBillCyclesRequest";
//RFID ACTIONS
export const GET_RFID_CARDS_REQUEST = "getRfidCardsRequest";
export const ASSIGN_RFID_CARD_REQUEST = "assignRfidCardRequest";
