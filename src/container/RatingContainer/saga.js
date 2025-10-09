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
function* getRatingsSaga(action) {
  try {
    // Retrieve token
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

    // Extract search query (if provided)
    const searchQuery = action.payload?.searchQuery || '';

    // 🔍 Build API URL dynamically
    let apiUrl = `${RATING_API_BASE}/feedbacks`;
    if (searchQuery.trim() !== '') {
      // Create filter object to search by title (case insensitive)
      const filter = {
        where: { facilityTitle: { like: searchQuery, options: 'i' } },
        order: ['createdOn DESC']
      };
      apiUrl += `?filter=${encodeURIComponent(JSON.stringify(filter))}`;
    }

    const params = {
      api: apiUrl,
      method: 'GET',
      successAction: actionType.getRatingsSuccess(),
      failAction: actionType.getRatingsFail(),
      authorization: `Bearer`,
      token: accessToken,
    };

    // API call
    const res = yield call(commonApi, params);
    const ratingData = res?.data || res;

    if (!Array.isArray(ratingData)) {
      throw new Error('Invalid response structure for rating list.');
    }

    // Success dispatch
    yield put(actionType.getRatingsSuccess(ratingData));

  } catch (error) {
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
