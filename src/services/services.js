/* eslint-disable */
import { API_URL } from "@/constants";
import axios from "axios";

export const getCall = async (url, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}${url}`, {
        headers: headers ? { ...headers } : {},
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
export const deleteCall = async (url, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${API_URL}${url}`, {
        headers: headers ? { ...headers } : {},
      });

      resolve(response);
    } catch (e) {
      reject(null);
    }
  });

export const postCall = async (url, data, headers) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("data", data);
      const response = await axios.post(`${API_URL}${url}`, data, {
        headers: headers ? { ...headers } : {},
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
