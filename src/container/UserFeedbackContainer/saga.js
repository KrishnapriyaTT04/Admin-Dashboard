import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* getUserFeedback(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;

  try {
    let params = {
      api: `${appConfig.ip}/feedbacks`,
      method: 'GET',
      successAction: actionType.getUserFeedbackSucces(),
      failAction: actionType.getUserFeedbackFail(),
      authorization: 'Bearer',
      token: accessToken
    };
    let res = yield call(commonApi, params);
    if (res) {
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    yield call(toast.error, 'Failed to fetch user feedbacks.', { autoClose: 3000 });
  }
}

function* getFeedbackCount(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    let params = {
      api: `${appConfig.ip}/feedbacks/count`,
      method: 'GET',
      successAction: actionType.getFeedbackCountSucces(),
      failAction: actionType.getFeedbackCountFail(),
      authorization: 'Bearer',
      token: accessToken
    };
    let res = yield call(commonApi, params);
    if (res) {
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    console.error('Fetch user feed back count failed:', error);
    yield call(toast.error, 'Failed to fetch user feedbacks count.', { autoClose: 3000 });
  }
}

export default function* UserFeedbakWatcher() {
  yield takeEvery(actionType.getUserFeedback, getUserFeedback);
  yield takeEvery(actionType.getUserFeedbackCount, getFeedbackCount);
}
