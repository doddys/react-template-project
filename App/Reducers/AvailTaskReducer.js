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

const initialState = Immutable.fromJS({
  dataSource: [], // data list
  isLoading: false, // to keep track background fetching and display progress bar
  isFirstPage: true, // ????
  currentPage: 0, // ????
  totalPages: 1, // total pages return by server
  nextPageUrl: null, // to fetch more data url
  prevPageUrl: null, // not sure for what?
  moreData: false, // flag for more data is available ... may be eliminated by checking nextPageURl
}, );

function availTaskReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_AVAIL_TASK_STARTED:
      console.log("FETCH_AVAIL_TASK_STARTED", action);
      state = state.set('isLoading', true);

      return state;

    case types.FETCH_AVAIL_TASK_RESULT:
      console.log("FETCH_AVAIL_TASK_RESULT", action.data);

      state = _updateCommonState(state, action.data);

      // filter only task with status = 'NEW'
      // may not be needed and can be performed on the server side
      var dataFromAction = action.data.content;
      // var filteredData = action.data.content.reduce(function(accum, current) {
      //   console.log("current", current);
      //   var survey = current.survey;
      //   if (survey.status === 'NEW') {
      //     console.log("push data with status=NEW");
      //     accum.push(current);
      //   } else {
      //     console.log("skip data");
      //   }
      //   return accum;
      // }, []);

      // set state
      // state = state.set('dataSource', Immutable.fromJS(filteredData))
      state = state.set('dataSource', dataFromAction)
        .set('isFirstPage', true);

      return state;

    case types.FETCH_AVAIL_TASK_RESULT_MORE:
      console.log("FETCH_AVAIL_TASK_RESULT", action.data);

      state = _updateCommonState(state, action.data);

      // filter only task with status = 'NEW'
      var dataFromAction = action.data.content;
      // var filteredData = dataFromAction.reduce(function(accum, current) {
      //   console.log("current", current);
      //   var survey = current.survey;
      //   if (survey.status === 'NEW') {
      //     console.log("push data with status=NEW");
      //     accum.push(current);
      //   } else {
      //     console.log("skip data");
      //   }
      //   return accum;
      // }, []);

      // merge with old data
      // var newData = Immutable.fromJS(filteredData);
      var newData = dataFromAction;
      console.log('newData', newData);
      var oldData = state.get('dataSource');
      console.log('oldData', oldData);
      var mergedData = oldData.concat(newData);
      console.log('mergedData', mergedData);

      // set state
      //state = state.set('dataSource', Immutable.fromJS(mergedData));
      state = state.set('dataSource', mergedData)
          .set('isFirstPage', false);

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

      state = state.set('dataSource', Immutable.fromJS(newData))
        .set('isLoading', false);
      return state;

    case types.TASK_ACCEPT_FAILED:
      console.log("TASK_FAILED", action.name);
      state = state.set('isLoading', false);
      return state;

    default:
      return state;
  }
}

function _updateCommonState(state, data) {
  var currentPage = data.page.number;
  var totalPages = data.page.totalPages;
  var moreData = (currentPage < totalPages - 1);

  var nextPage = data.links.find((link) => link.rel === 'next');
  var prevPage = data.links.find((link) => link.rel === 'prev');

  state = state.set('isLoading', false)
    .set('currentPage', currentPage)
    .set('totalPages', totalPages)
    .set('moreData', moreData);

  if (nextPage)
    state = state.set('nextPageUrl', nextPage.href);
  else
    state = state.set('nextPageUrl', null);

  if (prevPage)
    state = state.set('prevPageUrl', prevPage.href);
  else
    state = state.set('prevPageUrl', null);


  return state;

}

module.exports = availTaskReducer;
