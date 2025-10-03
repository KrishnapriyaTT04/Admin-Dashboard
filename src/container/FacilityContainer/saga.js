import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; // Your common API utility
import appConfig from '../../config';
import * as actionType from './slice'; // Assuming this imports all the facility actions



// Base API endpoint for facilities (adjust as needed for your specific API)
const FACILITY_API_BASE = `${appConfig.ip}`; 

function* getFacilitiesSaga(action) {

    console.log("----------------------SSSS-------------------",appConfig.ip);
  try {
    const params = {
      api: `${FACILITY_API_BASE}/facilities`, 
      method: 'GET',
      successAction: actionType.getFacilitiesSuccess(),
      failAction: actionType.getFacilitiesFail(),
      authourization: `Bearer`
    };
    
    const res = yield call(commonApi, params);
    console.log("---------------res----------------------",res);
    
    if (res) {
      yield put(actionType.getFacilitiesSuccess(res)); 
    } else {
      throw new Error('Invalid response data structure for facility list.');
    }
  } catch (error) {
    console.error('Fetch Facilities failed:', error);
    // Dispatch failure action
    yield put(actionType.getFacilitiesFail({ 
      message: error.message || 'Failed to fetch facilities.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load facility list.', { autoClose: 3000 });
  }
}

// 2. Create Facility
function* createFacilitySaga(action) {
     const token = JSON.parse(localStorage.getItem('klooToken'));
      console.log("----------------------saga-------------------",token);

  try {
     action.payload.facilityId= '1234'
        action.payload.parentFacilityId= '1234'
       action.payload.avgStarRating=2
              action.payload.ratingCount=1
              action.payload.reviewCount=2
              action.payload.reviewCount.toString()
                            // action.payload.additionalProperty="9876"

                                                        action.payload.seatCapacity=2

  action.payload.facilityType='indian'
    action.payload.district='kozhikkode',
    action.payload.pinCode="673525"
    action.payload.landmark="Library"



              

       
       

    const facilityData = action.payload;

    const params = {
      // Example API call for creating a facility
      api: `${FACILITY_API_BASE}/facilities`, 
      method: 'POST',
      body: JSON.stringify(facilityData), // Send facility data in the body
      successAction: actionType.createFacilitySuccess(),
      failAction: actionType.createFacilityFail(),
      authorization: 'Bearer',
      token:`${token.accessToken}`
    };

    const res = yield call(commonApi, params);

    if (res?.message === 'success') {
      yield call(toast.success, 'Facility added successfully!', { autoClose: 3000 });
      // Dispatch success and optionally pass the created object back
      yield put(actionType.createFacilitySuccess(res.data)); 
      // After creation, optionally re-fetch the list to update the table
      yield put(actionType.getFacilities());
    } else {
      throw new Error(res?.message || 'Facility creation failed.');
    }
  } catch (error) {
    console.error('Create Facility failed:', error);
    yield put(actionType.createFacilityFail({ 
      message: error.message || 'Failed to create facility.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, `Creation failed: ${error.message}`, { autoClose: 3000 });
  }
}

// 3. Update Facility
function* updateFacilitySaga(action) {
  try {
    const facilityData = action.payload;

    const params = {
      // Example API call for updating a facility
      api: `${FACILITY_API_BASE}.update_facility`, 
      method: 'PUT',
      body: JSON.stringify(facilityData),
      successAction: actionType.updateFacilitySuccess(),
      failAction: actionType.updateFacilityFail(),
      authorization: 'Bearer token_here'
    };

    const res = yield call(commonApi, params);

    if (res?.message === 'success') {
      yield call(toast.success, 'Facility updated successfully!', { autoClose: 3000 });
      // Dispatch success and pass the updated object back
      yield put(actionType.updateFacilitySuccess(res.data)); 
      // After update, optionally re-fetch the list
      yield put(actionType.getFacilities());
    } else {
      throw new Error(res?.message || 'Facility update failed.');
    }
  } catch (error) {
    console.error('Update Facility failed:', error);
    yield put(actionType.updateFacilityFail({ 
      message: error.message || 'Failed to update facility.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, `Update failed: ${error.message}`, { autoClose: 3000 });
  }
}

// --- Watcher Saga ---

export default function* facilityActionWatcher() {
  yield takeEvery(actionType.getFacilities.type, getFacilitiesSaga);
   yield takeEvery(actionType.createFacility.type, createFacilitySaga);
  yield takeEvery(actionType.updateFacility.type, updateFacilitySaga);
}