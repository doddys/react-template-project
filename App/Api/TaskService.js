'use strict';

//var client = require('../Api/HTTPClient')

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

import Immutable from 'immutable';
import {
  Map,
  List,
  fromJS
} from 'immutable';


var TaskService = {

  fetchTasks: function(username, nextPageToken, callback) {
    console.log("Fetch....");

    var url = REQUEST_URL;
    if (nextPageToken) {
    	url += `&pageToken=${nextPageToken}`
    }

    fetch(url)
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


}

module.exports = TaskService;
