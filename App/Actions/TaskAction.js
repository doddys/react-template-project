'use strict'

import * as types from './ActionTypes';
var TaskService = require('../Api/TaskService');

// --- List of thunk-function invoked by components/screens
export function runFetchAvailTask(forceReload){
	return (dispatch, getState) => {
		var accessToken = getState().getIn(['currentUser','accessToken']);

		//check if nextPageURL is set, if it is then pass in the next url
		var nextPageUrl = null;

		//if forcerelaod is false, get more data
		if (!forceReload) {
			nextPageUrl = getState().getIn(['availTasks','nextPageUrl']);
		}

		_fetchAvailTask(dispatch, accessToken, nextPageUrl);
  };
}

export function runFetchMyTask(){
	return (dispatch, getState) => {
		var accessToken = getState().getIn(['currentUser','accessToken']);

		//check if nextPageURL is set, if it is then pass in the next url
		var nextPageUrl = getState().getIn(['availTasks','nextPageUrl']);
		_fetchMyTask(dispatch, accessToken, nextPageUrl) ;
  };
}

// deprecated
export function runMoreMyTask(nextPageUrl){
	return (dispatch, getState) => {
		var accessToken = getState().getIn(['currentUser','accessToken']);
		_fetchMyTask(dispatch, accessToken, nextPageUrl) ;
  };
}

export function runClaimMyTask(taskData){
	return (dispatch, getState) => {
		var accessToken = getState().getIn(['currentUser','accessToken']);
		_acceptTask(dispatch, accessToken, taskData);
  };
}


// --- Private function used by thunk
function _fetchAvailTask (dispatch, accessToken, nextPageUrl) {
	console.log("_fetchAvailTask Started");
	dispatch(_fetchAvailTaskStarted());

	TaskService.fetchAvailableTasks(accessToken, nextPageUrl, function(error,data){
		if (error){
				console.log("Error", error);
				dispatch(_fetchAvailTaskFailed(error))
		} else {
			if (nextPageUrl) {
				console.log("Sending More Available Tasks Data via Action");
				dispatch(_moreAvailTaskResultReceived(data))
			} else {
				console.log("Sending Available Tasks Data via Action");
				dispatch(_fetchAvailTaskResultReceived(data))
			}
		}
	});
}


// list of Action Creator Function
function _fetchAvailTaskStarted() {
	return {
		type: types.FETCH_AVAIL_TASK_STARTED,
	};
}

function _fetchAvailTaskFailed (message) {
	return {
		type: types.FETCH_AVAIL_TASK_FAILED,
		message,
	};
}

function _fetchAvailTaskResultReceived(data) {
	return {
		type: types.FETCH_AVAIL_TASK_RESULT,
		data
	};
}

function _moreAvailTaskResultReceived (data) {
	return {
		type: types.FETCH_AVAIL_TASK_RESULT_MORE,
		data,
	};
}

// -- Related to My Tasks
function _fetchMyTask (dispatch, accessToken, nextPageUrl) {
	console.log("_fetchMyTask - Started");
	dispatch(_fetchMyTaskStarted());

	TaskService.fetchMyTasks(accessToken, nextPageUrl, function(error,data){
		if (error){
				console.log("_fetchMyTask - Error", error);
				dispatch(_fetchMyTaskFailed(error))
		} else {
			if (nextPageUrl) {
				console.log("_fetchMyTask - Sending More Available Tasks Data via Action");
				dispatch(_moreMyTaskResultReceived(data))
			} else {
				console.log("_fetchMyTask - Sending Available Tasks Data via Action");
				dispatch(_fetchMyTaskResultReceived(data))
			}
		}
	});
}

function _fetchMyTaskStarted() {
	return {
		type: types.FETCH_MY_TASK_STARTED,
	};
}

function _fetchMyTaskFailed (message) {
	return {
		type: types.FETCH_MY_TASK_FAILED,
		message,
	};
}

function _moreMyTaskResultReceived (data) {
	return {
		type: types.FETCH_MY_TASK_RESULT_MORE,
		data,
	};
}

function _fetchMyTaskResultReceived(data) {
	return {
		type: types.FETCH_MY_TASK_RESULT,
		data
	};
}


