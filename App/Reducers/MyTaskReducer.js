'use-strict'

var Actions = require('react-native-router-flux').Actions;
import * as types from '../Actions/ActionTypes';

var Immutable = require('immutable');
var {
  Map,
  List,
  fromJS
} = Immutable;

var React = require('react-native');
var debug = require('../debug');

const initialState = Immutable.fromJS(
  {
    dataSource: [],
    isLoading: false,
    currentPage: 0,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
    moreData: false,
  },
);

function availTaskReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MY_TASK_STARTED:
      console.log("FETCH_MY_TASK_STARTED", action);
      state = state.set('isLoading', true);

      return state;

    case types.FETCH_MY_TASK_RESULT:
      console.log("FETCH_MY_TASK_RESULT", action.data);

      // merge with old data, old data will always supersedes server
      var newData = Immutable.fromJS(action.data.content);
      console.log('newData', newData);
      var oldData = state.get('dataSource');
      console.log('oldData', oldData);
      var mergedData = oldData.mergeWith((prev, next) => prev? prev : next, newData);
      console.log('mergedData', mergedData.toJS());

      var currentPage = action.data.page.number;
      var totalPages = action.data.page.totalPages;
      var moreData = false;
      if (currentPage < totalPages - 1)
        moreData = true;

      var nextPage = action.data.links.find((link) => link.rel === 'next');
      var prevPage = action.data.links.find((link) => link.rel === 'prev');


      // set state
      state = state.set('dataSource', Immutable.fromJS(mergedData));
      state = state.set('isLoading', false);
      state = state.set('isFirstPage', true);
      state = state.set('currentPage', currentPage);
      state = state.set('totalPages', totalPages);
      if (nextPage)
        state = state.set('nextPageUrl', nextPage.href);
      else
        state = state.set('nextPageUrl', null);

      if (prevPage)
        state = state.set('prevPageUrl', prevPage.href);
      else
        state = state.set('prevPageUrl', null);

      state = state.set('moreData', moreData);

      return state;

    case types.FETCH_MY_TASK_RESULT_MORE:
      console.log("FETCH_MY_TASK_RESULT_MORE", action.data);

      // merge with old data
      var newData = Immutable.fromJS(action.data.content);
      console.log('newData', newData);
      var oldData = state.get('dataSource');
      console.log('oldData', oldData);
      var mergedData = oldData.mergeDeepWith((prev, next) => prev, newData);
      console.log('mergedData', mergedData);

      // get other information
      var currentPage = action.data.page.number;
      var totalPages = action.data.page.totalPages;
      var moreData = false;
      if (currentPage < totalPages - 1)
        moreData = true;

      var nextPage = action.data.links.find((link) => link.rel === 'next');
      var prevPage = action.data.links.find((link) => link.rel === 'prev');

      // set state
      state = state.set('dataSource', Immutable.fromJS(mergedData));
      state = state.set('isLoading', false);
      state = state.set('currentPage', currentPage);
      state = state.set('totalPages', totalPages);
      if (nextPage)
        state = state.set('nextPageUrl', nextPage.href);
      else
        state = state.set('nextPageUrl', null);

      if (prevPage)
        state = state.set('prevPageUrl', prevPage.href);
      else
        state = state.set('prevPageUrl', null);

      state = state.set('moreData', moreData);

      return state;

    case types.FETCH_MY_TASK_FAILED:
      console.log("FETCH_MY_TASK_FAILED", action.name);
      state = state.set('isLoading', false);

      return state;

    case types.TASK_ACCEPT_STARTED:
      console.log("TASK_ACCEPT_STARTED", action);
      state = state.set('isLoading', true);
      return state;

    case types.TASK_ACCEPT_RESULT:
      console.log("TASK_ACCEPT_RESULT", action);

      // append accepted task to myTask list
      var myTaskList = state.get('dataSource').toJS();
      console.log("myTaskList", myTaskList);
      myTaskList.push(action.task);
      console.log("myTaskList after push", myTaskList);

      state = state.set('dataSource', Immutable.fromJS(myTaskList));
      state = state.set('isLoading', false);
      return state;

    case types.TASK_ACCEPT_FAILED:
      console.log("TASK_FAILED", action.name);
      state = state.set('isLoading', false);
      return state;

    default:
      return state;
  }
}

module.exports = availTaskReducer;
