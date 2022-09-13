import * as actions from "./dashboardActionsTypes";

export const getSalaryDetails = () => {
  return {
    type: actions.FETCH_SALARY_DETAILS,
  };
};

export const submitSalary = (id, payload) => {
  return {
    type: actions.SUBMIT_SALARY_DETAILS,
    payload: { id, payload },
  };
};

export const notifyUserEmail = (payload) => {
  return {
    type: actions.FETCH_SALARY_DETAILS,
    payload,
  };
};

export const clearSubmitSalary = () => {
  return {
    type: actions.CLEAR_SUBMIT_SALARY,
  };
};
