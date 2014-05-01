(function (global) {
    var HomeViewModel,
        app = global.app = global.app || {}, scope;

    HomeViewModel = kendo.data.ObservableObject.extend({
        posts: [],
        
        init: function() {
            kendo.data.ObservableObject.fn.init.apply(this, [this]);
            scope = this;
        },

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
        },
        
        onShow: function(e) {
            var that = scope;
            that.reload();
        }
    });

    app.homeService = {
        viewModel: new HomeViewModel()
    };
})(window);