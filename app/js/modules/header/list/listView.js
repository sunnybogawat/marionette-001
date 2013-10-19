define(['app',
        'tpl!modules/header/list/templates/list.html',
        'tpl!modules/header/list/templates/listItem.html'], 
        function (LibraryManager, listTemplate, listItemTemplate) {
            LibraryManager.module('HeaderModule.List.View', function (View, LibraryManager, Backbone, Marionette, $, _) {
                View.Header = Marionette.ItemView.extend({
                    
                    template: listItemTemplate,

                    tagName: 'li',

                    events: {
                        'click a': 'navigate'
                    },

                    navigate: function (e) {
                        e.preventDefault(); //Explore what this means!
                        this.trigger('navigate', this.model);
                    },

                    onRender: function () {
                        if(this.model.selected){
                            // add class 'active' so Bootstrap will 
                            //highlight the active entry in the navbar
                            this.$el.addClass('active');
                        }
                    }

                });


                View.Headers = Marionette.CompositeView.extend({
                    
                    template: listTemplate,

                    className: "navbar navbar-inverse navbar-fixed-top",

                    itemView: View.Header,

                    itemViewContainer: 'ul',

                    events: {
                        'click a.brand': 'brandClicked'
                    },

                    brandClicked : function (e) {
                        e.preventDefault();
                        this.trigger("brand:clicked")
                    }
                });

            });

        return LibraryManager.HeaderModule.List.View;
});