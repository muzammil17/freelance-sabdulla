import { GET_AREA_URL, GET_CITIES_URL } from "@/constants";
import { getCall } from "@/services/services";
import { SET_AREAS_MUT, SET_CITIES_MUT } from "../actionTypes";

export const getAreasRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  const { isActive, cityId } = payload;
  try {
    // &cityId=${cityId}
    const result = await getCall(
      GET_AREA_URL,
      "",
      `activeOnly=${isActive}&cityId=${cityId}`,

      GET_AREA_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(SET_AREAS_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCitiesRequest = async (
  context,
  { payload, responseCallback }
) => {
  console.log("payload", payload);
  try {
    const result = await getCall(
      GET_CITIES_URL,
      "",
      `activeOnly=${payload}`,
      GET_CITIES_URL.headers ? {} : null
    );
    console.log({ result });
    if (result.data.success) {
      context.commit(SET_CITIES_MUT, result.data?.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
