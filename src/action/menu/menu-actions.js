import {
  GET_ALL_MENU_URL,
  GET_USER_ACCESS_TYPES_URL,
  GET_USER_ALLOWED_MENU_URL,
} from "@/constants";
import { getCall, postCall } from "@/services/services";
import { SET_USER_PRIVATE_MENU } from "../actionTypes";

export const getUserAllowedMenusRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    const result = await postCall(
      GET_USER_ALLOWED_MENU_URL,
      payload,
      "",
      "",
      GET_USER_ALLOWED_MENU_URL.headers ? {} : null
    );

    if (result.data.success) {
      let access = [];
      for (const item of result.data?.data) {
        const resultAccess = await getCall(
          GET_USER_ACCESS_TYPES_URL,
          "",
          `menuId=${item?.menuId}`,
          GET_USER_ACCESS_TYPES_URL.headers ? {} : null
        );

        if (resultAccess?.data?.data?.length) {
          access = [
            ...access,
            { ...item, accessMenu: resultAccess?.data?.data },
          ];
        }
      }

      context.commit(SET_USER_PRIVATE_MENU, access);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllMenusRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    const result = await getCall(
      GET_ALL_MENU_URL,
      ``,
      `activeOnly=${payload?.activeOnly || false}`,
      GET_ALL_MENU_URL.headers ? {} : null
    );
    console.log({ result });
    if (result.data.success) {
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
