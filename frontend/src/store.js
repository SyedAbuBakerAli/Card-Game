import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './components/reducer/reducer'; // Assuming rootReducer is defined in reducer.js

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
