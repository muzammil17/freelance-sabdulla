import { SET_MEMBERS_LIST_MUT, SET_MEMBER_TYPES } from "@/action/actionTypes";
import {
  GET_MEMBERS_URL,
  GET_MEMBER_DETAIL_URL,
  GET_MEMBER_TYPES_URL,
  SAVE_MEMBER_URL,
} from "@/constants";
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
      payload.data,
      "",
      `existing=${payload.bool}`,
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

export const getMembersRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await getCall(
      GET_MEMBERS_URL,
      "",
      ``,
      GET_MEMBERS_URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log("result", result.data.data);
      context.commit(SET_MEMBERS_LIST_MUT, result.data.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getMemberDetailRequest = async (
  context,
  { payload, responseCallback }
) => {
  const { memberId } = payload;
  console.log("payload", payload);
  try {
    const result = await getCall(
      GET_MEMBER_DETAIL_URL,
      ``,
      memberId,
      GET_MEMBER_DETAIL_URL.headers ? {} : null
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
