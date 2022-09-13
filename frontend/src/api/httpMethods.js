import axios from "axios";
const access_token = localStorage.getItem("authToken");

export const get = (path, config) =>
  axios
    .get(`${path}`, { headers: config })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const post = (path, body) =>
  axios
    .post(`${path}`, body, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const put = (path, body) =>
  axios
    .put(`${path}`, body, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const patch = (path, body) =>
  axios
    .patch(`${path}`, body, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const deleteRequest = (path, payload, config) =>
  axios
    .delete(`${path}`, { data: payload, headers: config })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
