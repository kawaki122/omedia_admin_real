import { combineReducers } from 'redux';
import dashSlice from './dashSlice';
import commonSlice from './commonSlice';

export default combineReducers({
 dashboard: dashSlice,
});
