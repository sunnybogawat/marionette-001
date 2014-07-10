require.config({
    
    baseUrl: 'app/js',
    
    paths: {
        backbone: 'lib/backbone',
        "backbone.picky": 'lib/backbone.picky',
        "backbone.syphon": 'lib/backbone.syphon',
        jquery: 'lib/jquery',
        "jquery-ui": 'lib/jquery-ui',
        json2: 'lib/json2',
        localstorage: 'lib/backbone.localstorage',
        marionette: 'lib/backbone.marionette',
        spin: 'lib/spin',
        "spin.jquery": 'lib/spin.jquery',
        tpl: 'lib/tpl',
        underscore: 'lib/underscore'
    },
    
    shim:{
        
        underscore:{
            exports: '_'
        },
        
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },

        "backbone.picky": ['backbone'],
        "backbone.syphon": ['backbone'],

        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },

        "jquery-ui": ['jquery'],
        localstorage: ['backbone'],
        "spin.jquery": ['spin', 'jquery']
    }
});

require(['app', 'modules/header/headerModule'], function(LibraryManager){
    LibraryManager.start();
});