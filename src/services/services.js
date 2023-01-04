/* eslint-disable */
import { GET_JWT_TOKEN } from "@/action/actionTypes";
import { API_URL } from "@/constants";
import { store } from "@/store/store";
import axios from "axios";
import { computed } from "vue";

const USER_TOKEN = computed(() => {
  return store.getters[GET_JWT_TOKEN];
});
const token = (value) => {
  return {
    Authorization: `Bearer ${value}`,
  };
};
export const getCall = async (urlObj, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}${urlObj.url}`, {
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

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
export const deleteCall = async (urlObj, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${API_URL}${url}`, {
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
      reject(null);
    }
  });

export const postCall = async (urlObj, data = {}, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("data", data);
      const response = await axios.post(`${API_URL}${urlObj.url}`, data, {
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
      console.log("err", e);

      reject(e);
    }
  });
export const patchCall = async (url, data, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(`${API_URL}${url}`, data, {
        headers: headers ? { ...headers } : {},
      });

      resolve(response);
    } catch (e) {
      reject(null);
    }
  });
