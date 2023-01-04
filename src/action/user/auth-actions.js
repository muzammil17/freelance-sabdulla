import { LOGIN_URL } from "@/constants";
import { postCall } from "@/services/services";
import { LOGIN_SUCCESS } from "../actionTypes";

export const loginRequest = async (context, { payload, responseCallback }) => {
  try {
    const result = await postCall(
      LOGIN_URL,
      payload,
      LOGIN_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(LOGIN_SUCCESS, result.data?.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
