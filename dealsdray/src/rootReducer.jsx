import { combineReducers } from 'redux';
import {objectsReducer} from './action';

const rootReducer = combineReducers({
  objects: objectsReducer,

});

export default rootReducer;
