/* eslint-disable */
import { GET_JWT_TOKEN, LOGOUT_SUCCESS } from "@/action/actionTypes";
import { API_URL, LOGIN_VIEW_URL, toastMessage } from "@/constants";
import router from "@/router";
import { store } from "@/store/store";
import axios from "axios";

import { computed } from "vue";

const USER_TOKEN = computed(() => {
  return store.getters[GET_JWT_TOKEN];
});

export const getCall = async (urlObj, params = "", query = "", headers) =>
  new Promise(async (resolve, reject) => {
    let Url = `${urlObj.url}`;
    if (params) {
      Url = `${Url}/` + params;
    }
    if (query) {
      Url = `${Url}?` + query;
    }
    try {
      const response = await axios.get(`${API_URL}${Url}`, {
        headers: headers
          ? {
              ...headers,
            }
          : {
              ...(urlObj?.accesstoken
                ? { Authorization: `Bearer ${USER_TOKEN.value}` }
                : {}),
            },
      });
      if (response?.data?.length && response.status === 200) {
        let data = {
          success: true,
          data: response.data,
        };
        resolve({ data });
      }
      resolve(response);
    } catch (e) {
      toastMessage("Something Went Wrong", false);
      if (e?.response?.status === 401) {
        store.commit(LOGOUT_SUCCESS);
        router.replace(LOGIN_VIEW_URL.url);
      }
      reject(e);
    }
  });
export const deleteCall = async (urlObj, params = "", query = "", headers) =>
  new Promise(async (resolve, reject) => {
    let Url = `${urlObj.url}`;
    if (params) {
      Url = `${Url}/` + params;
    }
    if (query) {
      Url = `${Url}?` + query;
    }
    try {
      const response = await axios.delete(`${API_URL}${Url}`, {
        headers: headers
          ? { ...headers }
          : {
              ...(urlObj?.accesstoken
                ? { Authorization: `Bearer ${USER_TOKEN.value}` }
                : {}),
            },
      });

      resolve(response);
    } catch (e) {
      toastMessage("Something Went Wrong", false);

      if (e?.response?.status === 401) {
        store.commit(LOGOUT_SUCCESS);
        router.replace(LOGIN_VIEW_URL.url);
      }
      reject(e);
    }
  });

export const postCall = async (
  urlObj,
  data = {},
  params = "",
  query = "",
  headers
) =>
  new Promise(async (resolve, reject) => {
    let Url = `${urlObj.url}`;
    if (params) {
      Url = `${Url}/` + params;
    }
    if (query) {
      Url = `${Url}?` + query;
    }
    try {
      console.log("data", data);
      const response = await axios.post(`${API_URL}${Url}`, data, {
        headers: headers
          ? { ...headers }
          : {
              ...(urlObj?.accesstoken
                ? { Authorization: `Bearer ${USER_TOKEN.value}` }
                : {}),
            },
      });
      console.log("response", response);
      resolve(response);
    } catch (e) {
      toastMessage("Something Went Wrong", false);

      console.log("err", e);
      if (e?.response?.status === 401) {
        store.commit(LOGOUT_SUCCESS);
        router.replace(LOGIN_VIEW_URL.url);
      }
      reject(e);
    }
  });
export const patchCall = async (
  urlObj,
  data,
  params = "",
  query = "",
  headers
) =>
  new Promise(async (resolve, reject) => {
    let Url = `${urlObj.url}`;
    if (params) {
      Url = `${Url}/` + params;
    }
    if (query) {
      Url = `${Url}?` + query;
    }
    try {
      const response = await axios.put(`${API_URL}${Url}`, data, {
        headers: headers
          ? { ...headers }
          : {
              ...(urlObj?.accesstoken
                ? { Authorization: `Bearer ${USER_TOKEN.value}` }
                : {}),
            },
      });

      resolve(response);
    } catch (e) {
      toastMessage("Something Went Wrong", false);

      if (e?.response?.status === 401) {
        store.commit(LOGOUT_SUCCESS);
        router.replace(LOGIN_VIEW_URL.url);
      }
      reject(null);
    }
  });
