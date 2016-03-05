import { LOGIN_URL, API_KEY, API_KEY2 } from '../Config/Config';

//var client = require('../Api/HTTPClient')
const base64 = require('base-64');

var AuthService = {
  accountCallback: function(username, callback) {
    return function(error, response) {
      var data = UserService.parseAccount(response);
      console.log(response);
      var data = {
        username: username,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,

      };

      callback(error, data);
    };
  },

  login: function(username, password, callback) {

    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(API_KEY+":"+API_KEY2));
    headers.append("Accept",  "application/json");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    var data = "grant_type=password&username=" + username+ "&password="+ password +"&scope=read";

    console.log("HEADERS: ", headers);
    return fetch(LOGIN_URL, {
        method: "POST",
        headers: headers,
        body: data
    })
    	.then((resp) => resp.json())
    	.then((data) => {
          console.log("receive data", data);
    		  if (data.error) {
            console.log("ERROR" , data.error);
            throw data.error.message || 'Unable to login';
          }
          callback(null,data);

    	   })
    	.catch((err) => {
    		callback(err);
    	});


  }
};

module.exports = AuthService;
