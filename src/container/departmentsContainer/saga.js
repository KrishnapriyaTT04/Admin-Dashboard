// import { takeLatest, put, call } from 'redux-saga/effects';
// import axios from 'axios';

// import {
//   getDepartmentsRequest,
//   getDepartmentsSuccess,
//   getDepartmentsFailure,
//   addDepartmentRequest,
//   addDepartmentSuccess,
//   addDepartmentFailure,
//   deleteDepartmentRequest,
//   deleteDepartmentSuccess,
//   deleteDepartmentFailure
// } from './slice';


// // GET Departments
// function* getDepartmentsSaga() {
//   try {
//     const res = yield call(() =>
//       axios.get('/api/admin/departments', {
//         withCredentials: true
//       })
//     );

//     yield put(getDepartmentsSuccess(res.data.departments));
//   } catch (err) {
//     yield put(getDepartmentsFailure(err.response?.data?.message));
//   }
// }


// // ADD Department
// function* addDepartmentSaga(action) {
//   try {
//     const res = yield call(() =>
//       axios.post(
//         '/api/admin/departments',
//         action.payload,
//         { withCredentials: true }
//       )
//     );

//     yield put(addDepartmentSuccess(res.data.department));
//   } catch (err) {
//     yield put(addDepartmentFailure(err.response?.data?.message));
//   }
// }


// // DELETE Department
// function* deleteDepartmentSaga(action) {
//   try {
//     yield call(() =>
//       axios.delete(`/api/admin/departments/${action.payload}`, {
//         withCredentials: true
//       })
//     );

//     yield put(deleteDepartmentSuccess(action.payload));
//   } catch (err) {
//     yield put(deleteDepartmentFailure(err.response?.data?.message));
//   }
// }


// export default function* departmentSaga() {
//   yield takeLatest(getDepartmentsRequest.type, getDepartmentsSaga);
//   yield takeLatest(addDepartmentRequest.type, addDepartmentSaga);
//   yield takeLatest(deleteDepartmentRequest.type, deleteDepartmentSaga);
// }



import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  getDepartmentsRequest,
  getDepartmentsSuccess,
  getDepartmentsFailure,
  addDepartmentRequest,
  addDepartmentSuccess,
  addDepartmentFailure,
  deleteDepartmentRequest,
  deleteDepartmentSuccess,
  deleteDepartmentFailure
} from './slice';


// GET ALL
function* getDepartmentsSaga() {
  try {
    const res = yield call(() =>
      axios.get('/api/admin/departments/getall', {
        withCredentials: true
      })
    );

    yield put(getDepartmentsSuccess(res.data.departments));
  } catch (err) {
    yield put(getDepartmentsFailure(err.response?.data?.message));
  }
}


// CREATE
function* addDepartmentSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(
        '/api/admin/departments/create',
        action.payload,
        { withCredentials: true }
      )
    );

    yield put(addDepartmentSuccess(res.data.department));
  } catch (err) {
    yield put(addDepartmentFailure(err.response?.data?.message));
  }
}


// DELETE
function* deleteDepartmentSaga(action) {
  try {
    yield call(() =>
      axios.delete(
        `/api/admin/departments/delete/${action.payload}`,
        { withCredentials: true }
      )
    );

    yield put(deleteDepartmentSuccess(action.payload));
  } catch (err) {
    yield put(deleteDepartmentFailure(err.response?.data?.message));
  }
}


// WATCHER
export default function* departmentSaga() {
  yield takeLatest(getDepartmentsRequest.type, getDepartmentsSaga);
  yield takeLatest(addDepartmentRequest.type, addDepartmentSaga);
  yield takeLatest(deleteDepartmentRequest.type, deleteDepartmentSaga);
}