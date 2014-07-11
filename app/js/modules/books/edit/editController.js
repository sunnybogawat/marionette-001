define(['app', 'modules/books/edit/editView'], function (LibraryManager, View) {

    LibraryManager.module('BooksModule.Edit', function (Edit, LibraryManager, Backbone, Marionette, $, _) {

        Edit.Controller = {

            editBook: function (id) {
                require(['common/views', 'entities/book'], function (CommonViews) {
                    var loadingView = new CommonViews.Loading({
                        title: "Artificial Loading Delay",
                        message: "Data loading is delayed to demonstrate using a loading view."
                    });
                    LibraryManager.mainRegion.show(loadingView);
                    var fetchingBook = LibraryManager.request('book:entity', id);
                    $.when(fetchingBook).done(function (book) {
                        var view;
                        if(book !== undefined){
                            view = new View.Book({
                                model: book,
                                generateTitle: true
                            });
                            view.on("form:submit", function(data){
                                if(book.save(data)){
                                    LibraryManager.trigger("book:show", book.get('id'));
                                }
                                else{
                                    view.triggerMethod("form:data:invalid", book.validationError);
                                }
                            });
                        }
                        else{
                            view = new LibraryManager.BooksModule.Show.MissingBook();
                        }
                        LibraryManager.mainRegion.show(view);
                    });
                });
            }
        };        
    });
    
    return LibraryManager.BooksModule.Edit.Controller;
});