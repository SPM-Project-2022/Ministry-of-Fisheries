import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./redux/authReducer";
import * as actions from "./redux/authActionsTypes";

const appReducer = (history) =>
  combineReducers({
    auth: authReducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === actions.LOG_OUT) {
    state = undefined;
  }

  return appReducer(history)(state, action);
};

export default createRootReducer;
