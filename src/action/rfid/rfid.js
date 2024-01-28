import { ASSIGN_RFID_CARD_URL, GET_RFID_CARDS_URL } from "@/constants";
import { getCall, postCall } from "@/services/services";
import { SET_RFID_CARD_MUT } from "../actionTypes";

export const getRfidCardsRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await getCall(
      GET_RFID_CARDS_URL,
      "",
      `rfCardPoolId=${payload?.poolId || 0}&rfCardStatusId=${
        payload?.statusId || 0
      }`,

      GET_RFID_CARDS_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(SET_RFID_CARD_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const assignRfidCardRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await postCall(
      ASSIGN_RFID_CARD_URL,
      "",
      "",
      `memberId=${payload?.memberId || 0}&rfCardNo=${payload?.rfCardNo || 0}`,

      ASSIGN_RFID_CARD_URL.headers ? {} : null
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
