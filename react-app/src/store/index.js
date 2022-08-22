import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import communityReducer from './communities';
import postReducer from './posts';
import userInfoReducer from './userInfo';
import searchReducer from './search';
import commentReducer from './comments';

const rootReducer = combineReducers({
  session,
  communities: communityReducer,
  posts: postReducer,
  userInfo: userInfoReducer,
  search: searchReducer,
  comments: commentReducer
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