// -- Related to Claim Tasks
function _acceptTask(dispatch, accessToken, taskData){
	console.log("AccepTask Started", taskData);
	dispatch(_acceptTaskStarted(taskData, null));

	TaskService.acceptTask(accessToken, taskData.survey.surveyId, function(error,data){
		if (error){
			console.log("Error", error);
			dispatch(_acceptTaskFailed(error))
		} else {
			console.log("Move task from availTask to myTask");
			dispatch(_acceptTaskResult(taskData));
		}
	});
}

function _acceptTaskStarted(task, username) {
	return {
		type: types.TASK_ACCEPT_STARTED,
		task,
	};
}

function _acceptTaskResult(task) {
	return {
		type: types.TASK_ACCEPT_RESULT,
		task,
	};
}

function _acceptTaskFailed(message) {
	return {
		type: types.TASK_ACCEPT_FAILED,
		message,
	};
}




















export function newSearchTask () {
	return {
		type: types.NEW_SEARCH_TASK,
	};
}

export function viewTaskDetail (task) {
	return {
		type: types.TASK_VIEW_DETAIL,
		task
	};
}

export function editTask (task, value) {
	return {
		type: types.TASK_EDIT,
		task,
		value,
	};
}

export function saveTask () {
	return {
		type: types.TASK_SAVE,
	};
}

export function submitTask () {
	return {
		type: types.TASK_SUBMIT,
	};
}


//export const runSearchTasks = (username) => (dispatch) => _searchTasks(dispatch, "dooddy");
export function runSearchTasks(username){
	return function (dispatch) {
		_searchTasks(dispatch, username);
	};
}

//export const moreTasks = (username, nextPageToken) => (dispatch) => _searchTasks(dispatch, username, nextPageToken);
export function moreTasks (username,nextPageToken) {
	return function (dispatch) {
		 _searchTasks(dispatch, username, nextPageToken);
	};
}

//const _searchTasksStarted = (username) => ({type: types.SEARCH_TASK_STARTED, username})
function _searchTasksStarted(username) {
	return {
		type: types.SEARCH_TASK_STARTED,
		username,
	};
}

//const _searchTasksResultReceived = (data) => ({type: types.SEARCH_TASK_RESULT, data})
function _searchTasksResultReceived(data) {
	return {
		type: types.SEARCH_TASK_RESULT,
		data
	};
}

//const _moreSearchTasksResultReceived = (data) => ({type: types.MORE_SEARCH_TASK_RESULT, data})
function _moreSearchTasksResultReceived (data) {
	return {
		type: types.MORE_SEARCH_TASK_RESULT,
		data,
	};
}

//const _searchTasksFailed = (message) => ({type: types.SEARCH_TASK_FAILED, message})
function _searchTasksFailed (message) {
	return {
		type: types.SEARCH_TASK_FAILED,
		message,
	};
}

function _searchTasks (dispatch, username, nextPageToken) {
	console.log("SearchTask Started");
	dispatch(_searchTasksStarted(username));

	TaskService.fetchTasks(username, nextPageToken, function(error,data){
		if (error){
				console.log("Error", error);
				dispatch(_searchTasksFailed(error))
		} else {
			if (nextPageToken) {
				console.log("Sending More Data via Action");
				dispatch(_moreSearchTasksResultReceived(data))
			} else {
				console.log("Sending Data via Action");
				dispatch(_searchTasksResultReceived(data))
			}
		}
	});
}


export function rejectTask(task, username){
	return function (dispatch) {
		console.log("RejectTask Started");
		dispatch(_rejectTaskStarted(task, username));

		var data = {
			status: 'success',
		}
		dispatch(_rejectTaskResult(data));
	};
}

function _rejectTaskStarted(task, username) {
	return {
		type: types.TASK_REJECT_STARTED,
		task,
		username,
	};
}

function _rejectTaskResult(data) {
	return {
		type: types.TASK_REJECT_RESULT,
		data,
	};
}

function _rejectTaskFailed(message) {
	return {
		type: types.TASK_REJECT_FAILED,
		message,
	};
}
