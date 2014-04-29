(function (global) {
    var RegisterViewModel,
        app = global.app = global.app || {};

    RegisterViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        
        onRegisterWithFacebook: function() {
            //TODO: 
            
	        app.application.navigate("views/main.html");
        },
        
        onLogin: function () {
	        app.application.navigate("views/login.html");
        }
    });

    app.registerService = {
        viewModel: new RegisterViewModel()
    };
})(window);