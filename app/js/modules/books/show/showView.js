define(['app',
        'tpl!modules/books/show/templates/missing.html',
        'tpl!modules/books/show/templates/view.html'], 
    function (LibraryManager, missingTemplate, viewTemplate) {

        LibraryManager.module('BooksModule.Show.View', function (View, LibraryManager, Backbone, Marionette, $, _) {
            
            View.MissingBook = Marionette.ItemView.extend({
                
                template: missingTemplate 

            });

            View.Book = Marionette.ItemView.extend({
                
                template: viewTemplate,

                events: {
                    "click a.js-edit": "editClicked"
                },

                editClicked: function(e){
                    e.preventDefault();
                    this.trigger("book:edit", this.model);
                }

            });
        });

    return LibraryManager.BooksModule.Show.View;
});