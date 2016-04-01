'use strict';

//var client = require('../Api/HTTPClient')
//var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var PAGE_SIZE = 25;
var TASK_API_URL = 'http://192.168.135.1:9090/survey';
//var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
//var REQUEST_URL = API_URL + PARAMS;

var AVAIL_TASK_URL = 'https://dev.expecc.com:18091/api-gateway/api/survey/findByLoketName?loket_code=001';
var MY_TASK_URL = 'https://dev.expecc.com:18091/api-gateway/api/survey/findMine';
var ACCEPT_TASK_URL = 'https://dev.expecc.com:18091/api-gateway/api/survey/';

import Immutable from 'immutable';
import {
  Map,
  List,
  fromJS
} from 'immutable';


var TaskService = {

  fetchTasks: function(username, nextPageToken, callback) {
    console.log("Fetch....", nextPageToken);

    // var url = REQUEST_URL;
    // if (nextPageToken) {
    // 	url += `&pageToken=${nextPageToken}`
    // }

    //not using username yet as it is still dummmy
    fetch(this._urlForQueryAndPage(null, nextPageToken))
    	.then((resp) => resp.json())
    	.then((data) => {
          console.log("receive data", data);
    		  if (data.error) throw data.error.message || 'Unable to search';
          callback(null,data);

    	   })
    	.catch((err) => {
    		callback(err);
    	});

  },

  _urlForQueryAndPage: function(query: string, pageNumber: number): string {
    var apiKey = API_KEY;

    if (!pageNumber) {
      pageNumber = 1;
    }

    if (query) {
      return (
        API_URL + 'movies.json?apikey=' + apiKey + '&q=' +
        encodeURIComponent(query) + '&page_limit=' + PAGE_SIZE + '&page=' + pageNumber
      );
    } else {
      // With no query, load latest movies
      return (
        API_URL + 'lists/movies/in_theaters.json?apikey=' + apiKey +
        '&page_limit='+ PAGE_SIZE +'&page=' + pageNumber
      );
    }
  },

  _urlForClaimTask: function(surveyId): string {
    return(
      ACCEPT_TASK_URL + surveyId + '/claim'
    );
  },

  fetchAvailableTasks: function(authToken, callback) {
    console.log("fetchAvailableTasks() started", AVAIL_TASK_URL);

    console.log("get authToken", authToken);

    var headers = new Headers();
    headers.append("Authorization", "Bearer " + authToken);
    headers.append("Accept",  "application/json");

    fetch(AVAIL_TASK_URL, {
        method: "GET",
        headers: headers
    })
    	.then((resp) => resp.json())
    	.then((data) => {
          console.log("receive data", data);

    		  if (data.error) throw data.error.message || 'Unable to search';
          callback(null,data);
    	   })
    	.catch((err) => {
    		callback(err);
    	});

  },

  fetchMyTasks: function(authToken, callback) {
    console.log("fetchMyTasks() started", MY_TASK_URL);
    console.log("get authToken", authToken);

    var headers = new Headers();
    headers.append("Authorization", "Bearer " + authToken);
    headers.append("Accept",  "application/json");

    fetch(MY_TASK_URL, {
        method: "GET",
        headers: headers
    })
      .then((resp) => resp.json())
      .then((data) => {
          console.log("receive data", data);

          if (data.error) throw data.error.message || 'Unable to search';
          callback(null,data);
         })
      .catch((err) => {
        callback(err);
      });

  },

  acceptTask: function(authToken, surveyId, callback) {
    console.log("acceptTask() started", ACCEPT_TASK_URL)

    var headers = new Headers();
    headers.append("Authorization", "Bearer " + authToken);
    headers.append("Accept",  "application/json");

    fetch(this._urlForClaimTask(surveyId), {
        method: "POST",
        headers: headers
    })
      .then((resp) => resp.json())
      .then((data) => {
          console.log("receive data", data);
          console.log("receive data.status", data.status);

          if (data.error || data.status != 0) throw data.error.message || 'Unable to Claim Task';
          callback(null,data);
         })
      .catch((err) => {
        callback(err);
      });

  },

}

module.exports = TaskService;
