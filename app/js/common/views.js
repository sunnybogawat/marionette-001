/* @annotation:snippet common-views */

define(["app", "tpl!common/templates/loading.html", "spin.jquery"], function (LibraryManager, loadingTpl) {
  
    LibraryManager.module('Common.Views', function(Views, LibraryManager, Backbone, Marionette, $, _) {

        Views.Loading = Marionette.ItemView.extend({
            template: loadingTpl,

            serializeData: function(){
                return {
                  title: this.options.title || "Loading Data",
                  message: this.options.message || "Please wait, data is loading."
                }
            },
  
            onShow: function(){
                var opts = {
                    lines: 13, 				
                    length: 20, 			
                    width: 10, 				
                    radius: 30, 			
                    corners: 1, 			
                    rotate: 0, 				
                    direction: 1, 			
                    color: '#000', 			
                    speed: 1, 				
                    trail: 60, 				
                    shadow: false, 			
                    hwaccel: false, 		
                    className: 'spinner', 	
                    zIndex: 2e9, 			
                    top: '30px', 			
                    left: 'auto'
                };
                $('#spinner').spin(opts);
            }
        });
    });

    return LibraryManager.Common.Views;
});

/* @annotation:/snippet common-views */