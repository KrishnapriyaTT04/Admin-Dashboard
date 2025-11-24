import { put } from 'redux-saga/effects';
import { Base64 } from 'js-base64';
import { saveAs } from 'file-saver';
import appConfig from '../config';

function* uploadApi(value) {
  const token = appConfig.token;
  let authorization = value.authorization;

  // 🔹 Build Authorization header
  if (value.authorization === 'Basic') {
    authorization = 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password);
  } else if (value.authorization === 'Bearer') {
    authorization = 'Bearer ' + value.token;
  } else {
    authorization = token;
  }

  // 🔹 Don’t set Content-Type if it’s FormData (browser sets it automatically)
  const headers = { Authorization: authorization };
  if (!value.isFileUpload) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = yield fetch(`${value.api}`, {
      method: value.method,
      headers,
      body: value.body || null,
    });

    if (!response.ok) {
      throw response;
    }

    // 204 = No Content
    if (response.status === 204) {
      yield put({ type: value.successAction.type });
      return { status: 204, msg: 'Updated Successfully' };
    }

    // 🔹 Detect if response is file (Excel)
    const contentType = response.headers.get('content-type');
    console.log('📦 Response content-type:', contentType);

    if (
      contentType &&
      (contentType.includes('application/vnd.openxmlformats') ||
        contentType.includes('application/octet-stream'))
    ) {
      const blob = yield response.blob();

      // Extract filename
      let fileName = 'BulkUploadResult.xlsx';
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      // Save the file
      saveAs(blob, fileName);

      yield put({ type: value.successAction.type });
      return { fileDownloaded: true, fileName };
    } else {
      // Normal JSON
      const resJSON = yield response.json();
      yield put({
        type: value.successAction.type,
        payload: resJSON,
      });
      return resJSON;
    }
  } catch (error) {
    yield put({
      type: value.failAction.type,
      payload: error,
    });
  }
}

export default uploadApi;
