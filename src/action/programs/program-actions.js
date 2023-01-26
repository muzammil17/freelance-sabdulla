import { GET_PROGRAMS_URL, SAVE_RECEIPT_URL } from "@/constants";
import { getCall, postCall } from "@/services/services";
import { SET_ALL_PROGRAMS_MUT } from "../actionTypes";

export const getProgramsRequest = async (
  context,
  { payload, responseCallback }
) => {
  const { activeOnly } = payload;
  try {
    let query = `activeOnly=${activeOnly}`;
    if (payload?.parentProgId) {
      query += `&parentProgId=${payload?.parentProgId}`;
    }
    const result = await getCall(
      GET_PROGRAMS_URL,
      "",
      query,
      GET_PROGRAMS_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(SET_ALL_PROGRAMS_MUT, result.data?.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
export const saveReceiptRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    const result = await postCall(
      SAVE_RECEIPT_URL,
      payload,
      "",
      "",
      SAVE_RECEIPT_URL.headers ? {} : null
    );

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
