define(['app', 'localstorage'], function (LibraryManager){

    LibraryManager.module('Entities', function(Entities, LibraryManager, Backbone, Marionette, $, _) {
        //Private Methods
        var findStorageKey = function (entity){

            // Use the _ library's result() utility method to read
            // a property value from an object.

            // First - Use a model's urlRoot value as key.
            if(entity.urlRoot){
                return _.result(entity, 'urlRoot');
            }

            // Second - Use the collection's url value.
            // (Provided the model's urlRoot is not available.)
            if(entity.url){
                return _.result(entity, 'url');
            }

            // Fallback to obtaining a model's storage key from its containing collection
            if(entity.collection && entity.collection.url){
                return _.result(entity.collection, 'url');
            }

            throw new Error("Unable to determine storage key!");
        };

        var StorageMixin = function(entityPrototype){
            var storageKey = findStorageKey(entityPrototype);
            //Return new instance of localStorage based on the key
            return { localStorage: new Backbone.LocalStorage(storageKey) };
        };

        Entities.configureStorage = function (entity) {
            //Use _.extend(destination, *sources)
            //Copy all of the properties in the source objects over 
            //to the destination object, and return the destination 
            //object. It's in-order, so the last source will override 
            //properties of the same name in previous arguments.
            _.extend(entity.prototype, new StorageMixin(entity.prototype));
        };

    });

    return LibraryManager.Entities.configureStorage;
});