import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';

function* rootSaga() {
    yield all([call(LoginActionWatcher)]);
}

export default rootSaga;
