import { get, post, put, patch, deleteRequest } from "./httpMethods";

export const api = {
  loginUser: (payload) => {
    return post("/api/auth/login", payload);
  },
  getSalaryDetails: () => {
    return get("/salary");
  },
  submitSalary: (id, payload) => {
    return put(`/salary/status/${id}`, payload);
  },
  notifyUserEmail: (payload) => {
    return post("/salary/notify-user", payload);
  },
  updateSalary: (id, payload) => {
    return put(`/salary//${id}`, payload);
  },
  deleteSalary: (id) => {
    return deleteRequest(`/salary/${id}`);
  },
};
