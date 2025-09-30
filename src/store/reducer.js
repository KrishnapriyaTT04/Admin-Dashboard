import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import dashboardReducer from 'container/DashboardContainer/slice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  login: loginReducer,
  dashboardReducer: dashboardReducer,
  customization: customizationReducer
});

export default reducer;
