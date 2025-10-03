import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import FacilityActionWatcher from 'container/FacilityContainer/saga';
import userActionWatcher from 'container/UsersContainer/saga';
import issueReportActionWatcher from 'container/ReportIssuesContainer/saga';




function* rootSaga() {
     yield all([
        call(LoginActionWatcher),
        call(FacilityActionWatcher),
        call(userActionWatcher) ,
        call(issueReportActionWatcher) 
    ]);
}

export default rootSaga;
