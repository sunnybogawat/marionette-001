define(['app', 'modules/books/list/listView'], function (LibraryManager, View) {

    LibraryManager.module('BooksModule.List', function (List, LibraryManager, Backbone, Marionette, $, _) {

        List.Controller = {

            listBooks: function (criterion) {

                require(['common/views', 'entities/book'], function (CommonViews) {

                    var loadingView = new CommonViews.Loading();
                    LibraryManager.mainRegion.show(loadingView);

                    var fetchingBooks = LibraryManager.request('book:entities');
                    var booksListLayout = new View.Layout();
                    var booksListPanel = new View.Panel();

                    require(['entities/common'], function (FilteredCollection) {
                        
                        $.when(fetchingBooks).done(function (books) {
                            var filteredBooks = LibraryManager.Entities.FilteredCollection({
                                collection: books,
                                filterFunction: function (filterCriterion) {
                                    var criterion = filterCriterion.toLowerCase();
                                    return function (book) {
                                        if(book.get('bookName').toLowerCase().indexOf(criterion) !== -1
                                            || book.get('authorName').toLowerCase().indexOf(criterion) !== -1
                                            || book.get('publication').toLowerCase().indexOf(criterion) !== -1
                                            || book.get('year').toLowerCase().indexOf(criterion) !== -1){
                                            return book;
                                        }
                                    };
                                }
                            });

                            if(criterion){
                                filteredBooks.filter(criterion);
                                booksListPanel.once('show', function () {
                                    booksListPanel.triggerMethod("set:filter:criterion", criterion);
                                });
                            }

                            var booksListView = new View.Books({
                                collection: filteredBooks
                            });

                            booksListPanel.on('books:filter', function (filterCriterion) {
                                filteredBooks.filter(filterCriterion);
                                LibraryManager.trigger("books:filter", filterCriterion);
                            });

                            booksListLayout.on("show", function(){
                                booksListLayout.panelRegion.show(booksListPanel);
                                booksListLayout.booksRegion.show(booksListView);
                            });

                            booksListPanel.on('book:new', function () {

                                require(["modules/books/new/newView"], function (NewView) {
                                    var newBook = LibraryManager.request("book:entity:new");
                                    var view = new NewView.Book({
                                        model: newBook                                    
                                    });

                                    view.on("form:submit", function (data) {
                                       var highestId = books.max( function (book) { return book.id; }).get('id');
                                        data.id = highestId + 1;
                                        if( newBook.save(data) ){
                                            books.add(newBook);
                                            view.trigger("dialog:close");
                                            var newBookView = booksListView.children.findByModel(newBook);
                                            // check whether the new book view is displayed (it could be
                                            // invisible due to the current filter criterion)
                                            if (newBookView){
                                                newBookView.flash('success');
                                            }
                                        }
                                        else{
                                            view.triggerMethod("form:data:invalid", newBook.validationError);
                                        }
                                    });

                                    LibraryManager.dialogRegion.show(view);
                                });
                            });

                            booksListView.on('itemview:book:show', function (childView, model) {
                                LibraryManager.trigger("book:show", model.get('id'));
                            });

                            booksListView.on('itemview:book:edit', function(childView, model) {
                                require(['modules/books/edit/editView'], function (EditView) {
                                    var view = new EditView.Book({
                                        model: model
                                    });

                                    view.on('form:submit', function(data) {
                                        if(model.save(data)){
                                            childView.render();
                                            view.trigger("dialog:close");
                                            childView.flash("success");
                                        }
                                        else{
                                            view.triggerMethod('form:data:invalid', model.validationError);
                                        }
                                    });

                                    LibraryManager.dialogRegion.show(view);
                                });
                            });

                            booksListView.on("itemview:book:delete", function (childView, model) {
                                model.destroy();
                            });

                            LibraryManager.mainRegion.show(booksListLayout);

                        });

                    });

                });

            }

        }

    });

    return LibraryManager.BooksModule.List.Controller;
});