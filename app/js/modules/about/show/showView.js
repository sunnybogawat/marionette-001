define(['marionette', 'tpl!modules/about/show/templates/message.html'], function (Marionette, messageTemplate) {
    return {
        Message: Marionette.ItemView.extend({
            template: messageTemplate
        })
    };
});