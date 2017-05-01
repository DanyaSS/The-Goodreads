var config = require('config.json');
var Q = require('q');
var axios = require('axios');

var service = {};

service.get = get;

module.exports = service;

function get(isbn13) {
    var deferred = Q.defer();

    console.log('Server service quote get');

    axios.request({
        url: 'http://quotes.rest/qod.json?category=inspire'
    })
    .then(function (response) {
        console.log('Server service quote get sucess');
        deferred.resolve(response.data);
    })
    .catch(function (error) {
        console.log('Server service quote get failure', error);
        deferred.reject(error);
    });

    return deferred.promise;
}