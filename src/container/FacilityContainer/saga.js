import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import uploadApi from 'container/uploadApi';
import appConfig from '../../config';
import * as actionType from './slice';

// Base API endpoint for facilities
const FACILITY_API_BASE = `${appConfig.ip}`;

function* getFacilities(action) {
  console.log("=========",action.payload);
  try {
    const params = {
      api: `${FACILITY_API_BASE}/${action.payload}`,
      method: 'GET',
      successAction: actionType.getFacilitiesSuccess(),
      failAction: actionType.getFacilitiesFail(),
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
    yield put(
      actionType.getFacilitiesFail({
        message: error.message || 'Failed to fetch facilities.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load facility list.', { autoClose: 3000 });
  }
}

function* createFacilitySaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));
  try {
    const facilityData = action.payload;

    const params = {
      api: `${FACILITY_API_BASE}/facilities`,
      method: 'POST',
      body: JSON.stringify(facilityData),
      successAction: actionType.createFacilitySuccess(),
      failAction: actionType.createFacilityFail(),
      authorization: 'Bearer',
      token: `${token.accessToken}`
    };

    const res = yield call(commonApi, params);
    yield call(toast.success, 'Facility added successfully!', { autoClose: 3000 });

    // if (res?.message === 'success') {
    //   yield call(toast.success, 'Facility added successfully!', { autoClose: 3000 });
    //   yield put(actionType.createFacilitySuccess(res.data));
    //   yield put(actionType.getFacilities());
    // } else {
    // }
  } catch (error) {
    console.error('Create Facility failed:', error);
    yield put(
      actionType.createFacilityFail({
        message: error.message || 'Failed to create facility.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, `Creation failed: ${error.message}`, { autoClose: 3000 });
  }
}

function* updateFacilitySaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));
  try {
    const payload = action.payload;
    const facilityData = payload.values;
    const getUrl = payload.getReqestUrl;

    if (!facilityData.id) {
      return;
    }
    let updateBody = { ...facilityData };

    delete updateBody.id;
    const params = {
      api: `${FACILITY_API_BASE}/facilities/${facilityData.id}`,
      method: 'PATCH',
      body: JSON.stringify(updateBody),
      successAction: actionType.updateFacilitySuccess(),
      failAction: actionType.updateFacilityFail(),
      authorization: 'Bearer',
      token: `${token.accessToken}`
    };

    const res = yield call(commonApi, params);

    yield call(toast.success, 'Facility updated successfully!', { autoClose: 3000 });

    if (getUrl) {
      yield put(actionType.getFacilities(getUrl));
    }
  } catch (error) {
    console.error('Update Facility failed:', error);
    yield put(
      actionType.updateFacilityFail({
        message: error.message || 'Failed to update facility.',
        status: error.response?.status || 500
      })
    );
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
  } catch (error) {
    console.error('Fetch Facilities failed:', error);
    yield put(
      actionType.getFacilitiesCountFail({
        message: error.message || 'Failed to fetch facilities.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load facility list.', { autoClose: 3000 });
  }
}

function* uploadBulkFacilitiesSaga(action) {

 const { file, reqUrl } = action.payload; 
  console.log('Uploading file:', file);
  console.log('Request URL:', reqUrl);
  
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
    token: token.accessToken,
    isFileUpload: true // 👈 very important
  };

  try {
    const res = yield call(uploadApi, params);

    if (res?.fileDownloaded) {
      yield call(toast.success, `Bulk Upload Completed Partially: Error Report Downloaded`, {
        autoClose: 3000
      });
      return;
    }
    yield put(actionType.uploadBulkFacilitiesSuccess(res));
    yield call(
      toast.success,
      res?.totalRecords && res?.successfullyCreated
        ? `Total: ${res.totalRecords}, Successfully Created: ${res.successfullyCreated}`
        : `Bulk Upload Completed`,
      { autoClose: 3000 }
    );

    if (reqUrl) {
      yield put(actionType.getFacilities(reqUrl)); 
    }


  } catch (error) {
    yield put(
      actionType.uploadBulkFacilitiesFail({
        message: error.message || 'Failed to upload and update facilities.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, `Bulk update failed: ${error.message || 'Server error.'}`, { autoClose: 5000 });
  }
}

function* getMasterFacilitiesSaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));

  try {
    const params = {
      api: `${FACILITY_API_BASE}${action.payload}`,
      method: 'GET',
      successAction: actionType.getMasterFacilitiesSuccess(),
      failAction: actionType.getMasterFacilitiesFail(),
      authorization: 'Bearer',
      token: `${token?.accessToken}`
    };

    const res = yield call(commonApi, params);

    if (res && Array.isArray(res.data)) {
      yield put(actionType.getMasterFacilitiesSuccess(res.data));
    } else if (res) {
      yield put(actionType.getMasterFacilitiesSuccess(res));
    } else {
      throw new Error('Invalid response data structure for issue report list.');
    }
  } catch (error) {
    console.error('Fetch Issue Reports failed:', error);

    yield put(
      actionType.getMasterFacilitiesFail({
        message: error.message || 'Failed to feisCreateOrUpdatatch issue reports.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load issue report list.', { autoClose: 3000 });
  }
}

function* getMasterFacilityTypeSaga(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));

  try {
    const params = {
      api: `${FACILITY_API_BASE}${action.payload}`,
      method: 'GET',
      successAction: actionType.getMasterFacilityTypeSuccess(),
      failAction: actionType.getMasterFacilityTypeFail(),
      authorization: 'Bearer',
      token: `${token?.accessToken}`
    };

    const res = yield call(commonApi, params);

    if (res && Array.isArray(res.data)) {
      yield put(actionType.getMasterFacilityTypeSuccess(res.data));
    } else if (res) {
      yield put(actionType.getMasterFacilityTypeSuccess(res));
    } else {
      throw new Error('Invalid response data structure for master facility types.');
    }
  } catch (error) {
    console.error('Fetch Master Facility Types failed:', error);

    yield put(
      actionType.getMasterFacilityTypeFail({
        message: error.message || 'Failed to fetch facility types.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load master facility types.', { autoClose: 3000 });
  }
}

function* uploadImagesStart(action) {
  const token = JSON.parse(localStorage.getItem('klooToken'));

  const timestamp = Date.now();
  const date = new Date(timestamp);
  try {
    const payload = action.payload;
    const facilityData = payload.values;
    const getUrl = payload.getReqestUrl;
    const selectedFiles = payload.selectedFiles;
    const isCreateOrUpdate = payload.isCreateOrUpdate;

    let newAttachmentUrls = [];

    for (let item of selectedFiles) {
      var formData = new FormData();
      formData.append('file', item, item?.name);

      const params = {
        api: `${FACILITY_API_BASE}/attachment/upload`,
        method: 'POST',
        body: formData,
        successAction: actionType.uploadImagesSuccess(),
        failAction: actionType.uploadImagesFail(),
        authorization: 'Bearer',
        token: `${token.accessToken}`,
        isFileUpload: true
      };

      const res = yield call(uploadApi, params);
      const documentUrl = res?.data?.documentUrl || res?.documentUrl || res?.url;

      if (documentUrl) {
        let attachment = {
          attachmentName: item?.name,
          attachmentUrl: documentUrl,
          attachmentType: item.type,
          attachedOn: date
        };
        newAttachmentUrls.push(attachment);
      } else {
        throw new Error(`Failed to get URL for file: ${item.name}`);
      }
    }

    const existingAttachments = facilityData.attachments || [];

    const combinedAttachments = [...existingAttachments, ...newAttachmentUrls];

    const finalFacilityData = {
      ...facilityData,
      attachments: combinedAttachments
    };

    yield put(actionType.uploadImagesSuccess(newAttachmentUrls));

    if (isCreateOrUpdate == 'update') {
      if (getUrl) {
        yield put(actionType.updateFacility({ values: finalFacilityData, getReqestUrl: getUrl }));
      }
    } else if (isCreateOrUpdate == 'create') {
      yield put(actionType.createFacility(finalFacilityData));
    }

    return newAttachmentUrls;
  } catch (error) {
    yield put(
      actionType.uploadImagesFail({
        message: error.message || 'Image upload failed during sequential process.',
        status: error.status || 500
      })
    );
    throw error;
  }
}

export default function* facilityActionWatcher() {
  yield takeEvery(actionType.getFacilities.type, getFacilities);
  yield takeEvery(actionType.createFacility.type, createFacilitySaga);
  yield takeEvery(actionType.updateFacility.type, updateFacilitySaga);
  yield takeEvery(actionType.getFacilitiesCount.type, getFacilitiesCount);
  yield takeEvery(actionType.uploadBulkFacilities.type, uploadBulkFacilitiesSaga);
  yield takeEvery(actionType.getMasterFacilities.type, getMasterFacilitiesSaga);
  yield takeEvery(actionType.getMasterFacilityType.type, getMasterFacilityTypeSaga);
  yield takeEvery(actionType.uploadImagesStart.type, uploadImagesStart);
}
