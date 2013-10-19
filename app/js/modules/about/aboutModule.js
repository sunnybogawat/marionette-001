define(['app', 'marionette'], function (LibraryManager, Marionette) {
    
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            'about': 'showAbout'
        }
    });

    var API = {
        showAbout: function () {
            require(['modules/about/show/showController'], function (ShowController) {
                LibraryManager.startSubModule(null);
                ShowController.showAbout();
                LibraryManager.execute('set:active:header', 'about');
            });
        }
    };

    LibraryManager.on('about:show', function () {
        LibraryManager.navigate('about');
        API.showAbout();
    });

    LibraryManager.addInitializer( function () {
        new Router({
            controller: API
        });
    });

    return Router;
});