import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';

import * as actionType from './slice';

// Base API endpoint for users
const USER_API_BASE = `${appConfig.ip}`;

function* getUsersSaga(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  try {
    const params = {
      api: `${USER_API_BASE}/${action.payload}`,
      method: 'GET',
      successAction: actionType.getUsersSuccess(),
      failAction: actionType.getUsersFail(),
      authorization: `Bearer`,
      token: accessToken
    };

    const res = yield call(commonApi, params);

    if (res && (Array.isArray(res) || res?.data)) {
      const userData = res.data || res;
      yield put(actionType.getUsersSuccess(userData));
    } else {
      yield put(actionType.getUsersSuccess([]));
    }
  } catch (error) {
    console.error('Fetch Users failed:', error);

    yield put(
      actionType.getUsersFail({
        message: error.message || 'Failed to fetch users.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load user list.', { autoClose: 3000 });
  }
}

function* getUserCount(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    const params = {
      api: `${USER_API_BASE}/${action.payload}`,
      method: 'GET',
      successAction: actionType.getUserCountSuccess(),
      failAction: actionType.getUserCountFail(),
      authorization: `Bearer`,
      token: accessToken
    };
    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.getUserCountSuccess(res));
    }
  } catch (error) {
    console.error('Fetch User Count failed:', error);
    yield put(
      actionType.getUserCountFail({
        message: error.message || 'Failed to fetch user count.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load user count.', { autoClose: 3000 });
  }
}

export function* getDistricts(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  try {
    const params = {
      api: `${USER_API_BASE}/master-districts`,
      method: 'GET',
      successAction: actionType.getDistrictsSuccess(),
      failAction: actionType.getDistrictsFail(),
      authorization: 'Bearer',
      token: accessToken
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.getDistrictsSuccess(res));
    } else {
      throw new Error('Invalid response data structure for districts.');
    }
  } catch (error) {
    console.error('Fetch Districts failed:', error);
    yield put(
      actionType.getDistrictsFail({
        message: error.message || 'Failed to fetch districts.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load districts.', { autoClose: 3000 });
  }
}

// --- Add User Saga ---
function* createUserSaga(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  try {
    const body = JSON.stringify(action.payload); // formValues sent from component

    const params = {
      api: `${USER_API_BASE}/users/signup/admin`,
      method: 'POST',
      body,
      successAction: actionType.createUserSuccess(),
      failAction: actionType.createUserFail(),
      authorization: 'Bearer',
      token: accessToken
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.createUserSuccess(res));
      yield call(toast.success, 'User created successfully!', { autoClose: 3000 });
    } else {
      throw new Error('Invalid create user response');
    }
  } catch (error) {
    console.error('Create User failed:', error);

    yield put(
      actionType.createUserFail({
        message: error.message || 'Failed to create user',
        status: error.response?.status || 500
      })
    );

    yield call(toast.error, 'Failed to create user.', { autoClose: 3000 });
  }
}

function* updateUserSaga(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  try {
    const payload = action.payload;
    const userData = payload.values;
    const getUrl = payload.getReqestUrl;

    if (!userData.id) {
      return;
    }

    let updateBody = { ...userData };
    delete updateBody.id;
    let params;
    if (updateBody.status == 'inactive') {
      params = {
        api: `${USER_API_BASE}/users/inactive/${userData.id}`,
        method: 'PATCH',
        // body: JSON.stringify(updateBody),
        successAction: actionType.updateUserSuccess(),
        failAction: actionType.updateUserFail(),
        authorization: 'Bearer',
        token: accessToken
      };
    } else {
      params = {
        api: `${USER_API_BASE}/users/${userData.id}`,
        method: 'PATCH',
        body: JSON.stringify(updateBody),
        successAction: actionType.updateUserSuccess(),
        failAction: actionType.updateUserFail(),
        authorization: 'Bearer',
        token: accessToken
      };
    }

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.updateUserSuccess(res));

      yield call(toast.success, 'User status updated successfully!', { autoClose: 3000 });

      // Re-fetch the user list to ensure table data is current, using the saved URL
      if (getUrl) {
        yield put(actionType.getUsers(getUrl));
      }
    } else {
      throw new Error('User update response was empty.');
    }
  } catch (error) {
    console.error('Update User failed:', error);
    yield put(
      actionType.updateUserFail({
        message: error.message || 'Failed to update user status.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, `Status update failed: ${error.message}`, { autoClose: 3000 });
  }
}

// --- Watcher Saga ---

export default function* userActionWatcher() {
  yield takeEvery(actionType.getUsers.type, getUsersSaga);
  yield takeEvery(actionType.getUserCount.type, getUserCount);
  // CRITICAL: Watch for the updateUser action
  yield takeEvery(actionType.updateUser.type, updateUserSaga);
  yield takeEvery(actionType.getDistricts.type, getDistricts);
  yield takeEvery(actionType.createUser.type, createUserSaga);
}
