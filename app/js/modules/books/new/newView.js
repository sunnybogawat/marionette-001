define(['app', 'modules/books/common/views'], function (LibraryManager, CommonViews) {
    LibraryManager.module('BooksModule.New.View', function (View, LibraryManager, Backbone, Marionette, $, _) {
        View.Book = CommonViews.Form.extend({
            title: "New Book",
            onRender: function () {
                this.$('.js-submit').text('Create Book');
            }
        });
    });
    return LibraryManager.BooksModule.New.View;
});