// import { takeEvery, call, put } from 'redux-saga/effects';
// import commonApi from '../api';
// import appConfig from '../../config';
// import * as actionType from './slice';

// function* fetchStaff() {
//   try {
//     const params = {
//       api: `${appConfig.ip}/staff/signup`,
//       method: 'POST',
//       successAction: actionType.addStaffSuccess,
//       failAction: actionType.addStaffFail,
//       authorization: `Bearer ${localStorage.getItem("token")}`
//     };

//     const res = yield call(commonApi, params);

//     if (res) {
//       yield put(actionType.addStaffSuccess(res));
//     }

//   } catch (error) {
//     yield put(actionType.addStaffFail(error.message));
//   }
// }

// export default function* staffActionWatcher() {
//   yield takeEvery(actionType.getStaff.type, fetchStaff);
// }



import { takeEvery, call, put } from 'redux-saga/effects';
import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

/* ================= GET STAFF ================= */
function* fetchStaff() {
  try {
    const params = {
      api: `${appConfig.ip}/staff`, // ✅ correct GET endpoint
      method: 'GET',
      successAction: actionType.getStaffSuccess(), // ✅ must call
      failAction: actionType.getStaffFail(),
      authorization: null // ✅ cookie-based auth (no Bearer)
    };

    yield call(commonApi, params); // ✅ commonApi handles dispatch

  } catch (error) {
    yield put(
      actionType.getStaffFail(
        error.message || 'Failed to fetch staff'
      )
    );
  }
}

/* ================= ADD STAFF ================= */
function* addStaff(action) {
  try {
    const params = {
      api: `${appConfig.ip}/staff/signup`, // ✅ POST create route
      method: 'POST',
      successAction: actionType.addStaffSuccess(), // ✅ must call
      failAction: actionType.addStaffFail(),
      authorization: null, // ✅ cookie handles auth
      body: JSON.stringify(action.payload) // ✅ send form data
    };

    yield call(commonApi, params);

    // ✅ refresh staff list after adding
    yield put(actionType.getStaff());

  } catch (error) {
    yield put(
      actionType.addStaffFail(
        error.message || 'Failed to add staff'
      )
    );
  }
}

/* ================= WATCHER ================= */
export default function* staffActionWatcher() {
  yield takeEvery(actionType.getStaff.type, fetchStaff);
  yield takeEvery(actionType.addStaff.type, addStaff);
}