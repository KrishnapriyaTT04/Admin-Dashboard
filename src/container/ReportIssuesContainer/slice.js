import { createSlice } from '@reduxjs/toolkit';

const reportIssueSlice = createSlice({
  name: 'reportIssue',
  initialState: {
    list: [],
    listLoading: false,
    listError: null,
    listCount: 0,
    operationLoading: false,
    operationError: null,
    operationSuccess: false
  },
  reducers: {
    getIssueReports: (state) => {
      state.listLoading = true;
      state.listError = null;
    },

    /**
     * Action to handle successful retrieval of the issue report list.
     * @param {object} action.payload - The array of issue report objects.
     */
    getIssueReportsSuccess: (state, action) => {
      state.listLoading = false;
      state.list = action.payload;
      state.listError = null;
    },

    /**
     * Action to handle failure during issue report list retrieval.
     * @param {object} action.payload - Contains error details (message, status).
     */
    getIssueReportsFail: (state, action) => {
      state.listLoading = false;
      state.listError = {
        message: action.payload.message || 'Failed to fetch issue reports',
        status: action.payload.status || 500
      };
    },

    resetIssueReportListError: (state) => {
      state.listError = null;
    },

    getIssuesCount: (state) => {
      state.listLoading = true;
    },
    getIssuesCountSuccess: (state, action) => {
      state.listLoading = false;
      state.listCount = action.payload.count;
    },
    getIssuesCountFail: (state, action) => {
      state.listLoading = false;
    },



    updIssue: (state) => {
      state.operationLoading = true;
      state.operationSuccess = false;
      state.operationError = null;
    },

    updIssueSuccess: (state, action) => {
      state.operationLoading = false;
      const index = state.list.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        state.list = [
          ...state.list.slice(0, index),
          action.payload, 
          ...state.list.slice(index + 1) 
        ];
      }

      state.operationSuccess = true;
    },

    updIssueFail: (state, action) => {
      state.operationLoading = false;
      state.operationError = {
        message: action.payload.message || 'Failed to update user',
        status: action.payload.status || 500
      };
    },

    updIssueStts: (state) => {
      state.operationLoading = true;
      state.operationSuccess = false;
      state.operationError = null;
    },

    updIssueSttsSuccess: (state, action) => {
      state.operationLoading = false;
      const index = state.list.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        state.list = [
          ...state.list.slice(0, index),
          action.payload, 
          ...state.list.slice(index + 1) 
        ];
      }

      state.operationSuccess = true;
    },

    updIssueSttsFail: (state, action) => {
      state.operationLoading = false;
      state.operationError = {
        message: action.payload.message || 'Failed to update user',
        status: action.payload.status || 500
      };
    },


        updIssuecmt: (state) => {
          state.operationLoading = true;
          state.operationError = null;
          state.operationSuccess = false;
        },
        updIssuecmtSuccess: (state, action) => {
          state.operationLoading = false;
          const index = state.list.findIndex((f) => f.id === action.payload.id);
    
          if (index !== -1) {
            state.list = [
              ...state.list.slice(0, index), 
              action.payload, 
              ...state.list.slice(index + 1) 
            ];
          }
    
          state.operationSuccess = true;
        },
        updIssuecmtFail: (state, action) => {
          state.operationLoading = false;
          state.operationError = {
            message: action.payload.message || 'Failed to update facility',
            status: action.payload.status || 500
          };
        },
  }
});

// Export actions for use in components or sagas/thunks
export const {
  getIssueReports,
  getIssueReportsSuccess,
  getIssueReportsFail,
  resetIssueReportListError,
  getIssuesCount,
  getIssuesCountSuccess,
  getIssuesCountFail,
  updIssue,
  updIssueSuccess,
  updIssueFail,
  updIssuecmt,
  updIssuecmtSuccess,
  updIssuecmtFail ,
  updIssueStts,
  updIssueSttsSuccess,
  updIssueSttsFail

} = reportIssueSlice.actions;

// Export selectors for easily accessing state in components
export const selectIssueReportList = (state) => state.reportIssue.list;
export const selectIssueReportListLoading = (state) => state.reportIssue.listLoading;
export const selectIssueReportListError = (state) => state.reportIssue.listError;

// Export the reducer for inclusion in the store
export default reportIssueSlice.reducer;
