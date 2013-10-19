define(['app',
        'tpl!modules/books/list/templates/layout.html',
        'tpl!modules/books/list/templates/panel.html',
        'tpl!modules/books/list/templates/none.html',
        'tpl!modules/books/list/templates/list.html',
        'tpl!modules/books/list/templates/listItem.html'], 
    function (LibraryManager, layoutTemplate, panelTemplate, noneTemplate, listTemplate, listItemTemplate) {

        LibraryManager.module('BooksModule.List.View', function(View, LibraryManager, Backbone, Marionette, $, _) {

            View.Layout = Marionette.Layout.extend({
                
                template: layoutTemplate,
                
                regions:{
                    panelRegion: '#panel-region',
                    booksRegion: '#books-region'
                }

            });

            View.Panel = Marionette.ItemView.extend({
                
                template: panelTemplate,

                triggers: {
                    'click button.js-new': 'book:new'
                },

                events: {
                    'click button.js-filter': 'filterClicked'
                },

                ui: {
                    criterion: "input.js-filter-criterion"
                },

                filterClicked: function () {
                    var criterion = this.$(".js-filter-criterion").val();
                    this.trigger("books:filter", criterion);
                },

                onSetFilterCriterion: function(criterion){
                    $(this.ui.criterion).val(criterion);
                }
            });

            View.Book = Marionette.ItemView.extend({
                
                tagName: "tr",

                template: listItemTemplate,

                events: {
                    "click": "highlightName",
                    "click td a.js-show": "showClicked",
                    "click td a.js-edit": "editClicked",
                    "click button.js-delete": "deleteClicked"
                },

                flash: function (cssClass) {
                    var $view = this.$el;
                    $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                        setTimeout(function () {
                            $view.toggleClass(cssClass)
                        }, 500);
                    });
                },

                highlightName: function (e) {
                    this.$el.toggleClass('warning');
                },

                showClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("book:show", this.model);
                },

                editClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("book:edit", this.model);
                },

                deleteClicked: function (e) {
                    e.stopPropagation();
                    this.trigger("book:delete", this.model);
                },

                remove: function(){
                    this.$el.fadeOut(function () {
                      $(this).remove();
                    });
                }
            });

            var NoBooksView = Marionette.ItemView.extend({
                template: noneTemplate,
                tagName: "tr",
                className: "alert"
            });

            View.Books = Marionette.CompositeView.extend({
                tagName: "table",
                className: "table table-hover",
                template: listTemplate,
                emptyView: NoBooksView,
                itemView: View.Book,
                itemViewContainer: "tbody",

                initialize: function () {
                    this.listenTo(this.collection, "reset", function () {
                        this.appendHtml = function (collectionView, itemView, index) {
                            collectionView.$el.append(itemView.el);
                        }
                    });
                },

                onCompositeCollectionRendered: function () {
                    this.appendHtml = function(collectionView, itemView, index){
                        collectionView.$el.prepend(itemView.el);
                    }
                }
            });
        });
    return LibraryManager.BooksModule.List.View;
});