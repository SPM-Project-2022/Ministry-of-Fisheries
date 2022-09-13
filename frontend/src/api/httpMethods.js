import axios from "axios";
const access_token = localStorage.getItem("authToken");

export const get = async (path, config) =>
  await axios
    .get(`${path}`, { headers: config })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const post = async (path, body) =>
  await axios
    .post(`${path}`, body, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const put = async (path, body) =>
  await axios
    .put(`${path}`, body, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const patch = async (path, body) =>
  await axios
    .patch(`${path}`, body, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const deleteRequest = async (path, payload, config) =>
  await axios
    .delete(`${path}`, { data: payload, headers: config })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
