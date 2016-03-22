'use strict'

import * as types from './ActionTypes';
var TaskService = require('../Api/TaskService');


//export const newSearchTasks = () => ({type: types.NEW_SEARCH_TASK});
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


export function acceptTask(task, username){
	return function (dispatch) {
		console.log("AccepTask Started");
		dispatch(_acceptTaskStarted(task, username));

		var data = {
			status: 'success',
		}

		dispatch(_acceptTaskResult(data));
	};
}

function _acceptTaskStarted(task, username) {
	return {
		type: types.TASK_ACCEPT_STARTED,
		task,
		username,
	};
}

function _acceptTaskResult(data) {
	return {
		type: types.TASK_ACCEPT_RESULT,
		data,
	};
}

function _acceptTaskFailed(message) {
	return {
		type: types.TASK_ACCEPT_FAILED,
		message,
	};
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
