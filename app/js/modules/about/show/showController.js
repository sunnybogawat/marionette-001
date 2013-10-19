define(['app', 'modules/about/show/showView'] , function (LibraryManager, View) {
    return {
        showAbout : function () {
            var view = new View.Message();
            LibraryManager.mainRegion.show(view);
        }
    };
});