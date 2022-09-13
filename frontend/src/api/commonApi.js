import { get, post, put, patch, deleteRequest } from "./httpMethods";

export const api = {
  loginUser: (payload) => {
    return post("/api/auth/login", payload);
  },
};
