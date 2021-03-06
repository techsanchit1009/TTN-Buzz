import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './Store/Reducers/user.reducer';
import complaintReducer from './Store/Reducers/complaint.reducer';
import buzzReducer from './Store/Reducers/buzz.reducer';
import commentReducer from './Store/Reducers/comment.reducer';
import replyReducer from './Store/Reducers/reply.reducer';

import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducer = combineReducers({
  userData: userReducer,
  complaintData: complaintReducer,
  buzzData: buzzReducer,
  commentData: commentReducer,
  replyData: replyReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
