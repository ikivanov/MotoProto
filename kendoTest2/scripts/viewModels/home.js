(function (global) {
    var HomeViewModel,
        app = global.app = global.app || {};

    HomeViewModel = kendo.data.ObservableObject.extend({
        posts: [],

        reload: function() {
            var that = this;
            app.backendService.getPosts({userToken : app.userToken}).done(function(result){
                if(result.success) {
	               that.set("posts", result.posts); 
                }
            });
        },
        
        onReload: function() {
            this.reload();
        }
    });

    app.homeService = {
        viewModel: new HomeViewModel()
    };
})(window);