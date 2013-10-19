define(['app'], function (LibraryManager) {
    LibraryManager.module('BooksModule', function (BooksModule, LibraryManager, Backbone, Marionette, $, _) {

        BooksModule.startWithParent = false;

        BooksModule.onStart = function () {
            console.log('Starting BooksModule.');
        };

        BooksModule.onStop = function () {
            console.log('Stopping BooksModule.');
        };

    });

    LibraryManager.module('Routers.BooksModule', function (BooksModuleRouter, LibraryManager, Backbone, Marionette, $, _) {

        BooksModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'books': 'listBooks',
                'books(?filter:=criterion)': 'listBooks',
                'books/:id': 'showBook',
                'books/:id/edit': 'editBook'
            }
        });

        var executeAction = function (action, arg) {
            LibraryManager.startSubModule('BooksModule');
            action(arg);
            LibraryManager.execute('set:active:header', 'books');
        };
        
        var API = {
            
            listBooks: function (criterion) {
                require(['modules/books/list/listController'], function (ListController) {
                    executeAction(ListController.listBooks, criterion);
                });
            },

            showBook: function (id) {
                require(['modules/books/show/showController'], function (ShowController){
                    executeAction(ShowController.showBook, id);
                });
            },

            editBook: function (id) {
                require(['modules/books/edit/editController'], function (EditController) {
                    executeAction(EditController.editBook, id);
                });
            }

        };

        LibraryManager.on('books:list', function () {
            LibraryManager.navigate('books');
            API.listBooks();
        });

        LibraryManager.on('books:filter', function(criterion) {
            if(criterion){
                LibraryManager.navigate('books?filter=' + criterion);
            }
            else{
                LibraryManager.navigate('books');
            }
        });

        LibraryManager.on('book:show', function (id) {
            LibraryManager.navigate('books/' + id);
            API.showBook(id);
        });

        LibraryManager.on("book:edit", function(id){
            LibraryManager.navigate('books/' + id + '/edit');
            API.editBook(id);
        });

        LibraryManager.addInitializer(function () {
            new BooksModuleRouter.Router({
                controller: API
            });
        });
    });
    
    return LibraryManager.BooksModuleRouter;
});