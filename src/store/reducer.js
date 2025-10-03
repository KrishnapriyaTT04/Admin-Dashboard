import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import dashboardReducer from 'container/DashboardContainer/slice';
import facilitiesReducer from 'container/FacilityContainer/slice';
import userReducer from 'container/UsersContainer/slice'



// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  login: loginReducer,
  dashboardReducer: dashboardReducer,
  customization: customizationReducer,
  facility: facilitiesReducer,
  user:userReducer
});

export default reducer;
