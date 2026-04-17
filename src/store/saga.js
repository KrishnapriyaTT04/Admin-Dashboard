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
// import doctorActionWatcher from 'container/DoctorContainer/saga';
// import patientActionWatcher from 'container/PatientContainer/saga';

function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    // call(ratingActionWatcher),
    call(staffActionWatcher),
    // call(doctorActionWatcher),
    // call(patientActionWatcher)
  ]);
}

export default rootSaga;