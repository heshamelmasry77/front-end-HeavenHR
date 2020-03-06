import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {friendsReducer} from './reducers/friends';

const reducers = {
  friends: friendsReducer,
};

const middlewares = [thunk];

const store = createStore(combineReducers(reducers), applyMiddleware(...middlewares));

export default store;
