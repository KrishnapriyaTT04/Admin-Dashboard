import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

// Base API endpoint for ratings
const RATING_API_BASE = `${appConfig.ip}`;


function* getRatingsSaga(action) {
  try {
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

    const searchQuery = action.payload?.searchQuery || '';

    let apiUrl = `${RATING_API_BASE}/${action.payload}`;
    if (searchQuery.trim() !== '') {
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


    const res = yield call(commonApi, params);
    const ratingData = res?.data || res;
    if (!Array.isArray(ratingData)) {
      throw new Error('Invalid response structure for rating list.');
    }
    yield put(actionType.getRatingsSuccess(ratingData));

  } catch (error) {
    yield put(actionType.getRatingsFail({
      message: error.message || 'Failed to fetch ratings.',
      status: error.response?.status || 500
    }));
    yield call(toast.error, 'Failed to load ratings.', { autoClose: 3000 });
  }
}




function* getRatingCount(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    let params = {
      api: `${RATING_API_BASE}/feedbacks/count`,
      method: 'GET',
      successAction: actionType.getRatingCountSuccess(),
      failAction: actionType.getRatingCountFail(),
      authorization: 'Bearer',
      token:  accessToken
    };
   let res = yield call(commonApi, params);
  } catch (error) {
    console.error('Fetch user Feedback count failed:', error);

  }
}


export default function* ratingWatcher() {
    yield takeEvery(actionType.getRatings.type, getRatingsSaga);
    yield takeEvery(actionType.getRatingCount.type, getRatingCount);
}
