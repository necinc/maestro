// With redux Logger
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import rootReducer from '../reducers';
import { CHANGE_FIELD } from '../routes/prices/routes/new/consts/';
import { CHANGE_MAIN_FIELD, CHANGE_PRODUCT_FIELD } from '../routes/price/consts/';
import {
  CHANGE_MAIN_FIELD_IN_NEW, CHANGE_PRODUCT_FIELD_IN_NEW
} from '../routes/prices/routes/new/consts';
import {
  CHANGE_LOGIN_FORM_FIELD
} from '../routes/signin/consts';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

var createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

if (typeof NODE_ENV !== 'undefined' && NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({
    predicate: (getState, action) => {
      let res = action.type !== CHANGE_FIELD
      && action.type !== CHANGE_MAIN_FIELD
      && action.type !== CHANGE_PRODUCT_FIELD
      && action.type !== CHANGE_MAIN_FIELD_IN_NEW
      && action.type !== CHANGE_PRODUCT_FIELD_IN_NEW
      && action.type !== CHANGE_LOGIN_FORM_FIELD;
      return res;
    },
    collapsed: true,
    duration: true,
  });
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore)
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
