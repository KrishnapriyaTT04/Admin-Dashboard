import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import FacilityActionWatcher from 'container/FacilityContainer/saga';


function* rootSaga() {
    // yield all([call(LoginActionWatcher)]);
    // yield all([call(FacilityActionWatcher)]);

     yield all([
        call(LoginActionWatcher),
        call(FacilityActionWatcher) // The Facility watcher will now start concurrently with Login.
    ]);
}

export default rootSaga;
