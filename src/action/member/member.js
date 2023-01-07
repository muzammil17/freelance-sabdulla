import { SET_MEMBER_TYPES } from "@/action/actionTypes";
import { GET_MEMBER_TYPES_URL, SAVE_MEMBER_URL } from "@/constants";
import { getCall, postCall } from "@/services/services";

export const getMemberTypesRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await getCall(
      GET_MEMBER_TYPES_URL,
      "",
      `activeOnly=${payload ? payload : false}`,
      GET_MEMBER_TYPES_URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log("result", result.data.data);
      context.commit(SET_MEMBER_TYPES, result.data.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const saveMemberRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await postCall(
      SAVE_MEMBER_URL,
      payload,
      "",
      ``,
      SAVE_MEMBER_URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log("result", result.data.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
