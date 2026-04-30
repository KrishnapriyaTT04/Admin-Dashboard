import { takeEvery, call, put } from 'redux-saga/effects';
import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

/* ================= GET STAFF ================= */
function* fetchStaff() {
  try {
    const params = {
      api: `${appConfig.ip}/staff/all`,
      method: 'GET',
      successAction: actionType.getStaffSuccess, // ✅ reference, not called
      failAction: actionType.getStaffFail,
      authorization: null
    };

    yield call(commonApi, params);

  } catch (error) {
    yield put(actionType.getStaffFail(error.message || 'Failed to fetch staff'));
  }
}

/* ================= ADD STAFF ================= */
function* addStaff(action) {
  try {
    const params = {
      api: `${appConfig.ip}/staff/signup`,
      method: 'POST',
      successAction: actionType.addStaffSuccess, // ✅ fixed — no ()
      failAction: actionType.addStaffFail,        // ✅ fixed — no ()
      authorization: null,
      body: JSON.stringify(action.payload)
    };

    yield call(commonApi, params);
    yield put(actionType.getStaff());

  } catch (error) {
    yield put(actionType.addStaffFail(error.message || 'Failed to add staff'));
  }
}

/* ================= EDIT STAFF ================= */
function* editStaff(action) {
  try {
    const { id, ...data } = action.payload;

    const params = {
      api: `${appConfig.ip}/staff/${id}`,
      method: 'PUT',
      successAction: actionType.editStaffSuccess,
      failAction: actionType.editStaffFail,
      authorization: null,
      body: JSON.stringify(data)
    };

    yield call(commonApi, params);
    yield put(actionType.getStaff()); // ✅ refresh list after edit

  } catch (error) {
    yield put(actionType.editStaffFail(error.message || 'Failed to update staff'));
  }
}

/* ================= DELETE STAFF ================= */
function* deleteStaff(action) {
  try {
    const params = {
      api: `${appConfig.ip}/staff/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteStaffSuccess,
      failAction: actionType.deleteStaffFail,
      authorization: null
    };

    yield call(commonApi, params);
    yield put(actionType.getStaff()); // ✅ refresh list after delete

  } catch (error) {
    yield put(actionType.deleteStaffFail(error.message || 'Failed to delete staff'));
  }
}

/* ================= WATCHER ================= */
export default function* staffActionWatcher() {
  yield takeEvery(actionType.getStaff.type, fetchStaff);
  yield takeEvery(actionType.addStaff.type, addStaff);
  yield takeEvery(actionType.editStaff.type, editStaff);
  yield takeEvery(actionType.deleteStaff.type, deleteStaff);
}