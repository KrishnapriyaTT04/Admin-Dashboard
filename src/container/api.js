import { put, call } from 'redux-saga/effects';
import appConfig from '../config';
import { Base64 } from 'js-base64';
import { toast } from 'react-toastify';

function* commonApi(value) {

  console.log("===value.authourization===",value);
  
  const token = appConfig.token;
  let authorization = value.authorization;
    // ? value.authourization === 'Basic'
    //   ? 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password)
    //   : token
    // : token;
  console.log("-------------value.authourization-----------",value.authorization);

  if (value.authorization == 'Basic') {
    authorization = 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password);
  } else if (value.authorization == 'Bearer') {
      console.log("-------------value.Bearer-----------",value.token);
    authorization = 'Bearer ' + value.token;
  } else {
    authorization = token;
  }

  console.log(authorization, '==auauthorization');
  

  const authHeader = { 
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: authorization };
  const noauthHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  
  try {
    const response = yield fetch(`${value.api}`, {
      method: `${value.method}`,
      headers: value.authourization !== null ? authHeader : noauthHeader,
      body: value.body ? value.body : null
    });
        
    if (!response.ok) {
            if(response.status===401){
                yield call(toast.error, `Session has Expired. Please log in again.`, { autoClose: 3000 });
                    localStorage.setItem('klooToken', JSON.stringify(''));
                    window.location.reload();         // Normal reload (may use cache)
      }else{
      throw response;

      }


    } else {
      

 let resJSON = null;

    if (response.status === 204) {
        resJSON = {}; 
        
    } else {
        // Standard success (200, 201, etc.). Read the JSON body.
        resJSON = yield response.json(); 
    }
         console.log("--------------------response----cmn--ok-----------",resJSON);

      yield put({
        type: `${value.successAction.type}`,
        payload: resJSON
      });
      return resJSON;
    }
  } catch (error) {
    console.error('error', error);
    yield put({
      type: `${value.failAction.type}`,
      payload: error
    });
  }
}
export default commonApi;
