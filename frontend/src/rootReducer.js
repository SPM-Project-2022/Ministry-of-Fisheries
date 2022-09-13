import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./redux/authReducer";
import { dashboardReducer } from "./components/Dashboard/DashboardRedux/dashboardReducer";
import * as actions from "./redux/authActionsTypes";

const appReducer = (history) =>
  combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === actions.LOG_OUT) {
    state = undefined;
  }

  return appReducer(history)(state, action);
};

export default createRootReducer;
