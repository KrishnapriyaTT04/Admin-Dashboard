import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* login(action) {
  try {
    let params = {
      api: `${appConfig.ip}/method/inclips.api.react_api.login?login_id=${action.payload.email}&password=${action.payload.password}`,
      method: 'POST',
      successAction: actionType.loginSuccess(),
      failAction: actionType.loginFail(),
      authourization: null
    };
    let res = yield call(commonApi, params);
    if (res?.message) {
      if (res.message.roles !== 'Inclips Admin') {
        localStorage.setItem('userDtls', JSON.stringify(res));
        yield call(toast.success, 'Login successful', { autoClose: 3000 });
        yield call(action.payload.navigate, '/dashboard');
      } else {
        throw new Error('User not valid');
      }
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    //  data={
    //   'message':{"role":"admin"}
    //  }
    //  localStorage.setItem('userDtls', JSON.stringify(data));
            yield call(action.payload.navigate, '/dashboard');

    console.error('Login failed:', error);
    yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery(actionType.userLogin, login);
}
