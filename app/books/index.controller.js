(function () {
    'use strict';

    angular
        .module('app')
        .controller('Books.IndexController', Controller);

    function Controller($window, BookService, FlashService) {
        var vm = this;

        vm.searchBook = searchBook;
        vm.searchResult = null;

        initController();

        function initController() {
        }

        function searchBook(q, page) {
            console.log('Angular searchBook [%s] page [%s]', vm.book.q, page);
            BookService.Search(vm.book.q, page)
                .then(function (data) {
                    console.log('Books controller search Success', data);
                    vm.searchResult = data;
                    data.current_page = parseInt(data.current_page);
                    
                    data.pages = {
                        prev: {disabled: true},
                        next: {disabled: true},
                        list: []
                    };

                    if (data.current_page > 1) {
                        data.pages.prev.number = data.current_page - 1;
                        data.pages.prev.disabled = false;
                    }

                    if (data.current_page < data.page_count) {
                        data.pages.next.number = data.current_page + 1;
                        data.pages.next.disabled = false;
                    }

                    for (let z = 1; z <= data.page_count; z++) {
                        data.pages.list.push({
                            number: z,
                            active: data.current_page == z
                        });
                    }

                    // FlashService.Success('Book found', data);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();