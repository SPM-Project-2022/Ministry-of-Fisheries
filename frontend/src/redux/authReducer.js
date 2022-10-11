import * as actions from "./authActionsTypes";

export const authReducer = (
  state = {
    loginMinistry: {
      fetching: false,
      error: { status: false, message: "" },
      data: [],
    },
  },
  action
) => {
  switch (action.type) {
    case actions.LOGIN_DETAILS:
      return {
        ...state,
        loginMinistry: {
          ...state.loginMinistry,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        loginMinistry: {
          ...state.loginMinistry,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_FAILED:
      return {
        ...state,
        loginMinistry: {
          ...state.loginMinistry,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.LOG_OUT:
      return {
        ...state.loginMinistry,
        fetching: false,
        error: { status: true, message: "" },
        success: { status: false, message: "" },
      };

    default:
      return state;
  }
};
