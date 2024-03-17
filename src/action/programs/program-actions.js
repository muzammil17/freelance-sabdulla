import {
  CANCEL_RECEIPT_URL,
  CREATE_PROGRAM_URL,
  GET_ALL_PROGRAMS_URL,
  GET_BANKS_URL,
  GET_BILL_CYCLES_URL,
  GET_PAYMODE__URL,
  GET_PROGRAMS_URL,
  GET_RECEIPTS_BY_DATE_URL,
  REGISTER_PROGRAM_URL,
  SAVE_RECEIPT_URL,
} from "@/constants";
import { getCall, postCall } from "@/services/services";
import {
  SET_ALL_PROGRAMS_MUT,
  SET_BILLING_CYCLES_MUT,
  SET_CART_BANKS_MUT,
  SET_COLLECTIONS_BY_DATE_MUT,
  SET_PAYMENT_MODES_MUT,
  SET_PROGRAMS_MUT,
  SET_PROGRAMS_TREE_MUT,
} from "../actionTypes";
import moment from "moment";

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
      context.commit(SET_ALL_PROGRAMS_MUT, []);

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

export const getBillCyclesRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    let query = `activeOnly=${payload?.activeOnly || false}`;

    const result = await getCall(
      GET_BILL_CYCLES_URL,
      "",
      query,
      GET_BILL_CYCLES_URL.headers ? {} : null
    );

    if (result.data.success) {
      console.log({ result });
      context.commit(SET_BILLING_CYCLES_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllProgramsRequest = async (context, { responseCallback }) => {
  try {
    let query = "";
    // `activeOnly=${payload?.activeOnly || false}`;

    const result = await getCall(
      GET_ALL_PROGRAMS_URL,
      "",
      query,
      GET_ALL_PROGRAMS_URL.headers ? {} : null
    );

    if (result.data.success) {
      context.commit(SET_PROGRAMS_MUT, result.data?.data);
      context.commit(SET_PROGRAMS_TREE_MUT, result.data?.data);

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
      payload?.payloadData,
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

export const getReceiptsByDateRequest = async (
  context,
  {
    payload: {
      validOnly = false,
      fromDate = moment().subtract(2, "months").toISOString(),
      toDate = moment().toISOString(),
      colTypeId = 1,
    },
    responseCallback,
  }
) => {
  try {
    let query = `validOnly=${validOnly}&fromDate=${fromDate}&toDate=${toDate}&colTypeId=${colTypeId}`;
    console.log({ query });

    const result = await getCall(
      GET_RECEIPTS_BY_DATE_URL,
      "",
      query,
      GET_RECEIPTS_BY_DATE_URL.headers ? {} : null
    );
    if (result.data.success) {
      context.commit(SET_COLLECTIONS_BY_DATE_MUT, result.data?.data);

      responseCallback(true, result.data);
    } else {
      context.commit(SET_COLLECTIONS_BY_DATE_MUT, []);

      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const cancelReceiptRequest = async (
  context,
  { payload: { receiptId = null }, responseCallback }
) => {
  const query = receiptId ? `receiptId=${receiptId}` : "";
  try {
    const result = await postCall(
      CANCEL_RECEIPT_URL,
      {},
      "",
      query,
      CANCEL_RECEIPT_URL.headers ? {} : null
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
