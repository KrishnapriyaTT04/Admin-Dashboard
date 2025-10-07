import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; // Your API utility
import appConfig from '../../config';
import * as actionType from './slice'; // Rating slice actions

// Base API endpoint for ratings
const RATING_API_BASE = `${appConfig.ip}`;

/**
 * Fetch Ratings Saga
 */
function* getRatingsSaga() {
    try {
        // Retrieve token from local storage
        const tokenData = JSON.parse(localStorage.getItem('klooToken'));
        const accessToken = tokenData?.accessToken;

        if (!accessToken) {
            yield put(actionType.getRatingsFail({
                message: 'Authentication failed: No token found.',
                status: 401
            }));
            yield call(toast.error, 'Please log in to load ratings.', { autoClose: 3000 });
            return;
        }

        // API request parameters
        const params = {
            api: `${RATING_API_BASE}/feedbacks`, // Your Ratings endpoint
            method: 'GET',
            successAction: actionType.getRatingsSuccess(),
            failAction: actionType.getRatingsFail(),
            authorization: `Bearer`,
            token: accessToken,
        };

        // Call API
        const res = yield call(commonApi, params);

        // Validate response
        const ratingData = res?.data || res;
        if (!Array.isArray(ratingData)) {
            throw new Error('Invalid response structure for rating list.');
        }

        // Dispatch success action
        yield put(actionType.getRatingsSuccess(ratingData));

    } catch (error) {
        // Dispatch fail action and show toast
        yield put(actionType.getRatingsFail({
            message: error.message || 'Failed to fetch ratings.',
            status: error.response?.status || 500
        }));
        yield call(toast.error, 'Failed to load ratings.', { autoClose: 3000 });
    }
}


function* getRatingCount() {

  try {
    const params = {
      api: `${RATING_API_BASE}/feedbacks/count`, 
      method: 'GET',
      successAction: actionType.getRatingCountSuccess(),
      failAction: actionType.getRatingCountFail(),
      authourization: `Bearer`
    };    
    
    const res = yield call(commonApi, params);
    
    console.log("==res", res);
    
   
    if (res) {
      yield put(actionType.getRatingCountSuccess(res)); 
    } else {
      throw new Error('Invalid response data structure for feedback list.');
    }
  } catch (error) {
    console.error('Fetch Feedback failed:', error);
    yield put(actionType.getRatingCountFail({ 
      message: error.message || 'Failed to fetch Feedback.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load feedback list.', { autoClose: 3000 });
  }
}


export default function* ratingWatcher() {
    // Watches for getRatings action and triggers getRatingsSaga
    yield takeEvery(actionType.getRatings.type, getRatingsSaga);
    yield takeEvery(actionType.getRatingCount.type, getRatingCount);
}
