(function (global) {
    BackendService = kendo.data.ObservableObject.extend({
        appServer: '77.70.99.10:3000',
        
        login: function(username, password) {
            //TODO
        }
    });

    app.backendService = new BackendService();
}
)(window);