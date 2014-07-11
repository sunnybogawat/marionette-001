define(['app', 'modules/config/storage/localstorage'], function (LibraryManager) {
    LibraryManager.module('Entities', function(Entities, LibraryManager, Backbone, Marionette, $, _) {
        Entities.Book = Backbone.Model.extend({
            
            urlRoot: 'books',

            defaults: {
                bookName: '',
                authorName: '',
                publication: '',
                year: '',
                imagePath: ''
            },

            validate: function (attrs, options) {
                var errors = {};
                if (!attrs.bookName) {
                    errors.bookName = "can't be blank";
                }
                if (!attrs.authorName) {
                    errors.authorName = "can't be blank";
                }
                if (!attrs.publication) {
                    errors.publication = "can't be blank";
                }
                if(!_.isEmpty(errors)){
                    return errors;
                }
            }
        });

        // Setup storage the model.
        Entities.configureStorage(Entities.Book);

        Entities.Books = Backbone.Collection.extend({
            url: 'books',
            model: Entities.Book,
            comparator: "bookName"
        });

        //Setup storage for the collection.
        Entities.configureStorage(Entities.Books);

        var initializeBooks = function() {

            var books = new  Entities.Books([
                {
                    id : 1,
                    bookName: 'JavaScript: The Definitive Guide',
                    authorName: 'David Flanagan',
                    publication: 'O Reilly',
                    year: '2011',
                    imagePath: './app/img/books/JavaScript_Definitive_Guide.jpg'
                },
                {
                    id : 2,
                    bookName: 'JavaScript: The Good Parts',
                    authorName: 'Douglas Crockford',
                    publication: 'O Reilly',
                    year: '2008',
                    imagePath: './app/img/books/JavaScript_Good_Parts.jpg'
                },
                {
                    id : 3,
                    bookName: 'JavaScript Patterns',
                    authorName: 'Stoyan Stefanov',
                    publication: 'O Reilly',
                    year: '2010',
                    imagePath: './app/img/books/JavaScript_Patterns.jpg'
                }
            ]);

            books.forEach(function(book){
                book.save();
            });

            return books.models;
        };

        var API = {

            getBookEntities : function () {

                var books = new Entities.Books();
                var defer = $.Deferred();
                books.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });

                var promise = defer.promise();
                $.when(promise).done( function (books) {
                    if(books.length === 0){
                        // if we don't have any books yet, create few books
                        var models = initializeBooks();
                        books.reset(models);
                    }
                });
                return promise;
            },

            getBookEntity : function (bookId) {

                var book = new Entities.Book({id : bookId});
                var defer = $.Deferred();
                setTimeout(function(){
                    book.fetch({
                        success: function (data) {
                            defer.resolve(data);
                        },
                        error: function (data) {
                            defer.resolve(undefined);
                        }
                    });
                }, 2000);
                return defer.promise();
            }
        };

        LibraryManager.reqres.setHandler("book:entities", function() {
            return API.getBookEntities();
        });

        LibraryManager.reqres.setHandler("book:entity", function(id) {
            return API.getBookEntity(id);
        });

        LibraryManager.reqres.setHandler("book:entity:new", function(id) {
            return new Entities.Book();
        });
    });    
    return;
});