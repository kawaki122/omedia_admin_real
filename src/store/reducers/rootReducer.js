import { combineReducers } from 'redux';
import dashSlice from './dashSlice';

export default combineReducers({
 dashboard: dashSlice,
});
