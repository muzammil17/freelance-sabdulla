import { SAVE_DONATION_URL } from "@/constants";
import { postCall } from "@/services/services";

export const saveDonationRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);

  try {
    // &cityId=${cityId}
    const result = await postCall(
      SAVE_DONATION_URL,
      payload,
      ``,
      SAVE_DONATION_URL.headers ? {} : null
    );

    if (result.data.success) {
      // context.commit(SET_AREAS_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
    responseCallback(false, error);
  }
};
