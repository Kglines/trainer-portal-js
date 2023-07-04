// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import announcementsReducer from './announcements';
import clientsReducer from './clients';
import monthlyClientReportsReducer from './monthlyClientReports';

const rootReducer = combineReducers({
  session: sessionReducer,
  announcements: announcementsReducer,
  clients: clientsReducer,
  monthlyClientReports: monthlyClientReportsReducer
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
};

export default configureStore;
