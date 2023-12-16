import {
  GET_ACCESS_TYPE_URL,
  GET_MENU_BY_USER_GROUP_URL,
  GET_USER_GROUP_BY_ID_URL,
  // GET_USER_GROUP_BY_ID_URL,
  GET_USER_GROUP_URL,
  LOGIN_URL,
  SAVE_USER_GROUP_URL,
} from "@/constants";
import { getCall, postCall } from "@/services/services";
import { LOGIN_SUCCESS, SET_USER_GROUPS_MUT } from "../actionTypes";

export const loginRequest = async (context, { payload, responseCallback }) => {
  try {
    const result = await postCall(
      LOGIN_URL,
      payload,
      LOGIN_URL.headers ? {} : null
    );

    if (result.data.data?.isAuthenticated) {
      context.commit(LOGIN_SUCCESS, result.data?.data);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUserGroupsRequest = async (
  context,
  { payload, responseCallback }
) => {
  const activeOnly = payload?.activeOnly || false;
  try {
    const result = await getCall(
      GET_USER_GROUP_URL,
      "",
      `activeOnly=${activeOnly}`,
      GET_USER_GROUP_URL.headers ? {} : null
    );
    console.log({ result });

    if (result.data.data?.length) {
      let userGroups = [];
      for (const item of result.data.data) {
        const result1 = await getCall(
          GET_MENU_BY_USER_GROUP_URL,
          "",
          `userGroupId=${item?.userGroupId}`,
          GET_MENU_BY_USER_GROUP_URL.headers ? {} : null
        );

        let menus = result1?.data?.data?.map((item) => {
          return {
            ...item,
            isActiveLabel: item?.isActive ? "Yes" : "No",
          };
        });

        userGroups.push({ ...item, assignedMenus: menus || [] });
      }
      console.log({ userGroups });

      context.commit(SET_USER_GROUPS_MUT, userGroups);
      responseCallback(true, result.data);
    } else {
      responseCallback(false, result.data);
    }

    return result;
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllAccessTypeRequest = async (
  context,
  { responseCallback }
) => {
  try {
    const result = await getCall(
      GET_ACCESS_TYPE_URL,
      ``,
      ``,
      GET_ACCESS_TYPE_URL.headers ? {} : null
    );
    console.log({ result });
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

export const getUserGroupByIdRequest = async (
  context,
  { payload, responseCallback }
) => {
  const withPrivileges = payload?.withPrivileges || false;
  const userGroupId = payload?.id;
  try {
    const result = await getCall(
      GET_USER_GROUP_BY_ID_URL,
      ``,
      `userGroupId=${userGroupId}&withPrivileges=${withPrivileges}`,
      GET_USER_GROUP_BY_ID_URL.headers ? {} : null
    );
    console.log({ result });
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

export const saveUserGroupRequest = async (
  context,
  { payload, responseCallback }
) => {
  try {
    const result = await postCall(
      SAVE_USER_GROUP_URL,
      payload,
      ``,
      "",
      SAVE_USER_GROUP_URL.headers ? {} : null
    );
    console.log({ result });
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
