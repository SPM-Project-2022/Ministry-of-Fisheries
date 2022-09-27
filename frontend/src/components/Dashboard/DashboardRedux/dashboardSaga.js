import { put, takeLatest, call } from "redux-saga/effects";
import * as actions from "./dashboardActionsTypes";
import { api } from "../../../api/commonApi";

const getSalaryDetails = function* () {
  try {
    const result = yield call(api.getSalaryDetails);
    yield put({
      type: actions.FETCH_SALARY_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.FETCH_SALARY_DETAILS_FAILED,
      message: e?.response?.data?.message,
      code: e?.response?.status,
    });
  }
};

const submitSalary = function* ({ payload: { id, payload } }) {
  try {
    const result = yield call(api.submitSalary, id, payload);
    yield put({
      type: actions.SUBMIT_SALARY_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.SUBMIT_SALARY_DETAILS_FAILED,
      message: e?.response?.data?.message,
      code: e?.response?.status,
    });
  }
};

const updateSalary = function* ({ payload: { id, payload } }) {
  try {
    const result = yield call(api.updateSalary, id, payload);
    yield put({
      type: actions.UPDATE_MASTER_SALARY_TABLE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.UPDATE_MASTER_SALARY_TABLE_DETAILS_FAILED,
      message: e?.response?.data?.message,
      code: e?.response?.status,
    });
  }
};

const deleteSalary = function* ({ payload: { id } }) {
  try {
    const result = yield call(api.deleteSalary, id);
    yield put({
      type: actions.DELETE_MASTER_SALARY_TABLE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.DELETE_MASTER_SALARY_TABLE_DETAILS_FAILED,
      message: e?.response?.data?.message,
      code: e?.response?.status,
    });
  }
};

const notifyUserEmail = function* ({ payload }) {
  try {
    const result = yield call(api.notifyUserEmail, payload);
    yield put({
      type: actions.NOTIFY_USER_EMAIL_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.NOTIFY_USER_EMAIL_DETAILS_FAILED,
      message: e?.response?.data?.message,
      code: e?.response?.status,
    });
  }
};

export const getDashboardSagaWrapper = function* () {
  yield* [
    takeLatest(actions.FETCH_SALARY_DETAILS, getSalaryDetails),
    takeLatest(actions.SUBMIT_SALARY_DETAILS, submitSalary),
    takeLatest(actions.NOTIFY_USER_EMAIL_DETAILS, notifyUserEmail),
    takeLatest(actions.UPDATE_MASTER_SALARY_TABLE_DETAILS, updateSalary),
    takeLatest(actions.DELETE_MASTER_SALARY_TABLE_DETAILS, deleteSalary),
  ];
};
