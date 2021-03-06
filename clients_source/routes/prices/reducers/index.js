import { combineReducers } from 'redux';
import {
  FETCH_PRICES, FETCH_PRICE_BY_ID, ERROR_FPM, FETCHING_LOADING
} from '../consts';

const initialData = {
  data: [],
  view: {
    error: false,
    loading: false
  }
}

function data(state = initialData.data, action) {
  switch (action.type) {
    case FETCH_PRICES: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

function view(state = initialData.view, action) {
  switch (action.type) {
    case ERROR_FPM: {
      return Object.assign({}, state, {
        error: true
      });
    }
    case FETCHING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    default: {
      return state;
    }
  }
}

const prices = combineReducers({
  data,
  view
});

export default prices;
