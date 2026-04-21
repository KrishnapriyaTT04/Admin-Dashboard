// import { put, call } from 'redux-saga/effects';
// import appConfig from '../config';
// import { Base64 } from 'js-base64';
// import { toast } from 'react-toastify';

// function* commonApi(value) {
  
//   const token = appConfig.token;
//   let authorization = value.authorization;


//   // if (value.authorization == 'Basic') {
//   //   authorization = 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password);
//   // } else if (value.authorization == 'Bearer') {
//   //   authorization = 'Bearer ' + value.token;
//   // } else {
//   //   authorization = token;
//   // }



//   if (value.authorization === 'Basic') {
//   authorization = 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password);
// } else if (value.authorization && value.authorization.startsWith('Bearer')) {
//   authorization = value.authorization; // already full "Bearer xxx"
// } else {
//   authorization = token;
// }


  

//   const authHeader = { 
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Authorization: authorization };
//   const noauthHeader = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   };

//   console.log(value);
  
//   try {
//     const response = yield fetch(`${value.api}`, {
//       method: `${value.method}`,
//       headers: value.authorization !== null ? authHeader : noauthHeader,
//       body: value.body ? value.body : null,
//       credentials: 'include'
//     });
        
//     if (!response.ok) {
//             if(response.status===401){
//                 yield call(toast.error, `Session has Expired. Please log in again.`, { autoClose: 3000 });
                   
                   
//       }else{
//       throw response;

//       }


//     } else {
      

//  let resJSON = null;

//     if (response.status === 204) {
//         resJSON = {}; 
        
//     } else {
//         resJSON = yield response.json(); 
//     }
//       yield put({
//         type: `${value.successAction.type}`,
//         payload: resJSON
//       });
//       return resJSON;
//     }
//   } catch (error) {
//     console.error('error', error);
//     yield put({
//       type: `${value.failAction.type}`,
//       payload: error
//     });
//   }
// }
// export default commonApi;





// import { put, call } from 'redux-saga/effects';
// import { toast } from 'react-toastify';

// function* commonApi(value) {
//   // ✅ Base headers (no Authorization needed for cookies)
//   const headers = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   };

//   // ✅ Only attach Authorization if explicitly passed (rare case)
//   if (value.authorization) {
//     headers.Authorization = value.authorization;
//   }

//   try {
//     const response = yield fetch(value.api, {
//       method: value.method,
//       headers,
//       body: value.body || null,
//       credentials: 'include' // ✅ REQUIRED for cookies
//     });

//     // 🔴 Handle errors
//     if (!response.ok) {
//       if (response.status === 401) {
//         yield call(
//           toast.error,
//           'Session expired. Please login again.',
//           { autoClose: 3000 }
//         );

//         // optional: trigger logout action here
//         return;
//       }

//       throw response;
//     }

//     // ✅ Handle response
//     let resJSON = null;

//     if (response.status === 204) {
//       resJSON = {};
//     } else {
//       resJSON = yield response.json();
//     }

//     // ✅ Dispatch success
//     yield put({
//       type: value.successAction.type,
//       payload: resJSON
//     });

//     return resJSON;

//   } catch (error) {
//     console.error('API error:', error);

//     // ✅ Dispatch failure
//     yield put({
//       type: value.failAction.type,
//       payload: {
//         message: error.message || 'Something went wrong',
//         status: error.status || 500
//       }
//     });

//     yield call(
//       toast.error,
//       'Something went wrong. Please try again.',
//       { autoClose: 3000 }
//     );
//   }
// }

// export default commonApi;





import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

function* commonApi(value) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  // Optional Authorization
  if (value.authorization) {
    headers.Authorization = value.authorization;
  }

  try {
    const response = yield call(fetch, value.api, {
      method: value.method,
      headers,
      body: value.body || null,
      credentials: 'include' // ✅ for cookies
    });

    let data = {};

    // ✅ Safely parse JSON (even for error responses)
    try {
      if (response.status !== 204) {
        data = yield call([response, 'json']);
      }
    } catch (e) {
      data = { message: 'Invalid JSON response from server' };
    }

    // 🔴 Handle error responses properly
    if (!response.ok) {
      if (response.status === 401) {
        yield call(
          toast.error,
          data.message || 'Session expired. Please login again.',
          { autoClose: 3000 }
        );
        return;
      }

      // ✅ Throw clean serializable error
      throw {
        message: data.message || 'Request failed',
        status: response.status
      };
    }

    // ✅ Success dispatch
    yield put({
      type: value.successAction.type,
      payload: data
    });

    return data;

  } catch (error) {
    console.error('API error:', error);

    // ✅ Failure dispatch (ONLY serializable data)
    yield put({
      type: value.failAction.type,
      payload: {
        message: error.message || 'Something went wrong',
        status: error.status || 500
      }
    });

    // ✅ Show actual backend error if available
    yield call(
      toast.error,
      error.message || 'Something went wrong',
      { autoClose: 3000 }
    );
  }
}

export default commonApi;