// Redux stuff is optional
import Immutable from 'immutable';
import { Map, List, Iterable, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import immutablejs from 'redux-storage-decorator-immutablejs';
import merger from 'redux-storage-merger-immutablejs';
import filter from 'redux-storage-decorator-filter';

import {DEBUG, STORAGE_KEY} from '../Config/Config';

// initializing initial state
var initialState = Immutable.fromJS({
  currentUser: {
    username: null,
    accessToken: null,
    refreshToken: null,
    expiredIn: null,
  },
  currentRoute: undefined,
  tasks: {
    dataSource: [],
    isLoading: false,
  },
  setting: {
    lang: 'id',
  },
  status: {
    networkActivity: false,
    storageLoaded: false,

  }
});
// console.log("Initializing State", initialState);

// define reducers
var navigationReducer = require('../Reducers/NavigationReducer.js');
var taskListReducer = require('../Reducers/TaskListReducer.js');
var loginReducer = require('../Reducers/LoginReducer.js');
var statusReducer = require('../Reducers/StatusReducer.js');
var settingReducer = require('../Reducers/SettingReducer.js');
//import * as reducers from './reducers';

//combining reducers - replace by redux-storage-merger-immutablejs
// var appReducer = combineReducers({
//   currentUser: loginReducer,
//   currentRoute: navigationReducer,
//   tasks: taskListReducer,
//   }
// );

// create map of application reducers
var reducers = {
  currentUser: loginReducer,
  currentRoute: navigationReducer,
  tasks: taskListReducer,
  status: statusReducer,
  setting: settingReducer,
};

// combine all reducers
const rootReducer = storage.reducer(combineReducers(reducers), merger);


// Create Persistence Engine
var engine = createEngine(STORAGE_KEY);

//enable immutablejs for states
engine = immutablejs(engine, [
  ['currentUser'],
  ['tasks'],
  ['setting'],
]);

// enable only certain state is persisted
engine = filter(engine, [
//    'currentUser',
    'tasks',
  ], [
    'currentRoute',
  ]
);


var storageMiddleware = storage.createMiddleware(engine, [], ['SEARCH_TASK_RESULT']);


// Defing Middlewares
var middlewares = [thunk, storageMiddleware];

if (DEBUG) {
  var createLogger = require('redux-logger');
  const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
  };

  var logger = createLogger({
      level: 'info',
      duration: true,
      stateTransformer,
  });

  middlewares.push(logger);
}




// Create Redux Store
//var store = applyMiddleware(...middlewares)(createStore)(rootReducer);
var store = applyMiddleware(...middlewares)(createStore)(rootReducer, initialState);

// create loader function from storage
var load = storage.createLoader(engine);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
load(store)
    .then((newState) => console.log('Loaded state:', newState.tasks.toJS()))
    .catch(() => console.log('Failed to load previous state'));

module.exports = store;
