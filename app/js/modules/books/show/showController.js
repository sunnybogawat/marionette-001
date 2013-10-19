define(['app', 'modules/books/show/showView'], function (LibraryManager, View) {
    LibraryManager.module('BooksModule.Show', function (Show, LibraryManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showBook: function (id) {
                require(['common/views', 'entities/book'], function (CommonViews) {
                    
                    var loadingView = new CommonViews.Loading({
                        title: "Artificial Loading Delay",
                        message: "Data loading is delayed to demonstrate using a loading view."
                    });

                    LibraryManager.mainRegion.show(loadingView);

                    var fetchingBook = LibraryManager.request('book:entity', id);

                    $.when(fetchingBook).done( function (book) {
                        var bookView;
                        if(book !== undefined){
                            bookView = new View.Book({
                                model: book
                            });

                            bookView.on('book:edit', function(book){
                                LibraryManager.trigger('book:edit', book.get('id'));
                            });
                        }
                        else{
                            bookView = new View.MissingBook();
                        }

                        LibraryManager.mainRegion.show(bookView);
                    });

                });
            }
        }
    });

    return LibraryManager.BooksModule.Show.Controller;
});