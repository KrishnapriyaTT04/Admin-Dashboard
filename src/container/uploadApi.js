import { put } from 'redux-saga/effects';
import { Base64 } from 'js-base64';

function* uploadApi(value) {
  const token = appConfig.token;
  let authorization = value.authourization
    ? value.authourization === 'Basic'
      ? 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password)
      : token
    : token;

  const authHeader = {
    Authorization: authorization
  };

  try {
    const response = yield fetch(`${value.api}`, {
      method: `${value.method}`,
      headers: authHeader,
      body: value.body ? value.body : null
    });

    if (!response.ok) {
      throw response;
    } else {
      if (response.status === 204) {
        yield put({
          type: `${value.successAction.type}`
        });
        return { status: 204, msg: 'Updated Successfully' };
      } else {
        const resJSON = yield response.json();
        yield put({
          type: `${value.successAction.type}`,
          payload: resJSON
        });
        return resJSON;
      }
    }
  } catch (error) {
    yield put({
      type: `${value.failAction.type}`,
      payload: error
    });
  }
}

export default uploadApi;
