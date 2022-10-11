import { put, takeLatest, call } from "redux-saga/effects";
import * as actions from "./authActionsTypes";
import { api } from "../api/commonApi";

export const loginUser = function* ({ payload }) {
  try {
    const result = yield call(api.loginUser, payload);
    yield put({
      type: actions.LOGIN_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.LOGIN_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const authSagaWrapper = function* () {
  yield* [takeLatest(actions.LOGIN_DETAILS, loginUser)];
};
