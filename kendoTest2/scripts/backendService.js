(function (global) {
    BackendService = kendo.data.ObservableObject.extend({
        appServer: '77.70.99.10:3000',
        
        login: function(params) {
            var that = this;
            
			return $.ajax("http://" + that.appServer + "/login", 
				{
					type: "POST", 
					contentType: "application/json",
					data: JSON.stringify({username: params.username, password: params.password})
				});
        },
        
        getPosts: function(params) {
            var that = this;

			return $.ajax("http://" + that.appServer + "/" + params.userToken + "/posts", 
				{
					type: "GET", 
					contentType: "application/json"
				});
        },
        
        getPostDetails: function(params) {
            var that = this;

			return $.ajax("http://" + that.appServer + "/" + params.userToken + "/post/" + params.postId, 
				{
					type: "GET", 
					contentType: "application/json"
				});
        }
    });

    app.backendService = new BackendService();
}
)(window);