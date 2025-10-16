import { takeEvery, call } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';




function* getdashCount() {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    let params = {
      api: `${appConfig.ip}/users/admin-dashboard`,
      method: 'GET',
      successAction: actionType.dashCountSuccess(),
      failAction: actionType.dashCountFail(),
      authorization: 'Bearer',
      token:  accessToken
    };
   yield call(commonApi, params);
   
  } catch (error) {
    console.error('Fetch user Feedback count failed:', error);

  }
}


export default function* DashboardActionWatcher() {
  yield takeEvery(actionType.dashCount, getdashCount);
}
