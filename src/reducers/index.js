import { combineReducers } from 'redux';
import authReducer from './authReducer';
import inventoryReducer from './inventoryReducer';
import errorReducer from './errorReducer';





export default combineReducers({
    auth: authReducer,
    inventory: inventoryReducer,
    error: errorReducer,
})