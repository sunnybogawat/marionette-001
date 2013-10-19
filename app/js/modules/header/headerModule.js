define(['app', 'modules/header/list/listController'], function (LibraryManager, ListController) {
    LibraryManager.module('HeaderModule', function(HeaderModule, LibraryManager, Backbone, Marionette, $, _) {

        var API = {
            listHeader: function () {
                ListController.listHeader();
            }
        };

        LibraryManager.commands.setHandler('set:active:header', function(name) {
            ListController.setActiveHeader(name);
        });

        HeaderModule.on('start', function () {
            API.listHeader();
        });

    });

    return LibraryManager.HeaderModule;
});