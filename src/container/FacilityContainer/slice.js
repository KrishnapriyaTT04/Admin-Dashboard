import { createSlice } from '@reduxjs/toolkit';

const facilitySlice = createSlice({
    name: 'facility',
    initialState: {
        // State for the list of all facilities
        list: [],
        listLoading: false,
        listError: null,
        
        // State for single facility operations (add/update/delete)
        operationLoading: false,
        operationError: null,
        operationSuccess: false,

        listcountLoading:false,
        listCount:0,

        bulkLoading: false,
        bulkError: null,
        bulkSuccess: false,
    },
    reducers: {
        // === FETCH LIST ACTIONS ===
        
        getFacilities: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        getFacilitiesSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload; 
            state.listError = null;
        },
        getFacilitiesFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch facilities',
                status: action.payload.status || 500
            };
        },



        // === CREATE (ADD) ACTIONS ===

        createFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        createFacilitySuccess: (state, action) => {
            state.operationLoading = false;
            // IMPLEMENTED: Prepend the new facility to the list immediately
            state.list.unshift(action.payload); 
            state.operationSuccess = true;
        },
        createFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to add facility',
                status: action.payload.status || 500
            };
        },
        
        // === UPDATE ACTIONS ===
        
        updateFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        updateFacilitySuccess: (state, action) => {
            // state.operationLoading = false;
            // // IMPLEMENTED: Find the updated facility and replace it in the list
            // const index = state.list.findIndex(f => f.id === action.payload.id);
            // if (index !== -1) {
            //      // Redux Toolkit uses Immer, so direct mutation is safe
            //     state.list[index] = action.payload;
            // }
            // state.operationSuccess = true;

             state.operationLoading = false;
    
    const index = state.list.findIndex(f => f.id === action.payload.id);
    
    if (index !== -1) {
        // ✅ FIX: Force a new array reference using the spread operator
        state.list = [
            ...state.list.slice(0, index),        // Elements before the updated item
            action.payload,                       // The new, updated item
            ...state.list.slice(index + 1)        // Elements after the updated item
        ];
    }
    
    state.operationSuccess = true;
        },
        updateFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to update facility',
                status: action.payload.status || 500
            };
        },

        // === DELETE ACTIONS (NEW) ===

        deleteFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        deleteFacilitySuccess: (state, action) => {
            state.operationLoading = false;
            // NEW: Filter out the deleted facility by ID (action.payload should be the ID)
            state.list = state.list.filter(f => f.id !== action.payload);
            state.operationSuccess = true;
        },
        deleteFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to delete facility',
                status: action.payload.status || 500
            };
        },


       getFacilitiesCount: (state) => {
            state.listcountLoading = true;
            
        },
        getFacilitiesCountSuccess: (state, action) => {
            state.listcountLoading = false;
            state.listCount = action.payload.count; // Payload is the array of facilities
        },
        getFacilitiesCountFail: (state, action) => {
            state.listcountLoading = false;
            // state.listError = {
            //     message: action.payload.message || 'Failed to fetch facilities',
            //     status: action.payload.status || 500
            // };
        },
        

        // === UTILITY/RESET ACTIONS ===


    uploadBulkFacilities: (state) => {
            state.bulkLoading = true;
            state.bulkError = null;
            state.bulkSuccess = false;
            // state.bulkResult = null;
        },
        uploadBulkFacilitiesSuccess: (state, action) => {
            state.bulkLoading = false;
            state.bulkSuccess = true;
            // Optional: Store detailed response if the API provides it
            // state.bulkResult = action.payload;
            
            // NOTE: If the bulk update impacts the list, the Saga should dispatch 
            // getFacilities() next, which will refill state.list
        },
        uploadBulkFacilitiesFail: (state, action) => {
            state.bulkLoading = false;
            state.bulkError = {
                message: action.payload.message || 'Bulk upload failed',
                status: action.payload.status || 500
            };
        },

        resetFacilityOperationState: (state) => {
            state.operationLoading = false;
            state.operationError = null;
            state.operationSuccess = false;
        }
    }
});

export const { 
    getFacilities, 
    getFacilitiesSuccess, 
    getFacilitiesFail,
    createFacility,
    createFacilitySuccess,
    createFacilityFail,
    updateFacility,
    updateFacilitySuccess,
    updateFacilityFail,
    // NEW EXPORTS
    deleteFacility,
    deleteFacilitySuccess,
    deleteFacilityFail,
    resetFacilityOperationState,
    getFacilitiesCount,
    getFacilitiesCountSuccess,
    getFacilitiesCountFail,

    uploadBulkFacilities,
    uploadBulkFacilitiesSuccess,
    uploadBulkFacilitiesFail,
} = facilitySlice.actions;

// Selectors for easy access to state
export const selectFacilityList = (state) => state.facility.list;
export const selectListLoading = (state) => state.facility.listLoading;
export const selectListError = (state) => state.facility.listError;
export const selectOperationLoading = (state) => state.facility.operationLoading;
export const selectOperationSuccess = (state) => state.facility.operationSuccess;
export const selectOperationError = (state) => state.facility.operationError;
export const selectListcountLoading = (state) => state.facility.listcountLoading;
export const selectListCount = (state) => state.facility.listCount;

export const selectBulkLoading = (state) => state.facility.bulkLoading;
export const selectBulkSuccess = (state) => state.facility.bulkSuccess;
export const selectBulkError = (state) => state.facility.bulkError;


export default facilitySlice.reducer;