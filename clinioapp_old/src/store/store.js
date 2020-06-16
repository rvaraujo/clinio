
import { createStore } from 'redux';
import appReducer from '../reducer/appReducer.js';

export default createStore(appReducer)