'use strict'

import * as types from './ActionTypes';
var TaskService = require('../Api/TaskService');

export const SEARCH_AVAIL_TASK_TYPE = 1;
export const SEARCH_MY_TASK_TYPE = 2;

export function runSearchTasks(taskType, authToken){
	return function (dispatch, state) {
		switch (taskType) {
			case SEARCH_AVAIL_TASK_TYPE:
				_searchTasks(dispatch, authToken);

			case SEARCH_MY_TASK_TYPE:
				_searchMyTasks(dispatch, authToken);

			default:
				_searchTasks(dispatch, authToken);
		}

	};
}

export function moreTasks (authToken, nextPageToken) {
	return function (dispatch) {
		 _searchTasks(dispatch, nextPageToken);
	};
}


function _searchTasks (dispatch, authToken, nextPageToken) {
	console.log("SearchTask Started");
	dispatch(_searchTasksStarted());

	TaskService.fetchAvailableTasks(authToken, function(error,data){
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

function _searchMyTasks (dispatch, authToken, nextPageToken) {
	console.log("SearchTask Started");
	dispatch(_searchTasksStarted());

	TaskService.fetchMyTasks(authToken, function(error,data){
		if (error){
				console.log("Error", error);
				dispatch(_searchTasksFailed(error))
		} else {
			if (nextPageToken) {
				console.log("Sending More Data via Action");
				dispatch(_moreMyTasksResultReceived(data))
			} else {
				console.log("Sending Data via Action");
				dispatch(_myTasksResultReceived(data))
			}
		}
	});
}

function _searchTasksStarted() {
	return {
		type: types.SEARCH_TASK_STARTED,
	};
}

function _searchTasksFailed (message) {
	return {
		type: types.SEARCH_TASK_FAILED,
		message,
	};
}

function _moreSearchTasksResultReceived (data) {
	return {
		type: types.MORE_SEARCH_TASK_RESULT,
		data,
	};
}

function _searchTasksResultReceived(data) {
	return {
		type: types.SEARCH_TASK_RESULT,
		data
	};
}

function _moreMyTasksResultReceived (data) {
	return {
		type: types.MORE_MY_TASK_RESULT,
		data,
	};
}

function _myTasksResultReceived(data) {
	return {
		type: types.MY_TASK_RESULT,
		data
	};
}
