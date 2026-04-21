// import { all, call } from 'redux-saga/effects';

// import LoginActionWatcher from 'container/LoginContainer/saga';
// import ratingActionWatcher from 'container/RatingContainer/saga';


// function* rootSaga() {
//      yield all([
//         call(LoginActionWatcher),
//         call(ratingActionWatcher),
        
//     ]);
// }

// export default rootSaga;




import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
// import ratingActionWatcher from 'container/RatingContainer/saga';

import staffActionWatcher from 'container/StaffContainer/saga';
import doctorsWatcher from 'container/DoctorContainer/saga';
// import patientActionWatcher from 'container/PatientContainer/saga';

function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    // call(ratingActionWatcher),
    call(staffActionWatcher),
    call(doctorsWatcher),
    // call(patientActionWatcher)
  ]);
}

export default rootSaga;