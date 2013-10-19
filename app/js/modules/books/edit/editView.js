define(['app', 'modules/books/common/views'], function (LibraryManager, CommonViews) {

    LibraryManager.module('BooksModule.Edit.View', function (View, LibraryManager, Backbone, Marionette, $, _) {

        View.Book = CommonViews.Form.extend({

            initialize: function () {
                this.title = "Edit " + this.model.get('bookName');
            },

            onRender: function () {
                if(this.options.generateTitle){
                    var $title = $('<h1>', { text: this.title });
                    this.$el.prepend($title);
                }

                this.$(".js-submit").text("Update book");
            }
        });
    });

    return LibraryManager.BooksModule.Edit.View;
});