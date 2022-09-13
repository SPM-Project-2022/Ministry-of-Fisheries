import * as actions from "./authActionsTypes";

export const authReducer = (
  state = {
    login: {
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
        login: {
          ...state.login,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_FAILED:
      return {
        ...state,
        login: {
          ...state.login,
          fetching: false,
          error: { status: true, message: "" },
          success: { status: false, message: "" },
        },
      };

    default:
      return state;
  }
};
