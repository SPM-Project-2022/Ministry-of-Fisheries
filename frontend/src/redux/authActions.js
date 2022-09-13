import * as actions from "./authActionsTypes";

export const loginUser = (payload) => {
  return { type: actions.LOGIN_DETAILS, payload };
};

export const logout = () => {
  return { type: actions.LOG_OUT };
};
