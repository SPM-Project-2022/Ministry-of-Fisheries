import * as actions from "./dashboardActionsTypes";

export const dashboardReducer = (
  state = {
    salary: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
    submitSalary: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
    updateSalary: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
    deleteSalary: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
    notifyUserEmail: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
  },
  action
) => {
  switch (action.type) {
    case actions.FETCH_SALARY_DETAILS:
      return {
        ...state,
        salary: {
          ...state.salary,
          fetching: true,
          data: action.payload,
          error: { status: false, message: "" },
        },
      };
    case actions.FETCH_SALARY_DETAILS_SUCCESS:
      return {
        ...state,
        salary: {
          ...state.salary,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.FETCH_SALARY_DETAILS_FAILED:
      return {
        ...state,
        salary: {
          ...state.salary,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };

    case actions.SUBMIT_SALARY_DETAILS:
      return {
        ...state,
        submitSalary: {
          ...state.submitSalary,
          fetching: true,
          data: action.payload,
          error: { status: false, message: "" },
        },
      };
    case actions.SUBMIT_SALARY_DETAILS_SUCCESS:
      return {
        ...state,
        submitSalary: {
          ...state.submitSalary,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.SUBMIT_SALARY_DETAILS_FAILED:
      return {
        ...state,
        submitSalary: {
          ...state.submitSalary,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };
    case actions.UPDATE_MASTER_SALARY_TABLE_DETAILS:
      return {
        ...state,
        updateSalary: {
          ...state.updateSalary,
          fetching: true,
          data: action.payload,
          error: { status: false, message: "" },
        },
      };
    case actions.UPDATE_MASTER_SALARY_TABLE_DETAILS_SUCCESS:
      return {
        ...state,
        updateSalary: {
          ...state.updateSalary,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.UPDATE_MASTER_SALARY_TABLE_DETAILS_FAILED:
      return {
        ...state,
        updateSalary: {
          ...state.updateSalary,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };
    case actions.DELETE_MASTER_SALARY_TABLE_DETAILS:
      return {
        ...state,
        deleteSalary: {
          ...state.deleteSalary,
          fetching: true,
          data: action.payload,
          error: { status: false, message: "" },
        },
      };
    case actions.DELETE_MASTER_SALARY_TABLE_DETAILS_SUCCESS:
      return {
        ...state,
        deleteSalary: {
          ...state.deleteSalary,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.DELETE_MASTER_SALARY_TABLE_DETAILS_FAILED:
      return {
        ...state,
        deleteSalary: {
          ...state.deleteSalary,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };
    case actions.NOTIFY_USER_EMAIL_DETAILS:
      return {
        ...state,
        notifyUserEmail: {
          ...state.notifyUserEmail,
          fetching: true,
          data: action.payload,
          error: { status: false, message: "" },
        },
      };
    case actions.NOTIFY_USER_EMAIL_DETAILS_SUCCESS:
      return {
        ...state,
        notifyUserEmail: {
          ...state.notifyUserEmail,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.NOTIFY_USER_EMAIL_DETAILS_FAILED:
      return {
        ...state,
        notifyUserEmail: {
          ...state.notifyUserEmail,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };

    case actions.CLEAR_SUBMIT_SALARY:
      return {
        submitSalary: {
          fetching: false,
          error: { status: false, message: "" },
          data: [],
          success: { status: false, message: "" },
        },
      };
    default:
      return state;
  }
};
