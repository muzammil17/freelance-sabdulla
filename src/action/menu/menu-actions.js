import { GET_USER_ALLOWED_MENU_URL } from "@/constants";
import { postCall } from "@/services/services";
import { SET_USER_PRIVATE_MENU } from "../actionTypes";

export const getUserAllowedMenusRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await postCall(
      GET_USER_ALLOWED_MENU_URL,
      payload,
      "",
      "",
      GET_USER_ALLOWED_MENU_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(SET_USER_PRIVATE_MENU, result.data?.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
