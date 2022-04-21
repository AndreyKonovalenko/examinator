import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
//import thunk from 'redux-thunk';
import rootReducer from './reducers';

//const middleware = [reduxThunk];

const store = configureStore(rootReducer, composeWithDevTools);

export default store;
