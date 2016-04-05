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
    case types.FETCH_AVAIL_TASK_STARTED:
      console.log("FETCH_AVAIL_TASK_STARTED", action);
      state = state.set('isLoading', true);

      return state;

    case types.FETCH_AVAIL_TASK_RESULT:
      console.log("FETCH_AVAIL_TASK_RESULT", action.data);

      // filter only task with status = 'NEW'
      var dataFromAction = action.data.content;
      var filteredData = dataFromAction.reduce(function(accum, current) {
          console.log("current", current);
          var survey = current.survey;
          if (survey.status === 'NEW') {
            console.log("push data with status=NEW");
            accum.push(current);
          } else {
            console.log("skip data");
          }
          return accum;
      }, []);

      var currentPage = action.data.page.number;
      var totalPages = action.data.page.totalPages;
      var moreData = false;
      if (currentPage < totalPages - 1)
        moreData = true;

      var nextPage = action.data.links.find((link) => link.rel === 'next');
      var prevPage = action.data.links.find((link) => link.rel === 'prev');

      // set state
      state = state.set('dataSource', Immutable.fromJS(filteredData));
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

    case types.MORE_AVAIL_TASK_RESULT:
      console.log("FETCH_AVAIL_TASK_RESULT", action.data);

      // filter only task with status = 'NEW'
      var dataFromAction = action.data.content;
      var filteredData = dataFromAction.reduce(function(accum, current) {
          console.log("current", current);
          var survey = current.survey;
          if (survey.status === 'NEW') {
            console.log("push data with status=NEW");
            accum.push(current);
          } else {
            console.log("skip data");
          }
          return accum;
      }, []);

      // merge with old data
      var newData = Immutable.fromJS(filteredData);
      console.log('newData', newData);
      var oldData = state.get('dataSource');
      console.log('oldData', oldData);
      var mergedData = oldData.concat(newData);
      console.log('mergedData', mergedData);

      // get other information and cast it to immutable
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

    case types.FETCH_AVAIL_TASK_FAILED:
      console.log("FETCH_AVAIL_TASK_FAILED", action.name);
      state = state.set('isLoading', false);

      return state;

    case types.TASK_ACCEPT_STARTED:
      console.log("TASK_ACCEPT_STARTED", action);
      state = state.set('isLoading', true);
      return state;

    case types.TASK_ACCEPT_RESULT:
      console.log("TASK_ACCEPT_RESULT", action);

      // remove claimed task from availTask list
      console.log("Prune Available Task");
      var oldData = state.get('dataSource').toJS();
      console.log("oldData", oldData);
      var newData = oldData.reduce(function(accum, current) {
          console.log("current", current);
          var survey = current.survey;
          console.log("current.surveyId", survey.surveyId);
          if (survey.surveyId === action.task.surveyId) {
            console.log("exclude claimed task");
          } else {
            console.log("push current");
            accum.push(current);
          }
          return accum;
      }, []);

      state = state.set('dataSource', Immutable.fromJS(newData));
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
