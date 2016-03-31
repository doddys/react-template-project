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
    availTask: [],
    myTask: [],
    isLoading: false,
    moreData: false,
    currentTask: null,
    nextPageNumber: 1,
    totalTasks: {},
    searchQuery: {},
    filter: '',
  },
);

function taskSearchReducer(state = initialState, action) {
  switch (action.type) {

    case types.SEARCH_TASK_STARTED:
      console.log("SEARCH_TASK_STARTED", action);
      state = state.set('isLoading', true);

      return state;

    case types.SEARCH_TASK_RESULT:
      console.log("SEARCH_TASK_RESULT", action.data);

      var newData = Immutable.fromJS(action.data.content);
      var oldData = state.get('availTask');
      var mergeData = oldData.mergeDeep(newData);
      debug("Same Data: " + mergeData === oldData);

      state = state.set('availTask', mergeData);
      state = state.set('isLoading', false);
      state = state.set('moreData', function (v) {
        if (action.data.page.number < action.data.page.totalPages - 1)
          return true;
        else
          return false;}
      );

      return state;

    case types.MY_TASK_RESULT:
      console.log("MY_TASK_RESULT", action.data);

      var newData = Immutable.fromJS(action.data.content);
      var oldData = state.get('myTask');
      var mergeData = oldData.mergeDeep(newData);
      debug("Same Data: " + mergeData === oldData);

      state = state.set('myTask', mergeData);
      state = state.set('isLoading', false);
      state = state.set('moreData', function (v) {
        if (action.data.page.number < action.data.page.totalPages - 1)
          return true;
        else
          return false;}
      );

      return state;

    case types.MORE_SEARCH_TASK_RESULT:
      var newData = Immutable.fromJS(action.data.content);
      var oldData = state.get('availTask');
      var mergeData = oldData.concat(newData);

      state = state.set('availTask', mergeData);
      state = state.set('isLoading', false);
      state = state.set('moreData', function (v) {
        if (action.data.page.number < action.data.page.totalPages - 1)
          return true;
        else
          return false;}
      );

      return state;

    case types.SEARCH_TASK_FAILED:
      console.log("TASK_FAILED", action.name);
      state = state.set('isLoading', false);

      return state;

    case types.TASK_ACCEPT_STARTED:
      console.log("TASK_ACCEPT_STARTED", action);
      state = state.set('isLoading', true);
      return state;

    case types.TASK_ACCEPT_RESULT:
      console.log("TASK_ACCEPT_RESULT", action);

      // append accepted task to myTask list
      var myTask = state.get('myTask').toJS();
      console.log("myTask", myTask);
      myTask.push(action.task);
      console.log("myTask after push", myTask);

      // remove claimed task from availTask list
      console.log("Prune Available Task");
      var oldData = state.get('availTask').toJS();
      console.log("oldData", oldData);
      var newData = oldData.reduce(function(accum, current) {
          console.log("current", current);
          console.log("current.surveyId", current.surveyId);
          if (current.surveyId === action.task.surveyId) {
            console.log("exclude claimed task");
          } else {
            console.log("push current");
            accum.push(current);
          }
          return accum;
      }, []);

      state = state.set('availTask', Immutable.fromJS(newData));
      state = state.set('myTask', Immutable.fromJS(myTask));
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

module.exports = taskSearchReducer;
