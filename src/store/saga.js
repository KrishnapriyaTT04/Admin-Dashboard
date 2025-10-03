import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import FacilityActionWatcher from 'container/FacilityContainer/saga';
import userActionWatcher from 'container/UsersContainer/saga';



function* rootSaga() {
    // yield all([call(LoginActionWatcher)]);
    // yield all([call(FacilityActionWatcher)]);

     yield all([
        call(LoginActionWatcher),
        call(FacilityActionWatcher),
         call(userActionWatcher) 
    ]);
}

export default rootSaga;
