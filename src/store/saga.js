import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import FacilityActionWatcher from 'container/FacilityContainer/saga';
import userActionWatcher from 'container/UsersContainer/saga';
import issueReportActionWatcher from 'container/ReportIssuesContainer/saga';
import ratingActionWatcher from 'container/RatingContainer/saga';
import UserFeedbakActionWatcher from 'container/UserFeedbackContainer/saga';





function* rootSaga() {
     yield all([
        call(LoginActionWatcher),
        call(FacilityActionWatcher),
        call(userActionWatcher) ,
        call(issueReportActionWatcher),
        call(ratingActionWatcher),
        call(UserFeedbakActionWatcher)
        
    ]);
}

export default rootSaga;
