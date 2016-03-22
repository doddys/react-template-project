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
    case types.TASK_EDIT:
      var oldData = state.get('dataSource').toJS();
      var updatedData = action.task;
      var updVal = action.value;
      var mergedData = Object.assign(updatedData, updVal);
      var finalData = oldData.reduce(function(accum, current) {
          console.log("current", current.id);
          if (current.id === mergedData.id) {
            console.log("KETEMU", current);
            accum.push(mergedData);
          } else {
            accum.push(current);
          }
          return accum;
      }, []);

      console.log("TASK_EDIT Running - oldData:", oldData);
      console.log("TASK_EDIT Running - updatedData:", updatedData);
      console.log("TASK_EDIT Running - updVal:", updVal);
      console.log("TASK_EDIT Running - mergedData:", mergedData);
      console.log("TASK_EDIT Running - finalData:", finalData);

      state = state.set('dataSource', Immutable.fromJS(finalData));

      return state;

    case types.SEARCH_TASK_STARTED:
      console.log("TASK_STARTED", action.name);
      state = state.set('isLoading', true);

      //fetching data from server is starte
      // update state to fetching to show loading icon
      return state;

    case types.SEARCH_TASK_RESULT:
      //receive search task result data
      //console.log("TASK_RESULT", action);
      var newData = Immutable.fromJS(action.data);
      var oldData = state.get('dataSource');
      //console.log("OLD:", oldData);
      var mergeData = oldData.mergeDeep(newData);
      // console.log("NEWDATA:", newData.last());
      // console.log("OLDDATA:", oldData.last());
      // console.log("MERGEDATA:", mergeData);
      // console.log("SAME:", newData === oldData);
      debug("Same Data: " + mergeData === oldData);
      //modify state
      state = state.set('dataSource', mergeData);
      state = state.set('isLoading', false);
      //return state
      return state;

    case types.SEARCH_TASK_FAILED:
      console.log("TASK_FAILED", action.name);
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
