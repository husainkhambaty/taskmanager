var request = require('request'); // require in request
var getAllTasksAPI = {uri: 'http://localhost:8080/api/tasks?limit=20&start=1', type: 'get'};
var postNewTaskAPI = {uri: 'http://localhost:8080/api/tasks', type: 'post'};
//var initPost = {uri: 'http://http://linkToApi.com/post'};

/*var apiCaller = function (url, formParms, cb) {
  //use request to make the external http call to the JSON api
  request({
    url: url,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      cb(body);// Send body/response to callback
    }
  })
};*/



// Call the api with a call back
var getAllTasksAPICall = function(cb) {
  return request({
            url: getAllTasksAPI.uri,
            json: true
          }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
              cb(body);// Send body/response to callback
            }
          });
};

var postNewTaskAPICall = function(formParams, cb) {
  return request({
            url: postNewTaskAPI.uri,
            json: true
          }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
              cb(body);// Send body/response to callback
            }
          });
};

/*var apiPost = function(post, cb) {
  return apiCaller(initGet.uri + post, cb);
};*/

// Export the functions for external access
module.exports = {
  getAllTasksAPICall: getAllTasksAPICall
};