import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; // Assuming this is your common API utility
import appConfig from '../../config';
// Import user actions from the userSlice
import * as actionType from './slice'; 


// Base API endpoint for users (adjust as needed)
// Assuming user API is at a different endpoint than facilities
const USER_API_BASE = `${appConfig.ip}`; 
const FACILITY_API_BASE = `${appConfig.ip}`; 



// 1. Get Users Saga (FETCH LIST ONLY)
function* getUsersSaga(action) {
          console.log('Fetch Users failed: No access token found.----------------');

  // Retrieve token from local storage (or wherever it's stored)
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  // if (!accessToken) {
  //     console.error('Fetch Users failed: No access token found.');
  //     // Dispatch failure immediately if no token is available
  //     yield put(actionType.getUsersFail({ 
  //         message: 'Authentication failed: No token found.', 
  //         status: 401 
  //     }));
  //     yield call(toast.error, 'Please log in to load user list.', { autoClose: 3000 });
  //     return; // Exit the saga
  // }
            console.log('Fetch Users failed: No access token found.--------2--------');


  try {
    const params = {
      // 🚨 Adjust the API endpoint as required for fetching users
      api: `${FACILITY_API_BASE}/${action.payload}`, 
      method: 'GET',
       successAction: actionType.getUsersSuccess(),
      failAction: actionType.getUsersFail(),
      authorization: `Bearer`, // Set the authorization type
      token: accessToken,       // Pass the access token
    };
                console.log('Fetch Users failed: No access token found.--------2--------',params);

    const res = yield call(commonApi, params);
    
    if (res && Array.isArray(res) || res?.data) {
      const userData = res.data || res;
      yield put(actionType.getUsersSuccess(userData)); 
    } else {
      throw new Error('Invalid response data structure for user list.');
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

// --- Watcher Saga ---

export default function* actionTypeWatcher() {
  // Only watch for the getUsers action
  yield takeEvery(actionType.getUsers.type, getUsersSaga);
}