import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; 

import uploadApi from 'container/uploadApi';  

import appConfig from '../../config';
import * as actionType from './slice'; // Assuming this imports all the facility actions



// Base API endpoint for facilities (adjust as needed for your specific API)
const FACILITY_API_BASE = `${appConfig.ip}`; 

function* getFacilitiesSaga(action) {

    console.log("----------------------SSSS-------------------",action);
  try {
    const params = {
      api: `${FACILITY_API_BASE}/${action.payload}`, 
      method: 'GET',
      successAction: actionType.getFacilitiesSuccess(),
      failAction: actionType.getFacilitiesFail(),
      authourization: `Bearer`
    };
    
    const res = yield call(commonApi, params);
    console.log("==res==",res);
    
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

      //  action.payload.avgStarRating=0
      //         action.payload.ratingCount=0
      //         action.payload.reviewCount=0

      //         action.payload.seatCapacity=2

    // action.payload.facilityType='indian'
    // action.payload.district='kozhikkode',
    // action.payload.pinCode="673525"
    // action.payload.landmark="Library"



              

       
       

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
      // throw new Error(res?.message || 'Facility creation failed.');
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
function* updateFacilitySaga(action,facilityId) {

   const token = JSON.parse(localStorage.getItem('klooToken'));
  try {
    const facilityData = action.payload;    
    
  if (!facilityData.id) { 
      return
    }
    let updateBody = { ...facilityData }; 

    delete updateBody.id;
    const params = {
      // Example API call for updating a facility
      api: `${FACILITY_API_BASE}/facilities/${facilityData.id}`, 
      method: 'PATCH',
      body: JSON.stringify(updateBody),
      successAction: actionType.updateFacilitySuccess(),
      failAction: actionType.updateFacilityFail(),
       authorization: 'Bearer',
      token:`${token.accessToken}`
    };

    const res = yield call(commonApi, params);
      console.log("----------------------saga-res------------------",res);

    if (res?.message === 'success') {
      yield call(toast.success, 'Facility updated successfully!', { autoClose: 3000 });
      yield put(actionType.updateFacilitySuccess(res.data)); 
      yield put(actionType.getFacilities());
    } else {
      // throw new Error(res?.message || 'Facility update failed.');
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


function* getFacilitiesCount(action) {
  try {
    const params = {
      api: `${FACILITY_API_BASE}/${action.payload}`, 
      method: 'GET',
      successAction: actionType.getFacilitiesCountSuccess(),
      failAction: actionType.getFacilitiesCountFail(),
      authourization: `Bearer`
    };
    const res = yield call(commonApi, params);
    if (res) {
      yield put(actionType.getFacilitiesSuccess(res)); 
    } else {
      throw new Error('Invalid response data structure for facility list.');
    }
  } catch (error) {
    console.error('Fetch Facilities failed:', error);
    yield put(actionType.getFacilitiesCountFail({ 
      message: error.message || 'Failed to fetch facilities.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load facility list.', { autoClose: 3000 });
  }
}


function* uploadBulkFacilitiesSaga(action) {
    const file = action.payload; 
    const token = JSON.parse(localStorage.getItem('klooToken'));
    
    const formData = new FormData();
    formData.append('file', file); 
    
    const params = {
      api: `${FACILITY_API_BASE}/facilities/import`,
      method: 'POST', 
      body: formData,
      successAction: actionType.uploadBulkFacilitiesSuccess(),
      failAction: actionType.uploadBulkFacilitiesFail(),
      authorization: 'Bearer',
      token: `${token.accessToken}`,
      isFileUpload: true, 
    };

    try {
        const res = yield call(uploadApi, params);
        yield put(actionType.uploadBulkFacilitiesSuccess(res));
        
        yield call(toast.success, `Total: ${res.totalRecords},successfullyCreated: ${res.successfullyCreated},failedRecords: 
${res.failedRecords
}`, { autoClose: 3000 });
        
        // CRITICAL: After a bulk update, you must refetch the list to show the changes
        // yield put(actionType.getFacilities()); 
        
    } catch (error) {        
        // 6. Dispatch failure and show error toast
        yield put(actionType.uploadBulkFacilitiesFail({ 
            message: error.message || 'Failed to upload and update facilities.', 
            status: error.response?.status || 500 
        }));
        yield call(toast.error, `Bulk update failed: ${error.message || 'Server error.'}`, { autoClose: 5000 });
    }
}



function* getMasterFacilitiesSaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));
  
  try {
    const params = {
      // API endpoint for fetching all issue reports
      api: `${FACILITY_API_BASE}${action.payload}`,  
      method: 'GET',
      successAction: actionType.getMasterFacilitiesSuccess(),
      failAction: actionType.getMasterFacilitiesFail(),
      authorization: 'Bearer',
      token: `${token?.accessToken}` // Use optional chaining for safer access
    };
    
    const res = yield call(commonApi, params);
    
    // Assuming the API returns an array or an object containing the list
    if (res && Array.isArray(res.data)) {
      yield put(actionType.getMasterFacilitiesSuccess(res.data)); 
    } else if (res) {
      // Handle case where API response is valid but not the expected array structure
      yield put(actionType.getMasterFacilitiesSuccess(res)); 
    } else {
      throw new Error('Invalid response data structure for issue report list.');
    }
  } catch (error) {
    console.error('Fetch Issue Reports failed:', error);
    
    yield put(actionType.getMasterFacilitiesFail({ 
      message: error.message || 'Failed to fetch issue reports.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load issue report list.', { autoClose: 3000 });
  }
}
// --- Watcher Saga ---

export default function* facilityActionWatcher() {
   yield takeEvery(actionType.getFacilities.type, getFacilitiesSaga);
   yield takeEvery(actionType.createFacility.type, createFacilitySaga);
   yield takeEvery(actionType.updateFacility.type, updateFacilitySaga);
   yield takeEvery(actionType.getFacilitiesCount.type, getFacilitiesCount);
   yield takeEvery(actionType.uploadBulkFacilities.type, uploadBulkFacilitiesSaga);
   yield takeEvery(actionType.getMasterFacilities.type, getMasterFacilitiesSaga);


  
}