define([
    'marionette',
    'modules/config/marionette/regions/dialog'], function (Marionette) {

    var LibraryManager = new Marionette.Application();

    LibraryManager.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region",
        footerRegion: "footer-region",
        dialogRegion: Marionette.Region.Dialog.extend({
            el:"#dialog-region"
        })
    });

    LibraryManager.navigate = function (route, options){
        options|| (options = {});
        Backbone.history.navigate(route, options);
    };

    LibraryManager.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    // Validate and create a module and the start the same.
    LibraryManager.startSubModule = function (moduleName, arguments){
        var currentModule = moduleName ? LibraryManager.module(moduleName) : null;

        if(LibraryManager.currentModule === currentModule){
            return;
        }

        if(LibraryManager.currentModule){
            LibraryManager.currentModule.stop();
        }

        LibraryManager.currentModule = currentModule;
        if(currentModule){
            currentModule.start(arguments);
        }
    };

    LibraryManager.on('initialize:after', function() {
        if(Backbone.history){
            require(['modules/books/booksModule', 'modules/about/aboutModule'], function (){
                Backbone.history.start();
                if(LibraryManager.getCurrentRoute() === ''){
                    LibraryManager.trigger("books:list");
                }         
            });
        }
    });

    return LibraryManager;
});