(function (global) {
    BackendService = kendo.data.ObservableObject.extend({
        appServer: '77.70.99.10:3000',
        
        login: function(params) {
            var that = this,
            	defer = $.Deferred();

            //TODO

            return defer.promise();
        },
        
        getPosts: function(params) {
            var that = this,
            	defer = $.Deferred();

            //TODO    

            return defer.promise();
        }
    });

    app.backendService = new BackendService();
}
)(window);