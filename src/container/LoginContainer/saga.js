import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* login(action) {
     console.log("------------action---",action);

     let loginReq={
      client_id: action.payload.client_id,
      client_secret: action.payload.client_secret,
      username: action.payload.email,
      password: action.payload.password,
     }

  try {
    let params = {
      api: `${appConfig.ip}/auth/login/admin`,
     //api:`${appConfig.ip}/auth/login/admin`,
     method: 'POST',
      successAction: actionType.loginSuccess(),
      failAction: actionType.loginFail(),
      authourization: null,
       body: JSON.stringify(loginReq) 
    };
    let res = yield call(commonApi, params);
   console.log("------------tkn---",res);
     if(res){
      localStorage.setItem('klooToken', JSON.stringify(res));
       yield call(toast.success, 'Login successful', { autoClose: 3000 });
      yield call(action.payload.navigate, '/dashboard');
     }else{
      //localStorage.setItem('userToken', JSON.stringify(null));
     }
        //     localStorage.setItem('userDtls', JSON.stringify(res));

    // if (res?.message) {
    //   if (res.message.roles !== 'Inclips Admin') {
    //     localStorage.setItem('userDtls', JSON.stringify(res));
    //     yield call(toast.success, 'Login successful', { autoClose: 3000 });
    //     yield call(action.payload.navigate, '/dashboard');
    //   } else {
    //     throw new Error('User not valid');
    //   }
    // } else {
    //   throw new Error('Invalid response from API');
    // }
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
