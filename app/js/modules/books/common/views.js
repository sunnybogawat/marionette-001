define(['app', 'tpl!modules/books/common/templates/form.html', 'backbone.syphon'], 
    function (LibraryManager, formTemplate) {

        LibraryManager.module('BooksModule.Common.Views', function (Views, LibraryManager, Backbone, Marionette, $, _) {

            Views.Form = Marionette.ItemView.extend({
                template: formTemplate,

                events: {
                    'click button.js-submit': 'submitClicked'
                },

                submitClicked: function (e){
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    this.trigger("form:submit", data);
                },

                onFormDataInvalid: function (e) {
                    var $view = this.$el;

                    var clearFormErrors = function (){
                        var $form = $view.find('form');
                        $form.find('.help-inline.error').each( function () {
                            $(this).remove();
                        });

                        $form.find(".control-group.error").each( function () {
                            $(this).removeClass("error");
                        });
                    };

                    var markErrors = function (value, key){
                        var $controlGroup = $view.find("#book-" + key).parent();
                        var $errorEl = $('<span>', { class: "help-inline error", text: value });
                        $controlGroup.append($errorEl).addClass("error");
                    };

                    //Clear all the existing errors
                    clearFormErrors();

                    //Mark the new fields as having errors.
                    _.each(errors, markErrors);
                }
            });

        });
    return LibraryManager.BooksModule.Common.Views;
});