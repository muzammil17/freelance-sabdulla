import { LOGIN_URL } from "@/constants";
import { postCall } from "@/services/services";

export const loginRequest = async (context, { payload, responseCallback }) => {
  console.log(context, payload);
  try {
    const result = await postCall(
      LOGIN_URL.url,
      payload,
      LOGIN_URL.headers ? {} : null
    );

    // if (result.data.user) {
    console.log("result", responseCallback, result);
    // }

    return result;
  } catch (error) {
    //   alert(messages["toast-msgs"]["error"], error.response.data.message)
    console.log("error", error.response.data);
  }
};
