(function () {
    'use strict';

    angular
        .module('app')
        .factory('BookService', Service);

    function Service($http, $q) {
        var service = {};

        service.Search = Search;
    
        return service;

        function Search(q, page) {
            console.log('Book service search [%s] page [%s]', q, page);
            return $http.post('/api/books/search', {q: q, page: page}).then(handleSuccess, handleError);
        }
        
        // private functions

        function handleSuccess(res) {
            console.log('Book service success', res);
            return res.data;
        }

        function handleError(res) {
            console.log('Book service failure', res);
            return $q.reject(res.data);
        }
    }

})();
