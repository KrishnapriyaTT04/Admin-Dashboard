import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';

// Assuming your slice is imported as * as actionType
import * as actionType from './slice';

// Base API endpoint for users
const USER_API_BASE = `${appConfig.ip}`;

// --- Sagas ---

// 1. Get Users Saga
function* getUsersSaga(action) {
    // Retrieve token from local storage (or wherever it's stored)
    const tokenData = JSON.parse(localStorage.getItem('klooToken'));
    const accessToken = tokenData?.accessToken;

    try {
        const params = {
            // action.payload should be the query string, e.g., 'users?filter={"skip":0...}'
            api: `${USER_API_BASE}/${action.payload}`,
            method: 'GET',
            successAction: actionType.getUsersSuccess(),
            failAction: actionType.getUsersFail(),
            authorization: `Bearer`,
            token: accessToken,
        };

        const res = yield call(commonApi, params);

        if (res && (Array.isArray(res) || res?.data)) {
            const userData = res.data || res;
            yield put(actionType.getUsersSuccess(userData));
        } else {
            // Handle case where API returns a success status but unexpected body
            yield put(actionType.getUsersSuccess([]));
        }

    } catch (error) {
        console.error('Fetch Users failed:', error);

        yield put(actionType.getUsersFail({
            message: error.message || 'Failed to fetch users.',
            status: error.response?.status || 500
        }));
        yield call(toast.error, 'Failed to load user list.', { autoClose: 3000 });
    }
}

// 2. Get User Count Saga
function* getUserCount() {
    const tokenData = JSON.parse(localStorage.getItem('klooToken'));
    const accessToken = tokenData?.accessToken;
    try {
        const params = {
            api: `${USER_API_BASE}/users/count`,
            method: 'GET',
            successAction: actionType.getUserCountSuccess(),
            failAction: actionType.getUserCountFail(),
            authorization: `Bearer`,
            token: accessToken,
        };
        const res = yield call(commonApi, params);
        
        // CRITICAL: You must dispatch success with the result if you want the reducer to update the count
        if (res) {
             yield put(actionType.getUserCountSuccess(res));
        }

    } catch (error) {
        console.error('Fetch User Count failed:', error);
        yield put(actionType.getUserCountFail({
            message: error.message || 'Failed to fetch user count.',
            status: error.response?.status || 500
        }));
        yield call(toast.error, 'Failed to load user count.', { autoClose: 3000 });
    }
}

// 3. Update User Saga (Status Change) - NEW LOGIC ADDED
function* updateUserSaga(action) {
    const tokenData = JSON.parse(localStorage.getItem('klooToken'));
    const accessToken = tokenData?.accessToken;
    
    try {
        const payload = action.payload;
        const userData = payload.values; // { id: '...', status: 'new_status' }
        const getUrl = payload.getReqestUrl; // The URL to re-fetch the list

        if (!userData.id) {
            return;
        }

        let updateBody = { ...userData };
        delete updateBody.id; // API usually doesn't need ID in the PATCH body

        const params = {
            // API endpoint to PATCH a user's status
            api: `${USER_API_BASE}/users/${userData.id}`,
            method: 'PATCH',
            body: JSON.stringify(updateBody),
            successAction: actionType.updateUserSuccess(),
            failAction: actionType.updateUserFail(),
            authorization: 'Bearer',
            token: accessToken
        };

        const res = yield call(commonApi, params);
        
        // Assuming success returns the updated object or a confirmation
        if (res) {
            // Dispatch success to update the Redux state (list array)
            yield put(actionType.updateUserSuccess(res)); 
            
            // Show success toast
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
        yield put(actionType.updateUserFail({
            message: error.message || 'Failed to update user status.',
            status: error.response?.status || 500
        }));
        yield call(toast.error, `Status update failed: ${error.message}`, { autoClose: 3000 });
    }
}


// --- Watcher Saga ---

export default function* userActionWatcher() {
    yield takeEvery(actionType.getUsers.type, getUsersSaga);
    yield takeEvery(actionType.getUserCount.type, getUserCount);
    // CRITICAL: Watch for the updateUser action
    yield takeEvery(actionType.updateUser.type, updateUserSaga); 
}