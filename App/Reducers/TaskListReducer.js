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
    currentTask: null,
  },
);

tasks:
function taskListReducer(state = initialState, action) {
  //console.log("TaskList", state, action);


  switch (action.type) {
    case types.SEARCH_TASK_STARTED:
      console.log("TASK_STARTED", action);
      state = state.set('isLoading', true);

      //fetching data from server is starte
      // update state to fetching to show loading icon
      return state;

    case types.SEARCH_TASK_RESULT:
      //receive search task result data
      console.log("TASK_RESULT", action);
      var newData = Immutable.fromJS(action.data);
      var oldData = state.get('dataSource');
      var mergeData = oldData.merge(newData);
      console.log("NEWDATA:", newData.toJS());
      console.log("OLDDATA:", oldData.toJS());
      console.log("MERGEDATA:", mergeData.toJS());
      console.log("SAME:", newData === oldData);
      console.log("SAME2:", mergeData === oldData);
      //modify state
      state = state.set('dataSource', oldData.merge(newData));
      state = state.set('isLoading', false);
      //return state
      return state;

    case types.SEARCH_TASK_FAILED:
      console.log("TASK_FAILED", action);
      state = state.set('isLoading', false);
      // Unable to fetch data
      // update state to fetching to show error
      return state;

    case types.TASK_ACCEPT_STARTED:
      // flag that network is Started
      // flag that screen must wait
    return state;

    case types.TASK_ACCEPT_RESULT:
      // update state that task has been accepted
      // update network is finished
      // stop waiting screen
    return state;

    case types.TASK_ACCEPT_FAILED:
    // update network is finished
    // stop waiting screen
    // show error
    return state;


    default:
      return state;
  }

}

module.exports = taskListReducer;
