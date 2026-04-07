import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import ratingActionWatcher from 'container/RatingContainer/saga';


function* rootSaga() {
     yield all([
        call(LoginActionWatcher),
        call(ratingActionWatcher),
        
    ]);
}

export default rootSaga;
