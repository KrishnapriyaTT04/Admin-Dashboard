import { put } from 'redux-saga/effects';
import appConfig from '../config';
import { Base64 } from 'js-base64';

function* commonApi(value) {

  console.log("-------------value.authourization-----------",value.token);
  
  const token = appConfig.token;
  let authorization = value.authorization
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


  const authHeader = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: authorization };
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
      throw response;
    } else {
      const resJSON = yield response.json();

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
