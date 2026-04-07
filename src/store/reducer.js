import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import ratingReducer from 'container/RatingContainer/slice';




// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,
  rating: ratingReducer,
});

export default reducer;
