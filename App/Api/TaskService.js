'use strict';

//var client = require('../Api/HTTPClient')
//var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var PAGE_SIZE = 25;
//var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
//var REQUEST_URL = API_URL + PARAMS;

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


}

module.exports = TaskService;
