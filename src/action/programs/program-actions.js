import {
  CREATE_PROGRAM_URL,
  GET_BANKS_URL,
  GET_PAYMODE__URL,
  GET_PROGRAMS_URL,
  REGISTER_PROGRAM_URL,
  SAVE_RECEIPT_URL,
} from "@/constants";
import { getCall, postCall } from "@/services/services";
import {
  SET_ALL_PROGRAMS_MUT,
  SET_CART_BANKS_MUT,
  SET_PAYMENT_MODES_MUT,
} from "../actionTypes";

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

export const getPayModesRequest = async (
  context,
  { payload, responseCallback }
) => {
  const { activeOnly } = payload;
  try {
    let query = `activeOnly=${activeOnly}`;
    console.log({ query });

    const result = await getCall(
      GET_PAYMODE__URL,
      "",
      query,
      GET_PAYMODE__URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log({ result });
      context.commit(SET_PAYMENT_MODES_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getBanksRequest = async (
  context,
  { payload, responseCallback }
) => {
  const { activeOnly } = payload;
  try {
    let query = `activeOnly=${activeOnly ? activeOnly : false}&isOwnBank=false`;
    console.log({ query });

    const result = await getCall(
      GET_BANKS_URL,
      "",
      query,
      GET_BANKS_URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log({ result });
      context.commit(SET_CART_BANKS_MUT, result.data?.data);

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

export const saveProgramRequest = async (
  context,
  { payload, responseCallback }
) => {
  let isExistingQuery = "";
  if (payload?.existing) {
    isExistingQuery = `existing=${payload?.existing}`;
  } else {
    isExistingQuery = `existing=${false}`;
  }
  try {
    const result = await postCall(
      CREATE_PROGRAM_URL,
      payload,
      "",
      isExistingQuery,
      CREATE_PROGRAM_URL.headers ? {} : null
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

export const registerProgramRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    const result = await postCall(
      REGISTER_PROGRAM_URL,
      payload,
      "",
      "",
      REGISTER_PROGRAM_URL.headers ? {} : null
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
