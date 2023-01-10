///////////////vuex getters
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

//area gettters
export const GET_CITIES_GETT = "GET_CITIES_GETT";
export const GET_AREAS_GETT = "GET_AREAS_GETT";

///////////////vuex MUTATIONS
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SET_USER_PRIVATE_MENU = "SET_USER_PRIVATE_MENU";

//member MUTATIONS
export const SET_MEMBER_TYPES = "SET_MEMBER_TYPES";
export const SET_MEMBERS_LIST_MUT = "SET_MEMBERS_LIST_MUT";

//area mutations
export const SET_CITIES_MUT = "SET_CITIES_MUT";
export const SET_AREAS_MUT = "SET_AREAS_MUT";

///////////////vuex actions
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
