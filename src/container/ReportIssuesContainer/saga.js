import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api'; // Assuming this is your common API utility
import appConfig from '../../config';
// Assuming the reportIssue slice actions are imported here
import * as actionType from './slice';

// Base API endpoint for issue reports (adjust as needed for your specific API)
const ISSUE_API_BASE = `${appConfig.ip}`;

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

    yield put(
      actionType.getIssueReportsFail({
        message: error.message || 'Failed to fetch issue reports.',
        status: error.response?.status || 500
      })
    );
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
    yield put(
      actionType.getIssuesCountFail({
        message: error.message || 'Failed to fetch Issues.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load issue list.', { autoClose: 3000 });
  }
}

function* updateIssue(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    const payload = action.payload;
    const data = payload.values;
    const getUrl = payload.getReqestUrl;

    if (!data.id) {
      return;
    }

    let updateBody = { ...data };
    delete updateBody.id;

    const params = {
      api: `${ISSUE_API_BASE}/issues/${data.id}`,
      method: 'PATCH',
      body: JSON.stringify(updateBody),
      successAction: actionType.updIssueSuccess(),
      failAction: actionType.updIssueFail(),
      authorization: 'Bearer',
      token: accessToken
    };

    const res = yield call(commonApi, params);
      
    if (res) {
      yield put(actionType.updIssueSuccess(res));

      yield call(toast.success, 'Issue Updated Successfully!', { autoClose: 3000 });

      if (getUrl) {
        yield put(actionType.getIssueReports(getUrl));
      }
    } else {
      throw new Error('Issue update response was empty.');
    }
  } catch (error) {
    console.error('Update Issue failed:', error);
    yield put(
      actionType.updIssueFail({
        message: error.message || 'Failed to update Issue.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, `Issue update failed: ${error.message}`, { autoClose: 3000 });
  }
}

function* updateIssueStatus(action) {
  const tokenData = JSON.parse(localStorage.getItem('klooToken'));
  const accessToken = tokenData?.accessToken;
  try {
    const payload = action.payload;
    const data = payload.values;
    const getUrl = payload.getReqestUrl;

    if (!data.id) {
      return;
    }

    let updateBody = { ...data };
    delete updateBody.id;

    const params = {
      api: `${ISSUE_API_BASE}/issues/close/${data.id}`,
      method: 'PATCH',
      // body: JSON.stringify(updateBody),
      successAction: actionType.updIssueSttsSuccess(),
      failAction: actionType.updIssueSttsFail(),
      authorization: 'Bearer',
      token: accessToken
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.updIssueSttsSuccess(res));

      yield call(toast.success, ' Status Updated Successfully!', { autoClose: 3000 });

      if (getUrl) {
        yield put(actionType.getIssueReports(getUrl));
      }
    } else {
      throw new Error('Issue Status update response was empty.');
    }
  } catch (error) {
    console.error('Update Status failed:', error);
    yield put(
      actionType.updIssueSttsFail({
        message: error.message || 'Failed to update Issue.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, `Status update failed: ${error.message}`, { autoClose: 3000 });
  }
}

export default function* issueReportActionWatcher() {
  // Listen for the action types defined in your reportIssueSlice.js
  yield takeEvery(actionType.getIssueReports.type, getIssueReportsSaga);
  yield takeEvery(actionType.getIssuesCount.type, getIssuesCount);
  yield takeEvery(actionType.updIssue.type, updateIssue);
  yield takeEvery(actionType.updIssueStts.type, updateIssueStatus);
}
