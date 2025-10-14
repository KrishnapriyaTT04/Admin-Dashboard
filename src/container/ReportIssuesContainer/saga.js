import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; // Assuming this is your common API utility
import appConfig from '../../config';
// Assuming the reportIssue slice actions are imported here
import * as actionType from './slice'; 


// Base API endpoint for issue reports (adjust as needed for your specific API)
const ISSUE_API_BASE = `${appConfig.ip}`; 

// ====================================================================
// 1. Get Issue Reports
// ====================================================================

function* getIssueReportsSaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));
  try {
    const params = {
      // API endpoint for fetching all issue reports
      api: `${ISSUE_API_BASE}/${action.payload}`,
      method: 'GET',
      successAction: actionType.getIssueReportsSuccess(),
      failAction: actionType.getIssueReportsFail(),
      authorization: 'Bearer',
      token: `${token?.accessToken}` 
    };
    
    const res = yield call(commonApi, params);
    
    // Assuming the API returns an array or an object containing the list
    if (res && Array.isArray(res.data)) {
      yield put(actionType.getIssueReportsSuccess(res.data)); 
    } else if (res) {
      // Handle case where API response is valid but not the expected array structure
      yield put(actionType.getIssueReportsSuccess(res)); 
    } else {
      throw new Error('Invalid response data structure for issue report list.');
    }
  } catch (error) {
    console.error('Fetch Issue Reports failed:', error);
    
    yield put(actionType.getIssueReportsFail({ 
      message: error.message || 'Failed to fetch issue reports.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load issue report list.', { autoClose: 3000 });
  }
}


function* getIssuesCount() {
    const token = JSON.parse(localStorage.getItem('klooToken'));
    
  try {
    const params = {
      api: `${ISSUE_API_BASE}/issues/count`, 
      method: 'GET',
      successAction: actionType.getIssuesCountSuccess(),
      failAction: actionType.getIssuesCountFail(),
      authorization: `Bearer`,
      token: `${token?.accessToken}`

    };
    
    const res = yield call(commonApi, params);
  } catch (error) {
    console.error('Fetch Issues failed:', error);
    yield put(actionType.getIssuesCountFail({ 
      message: error.message || 'Failed to fetch Issues.', 
      status: error.response?.status || 500 
    }));
    yield call(toast.error, 'Failed to load issue list.', { autoClose: 3000 });
  }
}

// ====================================================================
// Watcher Saga
// ====================================================================

export default function* issueReportActionWatcher() {
  // Listen for the action types defined in your reportIssueSlice.js
  yield takeEvery(actionType.getIssueReports.type, getIssueReportsSaga);
  yield takeEvery(actionType.getIssuesCount.type, getIssuesCount);
 
}