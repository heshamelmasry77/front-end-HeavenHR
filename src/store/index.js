import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {productsReducer} from './reducers/products';

const reducers = {
  products: productsReducer
}

const middlewares = [thunk];

const store = createStore(combineReducers(reducers), applyMiddleware(...middlewares));

export default store;
