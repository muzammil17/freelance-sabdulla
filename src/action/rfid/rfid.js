import { GET_RFID_CARDS_URL } from "@/constants";
import { getCall } from "@/services/services";
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
