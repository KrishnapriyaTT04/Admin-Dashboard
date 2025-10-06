import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* getUserFeedback(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
      console.log('------------------------ called saagaaaaaaa');

  try {
    let params = {
      api: `${appConfig.ip}/feedbacks`,
      method: 'GET',
      successAction: actionType.getUserFeedbackSucces(),
      failAction: actionType.getUserFeedbackFail(),
      authourization: 'Bearer',
      token:  accessToken
    };
    let res = yield call(commonApi, params);
    if (res) {
    //   if (res.message.roles !== 'Inclips Admin') {
    //     localStorage.setItem('userDtls', JSON.stringify(res));
        // yield call(toast.success, 'successful', { autoClose: 3000 });
    //     yield call(action.payload.navigate, '/dashboard');
    //   } else {
    //     throw new Error('User not valid');
    //   }
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    //  data={
    //   'message':{"role":"admin"}
    //  }
    //  localStorage.setItem('userDtls', JSON.stringify(data));
            // yield call(action.payload.navigate, '/dashboard');

    console.error('Fetch user feed back failed:', error);
    yield call(toast.error, 'Failed to fetch user feedbacks.', { autoClose: 3000 });
  }
}

export default function* UserFeedbakActionWatcher() {
  yield takeEvery(actionType.getUserFeedback, getUserFeedback);
}
