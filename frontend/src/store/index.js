import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from '../store/session';
import groupsReducer from './groups';
import typesReducer from './types';
import eventsReducer from './events';
import userGroupsReducer from './userGroups';
import RSVPsReducer from './rsvps';

const rootReducer = combineReducers({
  session: sessionReducer,
  groups: groupsReducer,
  types: typesReducer,
  events: eventsReducer,
  userGroups: userGroupsReducer,
  rsvps: RSVPsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
